<script>
  import { afterUpdate, createEventDispatcher, onDestroy } from 'svelte'
  import { isLogin } from "../../store/auth/authStore";
  import { bookmarks } from '../../store/bookmarks/bookmarkStore'
  import ReviewInPlace from './ReviewInPlace.svelte';
  export let placeDetail
  export let detailMode
  export let bookmarkSearchMode

  let reviewScoreStar = ''

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  afterUpdate(() => {

    if ($placeDetail.data.avg_review_score < 1) {
      reviewScoreStar = `☆☆☆☆☆`
    } else if ($placeDetail.data.avg_review_score >= 1 && $placeDetail.data.avg_review_score < 2) {
      reviewScoreStar = `★☆☆☆☆`
    } else if ($placeDetail.data.avg_review_score >= 2 && $placeDetail.data.avg_review_score < 3) {
      reviewScoreStar = `★★☆☆☆`
    } else if ($placeDetail.data.avg_review_score >= 3 && $placeDetail.data.avg_review_score < 4) {
      reviewScoreStar = `★★★☆☆`
    } else if ($placeDetail.data.avg_review_score >= 4 && $placeDetail.data.avg_review_score < 5) {
      reviewScoreStar = `★★★★☆`
    } else {
      reviewScoreStar = `★★★★★`
    }

    var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng($placeDetail.data.y, $placeDetail.data.x),
        level: 1
    }

    var imageSrc = `/src/images/markers/solo-marker-${$placeDetail.data.category_group_id}.png`,   
        imageSize = new kakao.maps.Size(100, 100)
      
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

    // 컴포넌트 해제된 상태에서 map을 생성하려 할 경우 오류 발생하므로 분기 처리
    if (mapContainer) {
      var map = new kakao.maps.Map(mapContainer, mapOption);

      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng($placeDetail.data.y, $placeDetail.data.x),
        image: markerImage
      })
      
      marker.setMap(map);
    }

  })

  const onBookmark = async () => {
    try {
      let getData = await placeDetail.bookmark($placeDetail.data.place_id)
      bookmarks.addBookmark(getData)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const offBookmark = async () => {
    try {
      await placeDetail.cancelBookmark($placeDetail.data.place_id)
      bookmarks.deleteBookmark($placeDetail.data.place_id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    dispatch('detail-off')
  })

</script>

<div class="detail-top-button">
  <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
</div>

<div class="place-detail-header">
  <span class={'ct-'+$placeDetail.data.category_group_id+'-l'}>{$placeDetail.data.category_name}</span>
  <h2>{$placeDetail.data.place_name}</h2>
</div>

<div id="map" style="width:100%;height:350px;">
  
</div>

<div class="common-form">
  <div class="place-detail-form">
    <ul class="list-group mb-3">
      {#if $placeDetail.data.image_url && $placeDetail.data.image_url != 'NOT EXISTS'}
      <li class="list-group-item">
        <div>
          <img src={$placeDetail.data.image_url} class="img-fluid mx-auto d-block"/>
        </div>
      </li>
      {/if}
    </ul>
    <ul class="list-group mb-3">
      <li class="list-group-item">
        <div>
          <h6>주소(지번 주소)</h6>
          <span class="addressName" id="addressName">{$placeDetail.data.address_name}</span>
        </div>
      </li>
      <li class="list-group-item">
        <div>
          <h6>리뷰 평점 / 리뷰 건수</h6>
          <span class="review-score" id="reviewCount">{reviewScoreStar}</span>
          <span>({$placeDetail.data.avg_review_score}) / {$placeDetail.data.review_count} 건</span>
        </div>
      </li>
      {#if $placeDetail.data.description}
      <li class="list-group-item">
        <div>
          <h6>설명</h6>
          <span class="description" id="description">{$placeDetail.data.description}</span>
        </div>
      </li>
      {/if}
      <li class="list-group-item">
        <div>
          <h6>장소 정보 보기 (카카오맵)</h6>
          <span class="placeUrl" id="placeUrl">{$placeDetail.data.place_url}</span>
        </div>
      </li>
    </ul>
  </div>
</div>

{#if !bookmarkSearchMode}
<div class="detail-top-button">
{#if $isLogin}
  {#if $placeDetail.data.bookmarked}
    <button class="btn btn-bookmarked" on:click={offBookmark}>북마크 취소</button>
  {:else}
    <button class="btn btn-bookmark" on:click={onBookmark}>북마크 하기</button>
  {/if}
{/if}
</div>
{/if}

<div>
  {#if $placeDetail.data.place_id}
    <ReviewInPlace bind:placeDetailData={placeDetail} />
  {/if}
</div>