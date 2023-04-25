<script>
  import { bookmarks, currentBookmarkPaginationBar, currentBookmarksPage, requestPath } from '../../../store/bookmarks/bookmarkStore'
  import { placeDetail } from '../../../store/places/placeStore'
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  export let bookmarkSearchMode
  import PlaceDetail from "../../places/PlaceDetail.svelte";
  import Bookmark from './Bookmark.svelte';

  let detailMode = false
  let searchMode = true

  onMount(() => {
    try {
      bookmarks.resetBookmarks()
      bookmarks.fetchBookmarks()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  })

  const setPage = async (pageNum) => {
    try {
      await bookmarks.fetchBookmarksByPage($requestPath, pageNum)
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
    bookmarks.resetBookmarks()
    placeDetail.resetPlace()
    currentBookmarkPaginationBar.resetPaginationBar()
    currentBookmarksPage.resetPage()
    searchMode = false
  })

</script>

{#if detailMode}
<div class="place-detail">
  <PlaceDetail {placeDetail} bind:bookmarkSearchMode={bookmarkSearchMode} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
</div>
{:else}
{#if searchMode}
{#if !bookmarkSearchMode}
<div class="bookmark-list-header">
  <h4>북마크 목록</h4>
  <span>여러분이 북마크한 장소들의 목록입니다. 추후 플랜 작성 시 사용할 수 있습니다.</span>
</div>
{/if}
<div class="bookmark-list">
  {#each $bookmarks.data.content as bookmark, index}
  <ul class="list-group">
    <li class="list-group-item bookmark-thumb-item" on:click={() => onDetailMode(bookmark.placeId)}>
      <Bookmark {bookmark} {index} />
    </li>
    {#if bookmarkSearchMode}
    <button class="btn btn-search" on:click={() => sendAddress(bookmark.placeId, bookmark.placeName)}>목적지 선택</button>
    {/if}
  </ul>
  {/each}
</div>

<nav id="pagination" aria-label="Page navigation">
  <div class="bookmark-pagination">
    <ul class="pagination justify-content-center">
      {#each $currentBookmarkPaginationBar as pageButton}
        <li class={pageButton === $currentBookmarksPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
{/if}
{/if}