<script>
  import { onMount, onDestroy } from 'svelte'
  import { myReviews, myReviewDetail, currentMyReviewPaginationBar, currentMyReviewsPage, requestPath } from '../../../store/reviews/myReviewStore'
  import Review from './Review.svelte';
  import ReviewDetail from './ReviewDetail.svelte';
  let detailMode = false;

  onMount(() => {
    try {
      myReviews.resetMyReviews()
      myReviews.fetchMyReviews()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  })

  const setPage = async (pageNum) => {
    try {
      await myReviews.fetchMyReviewsByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (id) => {
    detailMode = true
    goReviewDetail(id)
  }

  // 하위 컴포넌트인 ReviewDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    myReviewDetail.resetMyReview()
  }

  const goReviewDetail = async (id) => {
    try {
      await myReviewDetail.getMyReview(id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    requestPath.set('')
    myReviews.resetMyReviews()
    myReviewDetail.resetMyReview()
    currentMyReviewPaginationBar.resetPaginationBar()
    currentMyReviewsPage.resetPage()
    detailMode = false
  })

</script>

{#if detailMode}
<div class="review_detail">
  <ReviewDetail {myReviewDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
</div>
{:else}
<div class="review_list">
  <ul>
    {#each $myReviews.data.content as review, index}
      <li on:click={() => onDetailMode(review.id)}>
        <Review {review} {index} />
      </li>
    {/each}
  </ul>
</div>

<div class="review_pagination">
  <ul>
    {#each $currentMyReviewPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentMyReviewsPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}