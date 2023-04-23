<script>
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { places, placeDetail, requestPath, currentPlacesPage, currentPlacePaginationBar } from '../../store/places/placeStore.js'
  import PlaceMap from "../../components/places/PlaceMap.svelte";
  import PlaceThumb from './PlaceThumb.svelte';
  import PlaceDetail from './PlaceDetail.svelte';
  export let placeSearchMode

  let detailMode = false
  let searchMode = false
  let bookmarkSearchMode = false

  let categories = [
    { 'id': 'AT4', 'name': '관광명소' },
    { 'id': 'CE7', 'name': '카페' },
    { 'id': 'CT1', 'name': '문화시설' },
    { 'id': 'FD6', 'name': '음식점' },
    { 'id': 'SW8', 'name': '지하철' },
  ]

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
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (place_id) => {
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
<div class="place_detail">
  {#if $placeDetail}
    <PlaceDetail {placeDetail} {bookmarkSearchMode} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="place_search_form">
  <input type="text" name="address" autocomplete="off" bind:value={initValues.formAddress} />
  {#each categories as category}
    <input type="checkbox" value={category.id} bind:group={initValues.formCategories} /> {category.name}
  {/each}
  <button class="btn btn-search" on:click={searchPlaces}>검색하기</button>
</div>

{#if searchMode}
<div class="place_list">
  <ul>
    {#each $places.data.content as place, index}
      <li on:click={() => onDetailMode(place.place_id)}>
        <PlaceThumb {place} {index} />
      </li>
      {#if placeSearchMode}
      <button class="btn btn-search" on:click={() => sendAddress(place.place_id, place.place_name)}>목적지 선택</button>
      {/if}
    {/each}
  </ul>
</div>

<div class="place_pagination">
  <ul>
    {#each $currentPlacePaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentPlacesPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>

<div class="place_map">
  <PlaceMap {places} />
</div>
{/if}
{/if}