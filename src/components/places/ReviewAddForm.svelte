<script>
  import { reviews } from '../../store/reviews/reviewStore'
  export let placeDetailData

  let values = {
    formTitle: '',
    formDescription: '',
    formReviewScore: 0
  }

  const onAddReview = async() => {
    if (!titleLengthValidate() || !descriptionLengthValidate()) return
    try{
      await reviews.addReview($placeDetailData.data.place_id, values.formTitle, values.formDescription, values.formReviewScore)
      onCancelAddReview()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onCancelAddReview = () => {
    values.formTitle = ''
    values.formDescription = ''
    values.formReviewScore = 0
  }

  const titleLengthValidate = () => {
    if (values.formTitle.length == 0) {
      alert('제목 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (values.formTitle.length > 20) {
      alert('제목 길이는 20자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

  const descriptionLengthValidate = () => {
    if (values.formDescription.length == 0) {
      alert('내용 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (values.formDescription.length > 500) {
      alert('내용 길이는 500자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

</script>

<div class="review-form">
  <div class="review-form-header" style="margin-bottom: 20px;">
    <span>보고 계신 장소에 대한 리뷰를 작성해보세요!</span>
  </div>
  <div class="review-form-detail">
    <label>
      <h6>제목</h6>
    </label>
    <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요 (최대 20자)" bind:value={values.formTitle}/>
  </div>
  <div>
    <label>
      <h6>내용</h6>
    </label>
    <textarea id="description" class="form-control" name="description" placeholder="내용을 입력해주세요 (최대 500자)" rows="5" bind:value={values.formDescription}></textarea>
  </div>
  <div>
    <label>
      <h6>평점 : {values.formReviewScore}</h6>
    </label>
    <input type="range" class="form-control" name="reviewScore" min=0 max=5 bind:value={values.formReviewScore}/>
  </div>
</div>

<div class="detail-bottom-button">
  <button class="btn btn-create" on:click={onAddReview}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddReview}>취소</button>
</div>