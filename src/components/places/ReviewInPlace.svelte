<script>
  import { onMount } from 'svelte'
  import { reviews, currentReviewsPage, currentReviewPaginationBar, requestPath } from '../../store/reviews/reviewStore'
  import { auth, isLogin } from '../../store/auth/authStore'
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
  <ReviewAddForm bind:placeDetailData={placeDetailData} />
{/if}
{#if $reviews.data.content.length != 0}
<div class="review_list">
  <ul>
    {#each $reviews.data.content as review, index}
    <ReviewDetail {review} {index} />
    {/each}
  </ul>
</div>

<div class="review_pagination">
  <ul>
    {#each $currentReviewPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentReviewsPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{:else}
<div class="review_list_empty">
  <h6>리뷰가 읎어요</h6>
</div>
{/if}