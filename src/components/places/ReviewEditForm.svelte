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
  <div>
    <label>
      <h6>제목</h6>
    </label>
    <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요" bind:value={reviewValue.title}/>
  </div>
  <div>
    <label>
      <h6>내용</h6>
    </label>
    <textarea id="description" class="form-control" name="description" placeholder="내용을 입력해주세요" rows="5" bind:value={reviewValue.description}></textarea>
  </div>
  <div>
    <label>
      <h6>평점 : {reviewValue.reviewScore}</h6>
    </label>
    <input type="range" class="form-control" name="reviewScore" min=0 max=5 bind:value={reviewValue.reviewScore}/>
  </div>
</div>

<div class="detail-bottom-button">
  <button class="btn btn-update" on:click={onUpdateReview}>완료</button>
  <button class="btn btn-cancel" on:click={onCloseEditModeReview}>취소</button>
</div>