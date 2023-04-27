<script>
  import { afterUpdate } from 'svelte'
  export let review
  export let index
  import { auth } from '../../store/auth/authStore'
  import { reviews } from '../../store/reviews/reviewStore';
  import ReviewEditForm from './ReviewEditForm.svelte';

  let isViewMenu = false
  let editMode = false

  let reviewStar = ''

  afterUpdate(() => {
    if (review.reviewScore < 1) {
      reviewStar = `☆☆☆☆☆`
    } else if (review.reviewScore >= 1 && review.reviewScore < 2) {
      reviewStar = `★☆☆☆☆`
    } else if (review.reviewScore >= 2 && review.reviewScore < 3) {
      reviewStar = `★★☆☆☆`
    } else if (review.reviewScore >= 3 && review.reviewScore < 4) {
      reviewStar = `★★★☆☆`
    } else if (review.reviewScore >= 4 && review.reviewScore < 5) {
      reviewStar = `★★★★☆`
    } else {
      reviewStar = `★★★★★`
    }
  })

  // 반응성 블록
  $ : {
    if($reviews.menuPopup === review.id) {
      isViewMenu = true
    }
    else {
      isViewMenu = false
    }
  }

  const onEditModeReview = (id) => {
    reviews.openEditModeReview(id)
    editMode = true
  }

  const onDeleteReview = (id) => {
    if(confirm('리뷰를 삭제하시겠습니까?')) {
      reviews.deleteReview(id)
    }
  }
</script>

{#if $reviews.editMode === review.id}
  <ReviewEditForm {review} />
{:else}
<div class="review-thumb">
  <div class="review-default">
    <span class="review-score">{reviewStar}</span>
    <h5>{review.title}</h5>
    <pre class="review-description">{review.description}</pre>
  </div>
  <div class="review-sub">
    <span>{review.nickname}</span>
    <br>
    <span class="review-date">작성일자 : {review.createdAt}</span>
    <br>
    <span class="review-date">수정일자 : {review.modifiedAt}</span>
  </div>
</div>
{#if review.uid === $auth.uid}
<div class="detail-bottom-button">
  <button class="btn btn-update" on:click={() => onEditModeReview(review.id)}>수정하기</button>
  <button class="btn btn-delete" on:click={() => onDeleteReview(review.id)}>삭제하기</button>
</div>
{/if}
{/if}