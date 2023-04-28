<script>
  import { afterUpdate } from 'svelte'
  export let places

  let level = 2
  let maxDistance = 0

  function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    }
  }

  function makeOutListener(infowindow) {
      return function() {
          infowindow.close();
      }
  }

  const radians = (degrees) => {
    return degrees * Math.PI / 180;
  };

  const calculateDistance = (lat1, lat2, lon1, lon2) => {
    const earthRadius = 6371 // km
    lat1 = radians(lat1)
    lat2 = radians(lat2)
    lon1 = radians(lon1)
    lon2 = radians(lon2)

    let distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)) * earthRadius * 1000
    return distance
  }

  const focusLeveling = (maxDistance) => {
    if (maxDistance < 100) {
      level = 2
    } else if (maxDistance >= 100 && maxDistance < 250) {
      level = 2
    } else if (maxDistance >= 250 && maxDistance < 500) {
      level = 3
    } else if (maxDistance >= 500 && maxDistance < 1000) {
      level = 4
    } else if (maxDistance >= 1000 && maxDistance < 2000) {
      level = 5
    } else if (maxDistance >= 2000 && maxDistance < 4000) {
      level = 7
    } else if (maxDistance >= 4000 && maxDistance < 8000) {
      level = 8
    } else if (maxDistance >= 8000 && maxDistance < 16000) {
      level = 9
    } else if (maxDistance >= 16000 && maxDistance < 32000) {
      level = 10
    } else if (maxDistance >= 32000 && maxDistance < 64000) {
      level = 11
    } else if (maxDistance >= 64000 && maxDistance < 128000) {
      level = 12
    } else if (maxDistance >= 128000 && maxDistance < 200000) {
      level = 13
    } else if (maxDistance >= 200000) {
      level = 14
    }
  }

  afterUpdate(() => {
    if ($places.data.content.length != 0) {

      var positions = $places.data.content

      let total_x = 0
      let total_y = 0

      for (var i = 0; i < positions.length; i++ ) {
        total_x += positions[i].x
        total_y += positions[i].y
      }

      // TODO : 중간 좌표 계산이지만 추후 개선 필요
      total_x /= positions.length
      total_y /= positions.length

      for (var i = 0; i < positions.length; i++) {
        let distance = calculateDistance(positions[i].y, total_y, positions[i].x, total_x)
        if (distance >= maxDistance) maxDistance = distance
      }

      focusLeveling(maxDistance)

      var mapContainer = document.getElementById('map'),
      mapOption = { 
          center: new kakao.maps.LatLng(total_y, total_x),
          level: level
      }

      maxDistance = 0

      var map = new kakao.maps.Map(mapContainer, mapOption);

      for (var i = 0; i < positions.length; i++) {
        var imageSrc = `/src/images/markers/${positions[i].category_group_id}-marker-${i+1}.png`,   
        imageSize = new kakao.maps.Size(50, 50)      
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

        let latlng = new kakao.maps.LatLng(positions[i].y, positions[i].x)
        var marker = new kakao.maps.Marker({
            map: map,
            position: latlng,
            image: markerImage
        })

        var infowindow = new kakao.maps.InfoWindow({
            content: '<div><span style="font-size:smaller">' + positions[i].place_name + '</span></div>'
        })

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      
      }        
    }
  })

</script>

<div id="map" style="width:100%;height:350px;">
  
</div>