<script>
  export let review
  export let index
  import { auth } from '../../store/auth/authStore'
  import { reviews } from '../../store/reviews/reviewStore';
  import ReviewEditForm from './ReviewEditForm.svelte';

  let isViewMenu = false
  let editMode = false

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
    <span>평점 : {review.reviewScore}</span>
    <h5>{review.title}</h5>
    <pre>{review.description}</pre>
  </div>
  <div class="review-sub">
    <span>{review.nickname}</span>
    <br>
    <span class="review-date">작성일 : {review.createdAt}</span>
    <span class="review-date">수정일 : {review.modifiedAt}</span>
  </div>
</div>
{#if review.uid === $auth.uid}
<div class="detail-bottom-button">
  <button class="btn btn-update" on:click={() => onEditModeReview(review.id)}>수정하기</button>
  <button class="btn btn-delete" on:click={() => onDeleteReview(review.id)}>삭제하기</button>
</div>
{/if}
{/if}