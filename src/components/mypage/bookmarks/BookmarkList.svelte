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
<div class="place_detail">
  <PlaceDetail {placeDetail} bind:bookmarkSearchMode={bookmarkSearchMode} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
</div>
{/if}

{#if searchMode}
<div class="bookmark_list">
  <ul>
    {#each $bookmarks.data.content as bookmark, index}
      <li on:click={() => onDetailMode(bookmark.placeId)}>
        <Bookmark {bookmark} {index} />
      </li>
      {#if bookmarkSearchMode}
      <button class="btn btn-search" on:click={() => sendAddress(bookmark.placeId, bookmark.placeName)}>목적지 선택</button>
      {/if}
    {/each}
  </ul>
</div>

<div class="bookmark_pagination">
  <ul>
    {#each $currentBookmarkPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentBookmarksPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}