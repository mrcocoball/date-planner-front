<script>
  import { planDetail } from '../../../store/plans/planStore'
  import PlaceList from '../../places/PlaceList.svelte';
  export let planDetailInfo
  export let inputDetailPlanValue

  let place_id = ''
  let searchMode = false
  let bookmarkMode = false
  let placeSearchMode = false

  const onSearchMode = () => {
    searchMode = true
    bookmarkMode = false
    place_id = ''
    placeSearchMode = true
  }

  const offSearchMode = () => {
    searchMode = false
    place_id = ''
    placeSearchMode = false
  }

  const onBookmarkMode = () => {
    bookmarkMode = true
    searchMode = false
    place_id = ''
    placeSearchMode = false
  }

  const offBookmarkMode = () => {
    bookmarkMode = false
    place_id = ''
    placeSearchMode = false
  }

  const offMode = () => {
    offSearchMode()
    offBookmarkMode()
  }

  function sendingPlaceId(event) {
    const placeId = event.detail.placeId
    const placeName = event.detail.placeName
    inputDetailPlanValue.formPlace_id = placeId
    inputDetailPlanValue.formPlace_name = placeName
    offSearchMode()
  }

</script>

<div>
  <h6>목적지 추가하기</h6>
  {#if !searchMode && !bookmarkMode}
  <div>
    <button class="btn btn-create" on:click={onSearchMode}>장소 검색해서 가져오기</button>
  </div>
  <div>
    <button class="btn btn-create" on:click={onBookmarkMode}>북마크 목록에서 가져오기</button>
  </div>
  {:else}
  {#if searchMode}
  <!--searchMode-->
    <PlaceList bind:placeSearchMode={placeSearchMode} on:sendPlace_Id={sendingPlaceId} />
  {:else}
  <!--bookmarkMode-->
  {/if}
  <div>
    <button class="btn btn-cancel" on:click={offMode}>검색 취소</button>
  </div>
  {/if}
</div>