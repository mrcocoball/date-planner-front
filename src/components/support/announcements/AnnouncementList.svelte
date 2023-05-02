<script>
  import { onMount, onDestroy } from 'svelte'
  import { announcements, announcementDetail, currentAnnouncementPaginationBar, currentAnnouncementsPage, requestPath } from '../../../store/announcements/announcementStore'
  import AnnouncementDetail from './AnnouncementDetail.svelte';
  import Announcement from './Announcement.svelte';

  let detailMode = false

  let initValues = {
    formCategoryId: '',
    formCondition: '',
    formKeyword: ''
  }

  onMount(() => {
    announcements.resetAnnouncements()
    announcements.fetchAnnouncements()
  })

  const searchAnnouncements = async () => {
    try {
      await announcements.fetchAnnouncementsBySearch(initValues.formCategoryId, initValues.formCondition, initValues.formKeyword)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const setPage = async (pageNum) => {
    try {
      await announcements.fetchAnnouncementsByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (id) => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    detailMode = true
    goAnnouncementDetail(id)
  }

  // 하위 컴포넌트인 AnnouncementDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    announcementDetail.resetAnnouncement()
  }

  const goAnnouncementDetail = async (id) => {
    try {
      await announcementDetail.getAnnouncement(id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    requestPath.set('')
    announcements.resetAnnouncements()
    announcementDetail.resetAnnouncement()
    currentAnnouncementPaginationBar.resetPaginationBar()
    currentAnnouncementsPage.resetPage()
  })

</script>

{#if detailMode}
<div class="announcement-detail">
  {#if $announcementDetail}
    <AnnouncementDetail {announcementDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="announcement-search-form-header">
  <h2>공지사항</h2>
  <span>공지사항과 이벤트, 업데이트와 관련된 소식들이 올라옵니다!</span>
</div>
<div class="announcement-search-form">
  <select bind:value={initValues.formCondition} class="form-control condition">
    <option value="">검색조건</option>
    <option value="title">제목</option>
    <option value="description">본문</option>
  </select>
  <select bind:value={initValues.formCategoryId} class="form-control category">
    <option value="">카테고리</option>
    <option value=1>일반</option>
    <option value=2>업데이트</option>
    <option value=3>이벤트</option>
    <option value=4>긴급</option>
  </select>
  <input type="text" class="form-control keyword" name="keyword" autocomplete="off" placeholder="검색어를 입력해주세요" bind:value={initValues.formKeyword} />
</div>
<div class="detail-top-button">
  <button class="btn btn-search" on:click={searchAnnouncements}>검색하기</button>
</div>

<div class="announcement-list">
  {#each $announcements.data.content as announcement, index}
  <ul class="list-group">
    <li class="list-group-item announcement-thumb-item" on:click={() => onDetailMode(announcement.id)}>
      <Announcement {announcement} {index} />
    </li>
  </ul>
  {/each}
</div>

<nav id="pagination" aria-label="Page navigation">
  <div class="announcement-pagination">
    <ul class="pagination justify-content-center">
      {#each $currentAnnouncementPaginationBar as pageButton}
        <li class={pageButton === $currentAnnouncementsPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
{/if}