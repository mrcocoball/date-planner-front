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
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
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
<div class="my-review-detail">
  <ReviewDetail {myReviewDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
</div>
{:else}
<div class="my-review-list-header">
  <h2>리뷰 목록</h2>
  <span>여러분이 작성한 리뷰 목록입니다.</span>
</div>
<div class="my-review-list">
  {#each $myReviews.data.content as review, index}
  <ul class="list-group">
    <li class="list-group-item my-review-thumb-item" on:click={() => onDetailMode(review.id)}>
      <Review {review} {index} />
    </li>
  </ul>
  {/each}
</div>

<nav id="pagination" aria-label="Page navigation">
  <div class="review_pagination">
    <ul class="pagination justify-content-center">
      {#each $currentMyReviewPaginationBar as pageButton}
        <li class={pageButton === $currentMyReviewsPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
{/if}