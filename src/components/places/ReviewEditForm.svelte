<script>
  export let review
  import { reviews } from '../../store/reviews/reviewStore'

  let reviewValue = {
    id: review.id,
    uid: review.uid,
    nickname: review.nickname,
    title: review.title,
    description: review.description,
    reviewScore: review.reviewScore
  }

  const onCloseEditModeReview = () => {
    reviews.closeEditModeReview()
  }

  const onUpdateReview = () => {
    reviews.updateReview(reviewValue)
  }
</script>

<div class="review-form">
  <div class="review-form-header">

  </div>
  <div>
    <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={reviewValue.title}/>
  </div>
  <div>
    <textarea id="description" name="description" placeholder="내용을 입력해주세요" rows="5" bind:value={reviewValue.description}></textarea>
  </div>
  <div>
    <input type="range" name="reviewScore" min=0 max=5 bind:value={reviewValue.reviewScore}/>
  </div>
</div>

<div>
  <button class="btn btn-update" on:click={onUpdateReview}>완료</button>
  <button class="btn btn-cancel" on:click={onCloseEditModeReview}>취소</button>
</div>