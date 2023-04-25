<script>
  import PlaceList from '../../places/PlaceList.svelte';
  import BookmarkList from '../bookmarks/BookmarkList.svelte';
  export let planDetailInfo
  export let inputDetailPlanValue

  let place_id = ''
  let searchMode = false
  let bookmarkMode = false
  let placeSearchMode = false
  let bookmarkSearchMode = false

  const onSearchMode = () => {
    searchMode = true
    bookmarkMode = false
    place_id = ''
    placeSearchMode = true
    bookmarkSearchMode = false
  }

  const offSearchMode = () => {
    searchMode = false
    place_id = ''
    placeSearchMode = false
    bookmarkSearchMode = false
  }

  const onBookmarkMode = () => {
    bookmarkMode = true
    searchMode = false
    place_id = ''
    bookmarkSearchMode = true
    placeSearchMode = false
  }

  const offBookmarkMode = () => {
    bookmarkMode = false
    place_id = ''
    bookmarkSearchMode = false
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
    offMode()
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
  }

</script>

<div class="detail-plan-form">
  <div class="detail-plan-form-header">
    <h4>목적지 추가하기</h4>
    <span>장소를 검색하거나 따로 북마크한 장소들 중에서 장소를 가져와 목적지로 설정합니다.</span>
    <br>
    <span>입력된 장소를 '목적지로 추가하기' 버튼으로 목적지로 설정할 수 있습니다.</span>
  </div>
  <div class="detail-plan-form-mode-information">
    {#if !searchMode && !bookmarkMode}
    <div>
      <ul class="list-group">
        <li class="list-group-item detailplan-mode-item">
          <h5>장소 검색해서 가져오기</h5>
          <br>
          <span>1. 장소 카테고리 선택 + 주소를 검색합니다</span>
          <br>
          <span>2. 장소 목록 중에서 원하는 장소를 클릭하여 상세 정보를 확인합니다.</span>
          <br>
          <span>3. 우측 상단 'X' 버튼을 눌러 목록으로 돌아온 후 원하시는 장소를 '목적지 선택' 클릭으로 가져올 수 있습니다.</span>
          <div class="detail-bottom-button">
            <button class="btn btn-create" on:click={onSearchMode}>장소 검색해서 가져오기</button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <ul class="list-group">
        <li class="list-group-item detailplan-mode-item">
          <h5>북마크 목록에서 가져오기</h5>
          <br>
          <span>1. 북마크한 장소 목록을 조회합니다.</span>
          <br>
          <span>2. 북마크된 장소 목록에서 원하는 장소를 클릭하여 상세 정보를 확인합니다.</span>
          <br>
          <span>3. 우측 상단 'X' 버튼을 눌러 목록으로 돌아온 후 원하시는 장소를 '목적지 선택' 클릭으로 가져올 수 있습니다.</span>
          <div class="detail-bottom-button">
            <button class="btn btn-create" on:click={onBookmarkMode}>북마크 목록에서 가져오기</button>
          </div>
        </li>
      </ul>
    </div>
    {:else}
    {#if searchMode}
    <!--searchMode-->
      <PlaceList bind:placeSearchMode={placeSearchMode} on:sendPlace_Id={sendingPlaceId} />
    {:else}
    <!--bookmarkMode-->
      <BookmarkList bind:bookmarkSearchMode={bookmarkSearchMode} on:sendPlace_Id={sendingPlaceId} />
    {/if}
    <div class="detail-bottom-button">
      <button class="w-100 btn btn-cancel" on:click={offMode}>검색 취소</button>
    </div>
    {/if}
  </div>
</div>