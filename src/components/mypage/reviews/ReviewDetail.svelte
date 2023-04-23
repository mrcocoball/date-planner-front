<script>
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { myReviews } from '../../../store/reviews/myReviewStore'
  export let myReviewDetail
  export let detailMode

  let editMode = false;

  let initValues = {
    formTitle: '',
    formDescription: '',
    formReviewScore: 0
  }

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  const onEditMode = () => {
    initValues.formTitle = $myReviewDetail.data.title
    initValues.formDescription = $myReviewDetail.data.description
    initValues.formReviewScore = $myReviewDetail.data.reviewScore
    editMode = true
  }

  const offEditMode = () => {
    editMode = false
    initValues.formTitle = ''
    initValues.formDescription = ''
    initValues.formReviewScore = 0
  }

  const onUpdateReview = (id, title, description, reviewScore) => {
    if(confirm('리뷰를 수정하시겠습니까?')) {
      myReviewDetail.updateMyReview(id, title, description, reviewScore)
      editMode = false
    }
  }

  const onDeleteReview = (id) => {
    if(confirm('리뷰를 삭제하시겠습니까?')) {
      myReviews.deleteMyReview(id)
      detailMode = false
    }
  }

  onDestroy(() => {
    dispatch('detail-off')
  })

</script>

<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
</div>

<div>
  <h4>장소명 : {$myReviewDetail.data.placeName}</h4>
  <p>장소 URL : {$myReviewDetail.data.placeUrl}</p>
  <p>작성일자 : {$myReviewDetail.data.createdAt}</p>
</div>

{#if editMode}
<div>
  <div>
    <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={initValues.formTitle}/>
  </div>
  <div>
    <textarea id="description" name="description" placeholder="내용을 입력해주세요" rows="5" bind:value={initValues.formDescription}></textarea>
  </div>
  <div>
    <input type="range" name="reviewScore" min=0 max=5 bind:value={initValues.formReviewScore}/>
  </div>
  <button class="btn btn-update" on:click={() => onUpdateReview($myReviewDetail.data.id, initValues.formTitle, initValues.formDescription, initValues.formReviewScore)}>수정</button>
  <button class="btn btn-cancel" on:click={offEditMode}>취소하기</button>
</div>
{:else}
<div>
  <h6>제목 : {$myReviewDetail.data.title}</h6>
  <textarea rows="5" readonly>{$myReviewDetail.data.description}</textarea>
  <p>평점 : {$myReviewDetail.data.reviewScore}</p>
  <button class="btn btn-update" on:click={onEditMode}>수정하기</button>
  <button class="btn btn-delete" on:click={() => onDeleteReview($myReviewDetail.data.id)}>삭제하기</button>
</div>
{/if}