<script>
  import { reviews } from '../../store/reviews/reviewStore'
  export let placeDetailData

  let values = {
    formTitle: '',
    formDescription: '',
    formReviewScore: 0
  }

  const onAddReview = async() => {
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

</script>

<div class="review-form">
  <div class="review-form-header">

  </div>
  <div>
    <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={values.formTitle}/>
  </div>
  <div>
    <textarea id="description" name="description" placeholder="내용을 입력해주세요" rows="5" bind:value={values.formDescription}></textarea>
  </div>
  <div>
    <input type="range" name="reviewScore" min=0 max=5 bind:value={values.formReviewScore}/>
  </div>
</div>

<div>
  <button class="btn btn-create" on:click={onAddReview}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddReview}>취소</button>
</div>