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
      console.log(initValues)
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
<div class="announcement_detail">
  {#if $announcementDetail}
    <AnnouncementDetail {announcementDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="announcement_search_form">
  <select bind:value={initValues.formCondition}>
    <option value="">검색</option>
    <option value="title">제목</option>
    <option value="description">본문</option>
  </select>
  <select bind:value={initValues.formCategoryId}>
    <option value="">카테고리</option>
    <option value=1>일반</option>
    <option value=2>업데이트</option>
    <option value=3>이벤트</option>
    <option value=4>긴급</option>
  </select>
  <input type="text" name="keyword" autocomplete="off" placeholder="검색어를 입력해주세요" bind:value={initValues.formKeyword} />
  <button class="btn btn-search" on:click={searchAnnouncements}>검색하기</button>
</div>

<div class="place_list">
  <ul>
    {#each $announcements.data.content as announcement, index}
      <li on:click={() => onDetailMode(announcement.id)}>
        <Announcement {announcement} {index} />
      </li>
    {/each}
  </ul>
</div>

<div class="announcement_pagination">
  <ul>
    {#each $currentAnnouncementPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentAnnouncementsPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}