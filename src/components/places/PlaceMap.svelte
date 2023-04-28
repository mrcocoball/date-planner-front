<script>
  import { afterUpdate } from 'svelte'
  export let places

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

      var mapContainer = document.getElementById('map'),
      mapOption = { 
          center: new kakao.maps.LatLng(total_y, total_x),
          level: 7
      }

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