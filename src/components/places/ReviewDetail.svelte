<script>
  export let review
  export let index
  import { auth } from '../../store/auth/authStore'
  import { reviews } from '../../store/reviews/reviewStore';
  import ReviewEditForm from './ReviewEditForm.svelte';

  let isViewMenu = false

  // 반응성 블록
  $ : {
    if($reviews.menuPopup === review.id) {
      isViewMenu = true
    }
    else {
      isViewMenu = false
    }
  }

  const onToggleMenuPopup = (id) => {
    if(isViewMenu === true) {
      reviews.closeMenuPopup()
      return
    }
    reviews.openMenuPopup(id)
  }

  const onEditModeReview = (id) => {
    reviews.openEditModeReview(id)
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
<div class="review_detail">
  <p>작성자 : {review.nickname}</p>
  <p>평점 : {review.reviewScore}</p>
  <p>제목 : {review.title}</p>
  <p>내용 : {review.description}</p>
  <p>작성일 : {review.createdAt}</p>
  <p>수정일 : {review.modifiedAt}</p>
</div>
<div class="content-box-header-inner-right">
  {#if review.uid === $auth.uid}
    <button class="button-base-circle" on:click={() => onToggleMenuPopup(review.id)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    </button>
    <div class="drop-menu-box" class:block={isViewMenu}> <!-- block이라는 css class 필요 -->
      <ul>
        <li><button href="" class="drop-menu-button" on:click={() => onEditModeReview(review.id)}>수정</button></li>
        <li><button href="" class="drop-menu-button" on:click={() => onDeleteReview(review.id)}>삭제</button></li>
      </ul>              
    </div>
  {/if}
</div>
{/if}