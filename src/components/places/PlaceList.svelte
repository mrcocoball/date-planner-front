<script>
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { places, placeDetail, requestPath, currentPlacesPage, currentPlacePaginationBar } from '../../store/places/placeStore.js'
  import PlaceMap from "../../components/places/PlaceMap.svelte";
  import Place from './Place.svelte';
  import PlaceDetail from './PlaceDetail.svelte';
  export let placeSearchMode

  let detailMode = false
  let searchMode = false
  let bookmarkSearchMode = false

  let initValues = {
    formAddress: '',
    formCategories: []
  }

  const searchPlaces = async () => {
    try {
      await places.fetchPlaces(initValues.formAddress, initValues.formCategories)
      searchMode = true
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const setPage = async (pageNum) => {
    try {
      await places.fetchPlacesByPage($requestPath, pageNum)
      let element = document.getElementById("main_nav")
      element.scrollIntoView();
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (place_id) => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    detailMode = true
    goPlaceDetail(place_id)
  }

  // 하위 컴포넌트인 PlaceDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    placeDetail.resetPlace()
  }

  const goPlaceDetail = async (place_id) => {
    try {
      await placeDetail.getPlace(place_id.toString())
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const dispatch = createEventDispatcher()

  const sendAddress = (place_id, place_name) => {
    dispatch('sendPlace_Id', {
      placeId : place_id,
      placeName : place_name,
    })
  }

  onDestroy(() => {
    requestPath.set('')
    places.resetPlaces()
    placeDetail.resetPlace()
    currentPlacePaginationBar.resetPaginationBar()
    currentPlacesPage.resetPage()
    searchMode = false
  })

</script>

{#if detailMode}
<div class="place-detail">
  {#if $placeDetail}
    <PlaceDetail {placeDetail} {bookmarkSearchMode} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="place-search-form">
  {#if !placeSearchMode}
  <div class="place-search-form-header">
    <h2>장소 검색하기</h2>
    <span>카테고리 태그와 주소를 입력하여 검색해보세요!</span>
  </div>
  {/if}
  <input type="checkbox" value="AT4" id="cb1" bind:group={initValues.formCategories} />
  <label for="cb1">관광명소</label>
  <input type="checkbox" value="CE7" id="cb2" bind:group={initValues.formCategories} />
  <label for="cb2">카페</label>
  <input type="checkbox" value="CT1" id="cb3" bind:group={initValues.formCategories} />
  <label for="cb3">문화시설</label>
  <input type="checkbox" value="FD6" id="cb4" bind:group={initValues.formCategories} />
  <label for="cb4">음식점</label>
  <input type="checkbox" value="SW8" id="cb5" bind:group={initValues.formCategories} />
  <label for="cb5">지하철역</label>
  <div class="place-search-bar">
    <input type="text" class="form-control address-input" name="address" placeholder="주소를 입력해주세요 (예 : 서울시 관악구 / 서초동)" autocomplete="off" bind:value={initValues.formAddress} />
    <button class="btn btn-search" on:click={searchPlaces}>검색</button>
  </div>
</div>

<div class={searchMode ? "place-information" : "place-information-empty"}>
  {#if searchMode}  
  <div class="place-list">
    <div>
      <h4>검색 결과</h4>
    </div>
    <div>
      <PlaceMap {places} />
      {#each $places.data.content as place, index}
      <ul class="list-group">
        <li class="list-group-item place-thumb-item" on:click={() => onDetailMode(place.place_id)}>
          <Place {place} {index} />
          {#if placeSearchMode}
          <button class="btn btn-search" on:click={() => sendAddress(place.place_id, place.place_name)}>목적지 선택</button>
          {/if}
        </li>
      </ul>  
      {/each}
    </div>
  </div>
  <nav id="pagination" aria-label="Page navigation">
    <div class="place-pagination">
      <ul class="pagination justify-content-center">
        {#each $currentPlacePaginationBar as pageButton}
          <li class={pageButton === $currentPlacesPage ? "page-item active" : "page-item"} aria-current="page">
            <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
  {/if}
</div>
{/if}