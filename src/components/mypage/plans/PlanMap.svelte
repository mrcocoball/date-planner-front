<script>
  import { afterUpdate } from 'svelte'
  export let planDetail

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
    if ($planDetail.data.detailPlans.length != 0) {

      var positions = $planDetail.data.detailPlans

      let total_x = 0
      let total_y = 0

      for (var i = 0; i < positions.length; i++ ) {
        total_y += positions[i].latitude
        total_x += positions[i].longitude
      }

      // TODO : 중간 좌표 계산이지만 추후 개선 필요
      total_x /= positions.length
      total_y /= positions.length

      var mapContainer = document.getElementById('map'),
      mapOption = { 
          center: new kakao.maps.LatLng(total_y, total_x),
          level: 5
      }

      var map = new kakao.maps.Map(mapContainer, mapOption);

      for (var i = 0; i < positions.length; i++) {
        let latlng = new kakao.maps.LatLng(positions[i].latitude, positions[i].longitude)
        var marker = new kakao.maps.Marker({
            map: map,
            position: latlng
        })

        // TODO : 커스텀 마커 추후 구현 필요
        var infowindow = new kakao.maps.InfoWindow({
            content: '<div>' + Number(i+1) + '</div>'
        })

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      
      }        
    }
  })
</script>

{#if $planDetail.data.detailPlans.length != 0}
<div id="map" style="width:100%;height:350px;">
  
</div>
{/if}