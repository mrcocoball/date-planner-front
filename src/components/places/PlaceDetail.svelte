<script>
  import { afterUpdate } from 'svelte'
  import ReviewList from '../mypage/reviews/ReviewList.svelte';
  export let placeDetail
  export let detailMode

  const offDetailMode = () => {
    detailMode = false
  }

  afterUpdate(() => {
    var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng($placeDetail.data.y, $placeDetail.data.x),
        level: 2
    }

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng($placeDetail.data.y, $placeDetail.data.x)
    })

  })

</script>

<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
</div>

<div id="map" style="width:100%;height:350px;">
  
</div>

<div class="col-md-7 col-lg-8 common_form">
  <ul class="list-group mb-3">
    <li class="list-group-item">
      <div>
        <h6>이미지</h6>
        {#if $placeDetail.data.image_url}
        <img src={$placeDetail.data.image_url} />
        {:else}
        <p>이미지 없음</p>
        {/if}
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>카테고리</h6>
        <p class="categoryName" id="categoryName">{$placeDetail.data.category_name}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>장소명</h6>
        <p class="placeName" id="placeName">{$placeDetail.data.place_name}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>장소 정보 보기</h6>
        <p class="placeUrl" id="placeUrl">{$placeDetail.data.place_url}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>주소(지번 주소)</h6>
        <p class="addressName" id="addressName">{$placeDetail.data.address_name}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>리뷰 건수</h6>
        <p class="reviewCount" id="reviewCount">{$placeDetail.data.review_count}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>리뷰 평점</h6>
        <p class="avgReviewScore" id="avgReviewScore">{$placeDetail.data.avg_review_score}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>설명</h6>
        <p class="description" id="description">{$placeDetail.data.description}</p>
      </div>
    </li>
  </ul>
</div>

<div>
  <ReviewList />
</div>