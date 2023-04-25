<script>
  import { onMount } from 'svelte'
  import { reviews, currentReviewsPage, currentReviewPaginationBar, requestPath } from '../../store/reviews/reviewStore'
  import { isLogin } from '../../store/auth/authStore'
  import ReviewAddForm from './ReviewAddForm.svelte';
  import ReviewDetail from './ReviewDetail.svelte';
  export let placeDetailData

  onMount(() => {
    reviews.resetReviews()
    reviews.fetchReviews($placeDetailData.data.place_id)
  })

  const setPage = async (pageNum) => {
    try {
      await reviews.fetchReviewsByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }
  
</script>

{#if $isLogin}
<div class="review-add-form">
  <h4>리뷰 작성</h4>
  <ReviewAddForm bind:placeDetailData={placeDetailData} />
</div>
{/if}
{#if $reviews.data.content.length != 0}
<div class="review-list">
  <h4>리뷰 목록</h4>
  {#each $reviews.data.content as review, index}
  <ul class="list-group">
    <li class="list-group-item">
      <ReviewDetail {review} {index} />
    </li>
  </ul>
  {/each}

  <nav id="pagination" aria-label="Page navigation">
    <div class="review-pagination">
      <ul class="pagination justify-content-center">
        {#each $currentReviewPaginationBar as pageButton}
          <li class={pageButton === $currentReviewsPage ? "page-item active" : "page-item"} aria-current="page">
            <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</div>
{:else}
<div class="review-list-empty">
  <h4>리뷰 목록</h4>
  <ul class="list-group">
    <li class="list-group-item text-center">
      <br>
      <h4>리뷰가 존재하지 않습니다!</h4>
      <span>리뷰를 한 번 작성해보시는 건 어때요?</span>
      <br>
      <br>
    </li>
  </ul>
</div>
{/if}