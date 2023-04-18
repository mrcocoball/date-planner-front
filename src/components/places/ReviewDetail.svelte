<script>
  export let review
  export let index
  import { auth } from '../../store/auth/authStore'
  import { reviews } from '../../store/reviews/reviewStore';

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
</script>

<div class="review_detail">
  <p>작성자 : {review.nickname}</p>
  <p>평점 : {review.reviewScore}</p>
  <p>제목 : {review.title}</p>
  <p>내용 : {review.description}</p>
  <p>작성일 : {review.createdAt}</p>
  <p>수정일 : {review.modifiedAt}</p>
</div>