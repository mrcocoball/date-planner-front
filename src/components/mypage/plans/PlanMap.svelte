<script>
  import { afterUpdate } from 'svelte'
  export let planDetail

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

      // 컴포넌트 해제된 상태에서 map을 생성하려 할 경우 오류 발생하므로 분기 처리
      if (mapContainer) {

        var map = new kakao.maps.Map(mapContainer, mapOption);

        for (var i = 0; i < positions.length; i++) {
          let latlng = new kakao.maps.LatLng(positions[i].latitude, positions[i].longitude)

          let index = (i+1).toString()
          if (i <= 8) index = 0 + index
          let overlayNum = index.slice(-1)

          var content = '<div class="plan-overlay-' + overlayNum + '"><h6 class="overlay-number">' + index + '</h6></div>'

          var customOverlay = new kakao.maps.CustomOverlay({
              map: map,
              position: latlng,
              content: content   
          });

          customOverlay.setMap(map)

        }  

      }
      
    }
  })
</script>

{#if $planDetail.data.detailPlans.length != 0}
<div id="map" style="width:100%;height:350px;">
  
</div>
{/if}