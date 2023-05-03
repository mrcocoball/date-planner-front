<script>
  import { afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
  import { myReviews } from '../../../store/reviews/myReviewStore'
  export let myReviewDetail
  export let detailMode

  let editMode = false;

  let initValues = {
    formTitle: '',
    formDescription: '',
    formReviewScore: 0
  }

  let reviewScoreStar = ''

  afterUpdate(() => {

    if ($myReviewDetail.data.reviewScore < 1) {
      reviewScoreStar = `☆☆☆☆☆`
    } else if ($myReviewDetail.data.reviewScore >= 1 && $myReviewDetail.data.reviewScore < 2) {
      reviewScoreStar = `★☆☆☆☆`
    } else if ($myReviewDetail.data.reviewScore >= 2 && $myReviewDetail.data.reviewScore < 3) {
      reviewScoreStar = `★★☆☆☆`
    } else if ($myReviewDetail.data.reviewScore >= 3 && $myReviewDetail.data.reviewScore < 4) {
      reviewScoreStar = `★★★☆☆`
    } else if ($myReviewDetail.data.reviewScore >= 4 && $myReviewDetail.data.reviewScore < 5) {
      reviewScoreStar = `★★★★☆`
    } else {
      reviewScoreStar = `★★★★★`
    }

  })

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
    if (!titleLengthValidate() || !descriptionLengthValidate()) return
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

  const titleLengthValidate = () => {
    if (initValues.formTitle.length == 0) {
      alert('제목 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (initValues.formTitle.length > 20) {
      alert('제목 길이는 20자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

  const descriptionLengthValidate = () => {
    if (initValues.formDescription.length == 0) {
      alert('내용 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (initValues.formDescription.length > 500) {
      alert('내용 길이는 500자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

</script>

<div class="detail-top-button">
  <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
</div>

<div class="review-place-information">
  <div class="review-place-information-header">
    <h4>리뷰 장소 정보</h4>
    <span>리뷰가 작성된 장소의 정보입니다.</span>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <h6>장소명</h6>
      <div>
        <span>{$myReviewDetail.data.placeName}</span>
      </div>
    </li>
    <li class="list-group-item">
      <h6>장소 정보 보기 (카카오맵)</h6>
      <div>
        <a href={$myReviewDetail.data.placeUrl} target="_blank">확인하기</a>
      </div>
    </li>
  </ul>
</div>

{#if editMode}
<div class="review-information">
  <div class="review-information-header">
    <h4>리뷰 정보 수정</h4>
    <span>제목과 내용을 수정할 수 있습니다.</span>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <div>
        <h6>제목</h6>
        <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요 (최대 20자)" bind:value={initValues.formTitle}/>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>내용</h6>
        <textarea id="description" class="form-control" name="description" placeholder="내용을 입력해주세요 (최대 500자)" rows="5" bind:value={initValues.formDescription}></textarea>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>평점</h6>
        <input type="range" class="form-control" name="reviewScore" min=0 max=5 bind:value={initValues.formReviewScore}/>
      </div>
    </li>
  </ul>
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={() => onUpdateReview($myReviewDetail.data.id, initValues.formTitle, initValues.formDescription, initValues.formReviewScore)}>수정</button>
    <button class="btn btn-cancel" on:click={offEditMode}>취소하기</button>
  </div>
</div>
{:else}
<div class="review-information">
  <div class="review-information-header">
    <h4>리뷰 정보</h4>
    <span>작성된 리뷰 정보이며 수정 및 삭제할 수 있습니다.</span>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <h6>제목</h6>
      <div>
        <span>{$myReviewDetail.data.title}</span>
      </div>
    </li>
    <li class="list-group-item">
      <h6>내용</h6>
      <div>
        <pre class="review-description">{$myReviewDetail.data.description}</pre>
      </div>
    </li>
    <li class="list-group-item">
      <h6>평점</h6>
      <div>
        <span class="review-score">{reviewScoreStar}</span>
        <span>({$myReviewDetail.data.reviewScore}점)</span>
      </div>
    </li>
    <li class="list-group-item">
      <h6>작성일자</h6>
      <div>
        <span>{$myReviewDetail.data.createdAt}</span>
      </div>
    </li>
  </ul> 
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={onEditMode}>수정하기</button>
    <button class="btn btn-delete" on:click={() => onDeleteReview($myReviewDetail.data.id)}>삭제하기</button>
  </div>
</div>
{/if}