<script>
  import { afterUpdate, createEventDispatcher, onDestroy } from 'svelte'
  import { qnas } from '../../../store/qnas/qnaStore'
  import Answer from './Answer.svelte';
  export let qnaDetail
  export let detailMode

  let editMode = false

  let modifyValues = {
    formTitle: '',
    formDescription: '',
    formCategoryId: ''
  }

  let answerValues = {
    formDescription: ''
  }

  let categories = [
    {'value' : 1, 'name' : '장소 관련 문의'},
    {'value' : 2, 'name' : '계정 관련 문의'},
    {'value' : 3, 'name' : '이벤트 관련 문의'},
    {'value' : 4, 'name' : '오류 관련 문의'},
    {'value' : 5, 'name' : '기타 문의'},
  ]

  let category = ''

  afterUpdate(() => {
    if ($qnaDetail.data.categoryId == 1) {
      category = 'ct-qcb1-l'
    } else if ($qnaDetail.data.categoryId == 2) {
      category = 'ct-qcb2-l'
    } else if ($qnaDetail.data.categoryId == 3) {
      category = 'ct-qcb3-l'
    } else if ($qnaDetail.data.categoryId == 4) {
      category = 'ct-qcb4-l'
    } else {
      category = 'ct-qcb5-l'
    }
  })

  const dispatch = createEventDispatcher()

  const onAddAnswer = async () => {
    if (!answerDescriptionLengthValidate()) return
    try{
      await qnaDetail.addAnswer($qnaDetail.data.id, answerValues.formDescription)
      answerValues.formDescription = ''
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onEditMode = () => {
    modifyValues.formTitle = $qnaDetail.data.title
    modifyValues.formDescription = $qnaDetail.data.description
    modifyValues.formCategoryId = $qnaDetail.data.categoryId
    editMode = true
  }

  const offEditMode = () => {
    editMode = false
    modifyValues.formTitle = ''
    modifyValues.formDescription = ''
    modifyValues.formCategoryId = ''
  }

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  const onDeleteQuestion = () => {
    if(confirm('질문을 삭제하시겠습니까?')) {
      qnas.deleteQuestion($qnaDetail.data.id)
      detailMode = false
    }
  }

  const onUpdateQuestion = () => {
    if (!titleLengthValidate()) return
    if (!descriptionLengthValidate()) return
    if(confirm('질문을 수정하시겠습니까?')) {
      qnaDetail.updateQuestion($qnaDetail.data.id, modifyValues.formTitle, modifyValues.formDescription, modifyValues.formCategoryId)
      editMode = false
    }
  }

  const titleLengthValidate = () => {
    if (modifyValues.formTitle.length == 0) {
      alert('제목 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (modifyValues.formTitle.length > 20) {
      alert('제목 길이는 20자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

  const descriptionLengthValidate = () => {
    if (modifyValues.formDescription.length == 0) {
      alert('내용 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (modifyValues.formDescription.length > 500) {
      alert('내용 길이는 500자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

  const answerDescriptionLengthValidate = () => {
    if (answerValues.formDescription.length == 0) {
      alert('내용 길이는 최소 1자 이상이어야 합니다!')
      return false
    }
    if (answerValues.formDescription.length > 300) {
      alert('내용 길이는 300자를 넘길 수 없습니다!')
      return false
    }
    return true
  }

  onDestroy(() => {
    dispatch('detail-off')
    qnaDetail.resetQna()
  })

</script>

<div class="common-form">
  {#if !editMode}
  <div class="detail-top-button">
    <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
  </div>
  <div class="qna-detail-header">
    <span class={category}>{$qnaDetail.data.categoryName}</span>
    <h2>{$qnaDetail.data.title}</h2>
    <span>{$qnaDetail.data.createdAt}</span>
  </div>
  <div class="qna-detail-form">
    <pre class="qna-description">{$qnaDetail.data.description}</pre>
  </div>
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={onEditMode}>수정하기</button>
    <button class="btn btn-delete" on:click={onDeleteQuestion}>삭제하기</button>
  </div>

  <div class="answer-form">
    <div class="answer-form-header">
      <h4>답변 / 추가 질문</h4>
    </div>
  </div>
  <div class="answer-list">
    {#if $qnaDetail.data.answers.length != 0}
    {#each $qnaDetail.data.answers as answer}
    <ul class="list-group">
      <li class="list-group-item ans-thumb-item">
        <Answer {answer} />
      </li>
    </ul>
    {/each}
    {:else}
    <ul class="list-group">
      <li class="list-group-item text-center">
        <br>
        <h4>답변 대기 중입니다!</h4>
        <span>현재 질문 검토 중에 있습니다.</span>
        <br>
        <span>최대한 빠르게 답변 도와드리겠습니다.</span>
        <br>
        <br>
      </li>
    </ul>
    {/if}
  </div>
  <div class="answer-add-form">
    <div class="answer-add-form-header">
      <h4>추가 질문</h4>
    </div>
    <textarea class="form-control" rows="5" placeholder="내용을 입력해주세요 (최대 300자, 답변 수정 / 삭제 불가)" bind:value={answerValues.formDescription}></textarea>
    <div class="detail-bottom-button">
      <button class="btn btn-create" on:click={onAddAnswer}>답변 작성</button>
    </div>
  </div>
  {:else}
  <div class="question-update-form">
    <div class="question-update-form-header">
      <h2>질문 수정</h2>
      <span>작성한 질문을 수정합니다.</span>
    </div>
    <div class="question-update-form-box">
      <h6>카테고리</h6>
      <select class="form-control qna-category" bind:value={modifyValues.formCategoryId}>
        {#each categories as category}
        <option value={category.value} selected={Number(modifyValues.formCategoryId) == category.value}>{category.name}</option>
        {/each}
      </select>
    </div>
    <div class="question-form-div">
      <h6>제목</h6>
      <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요 (최대 20자)" bind:value={modifyValues.formTitle}/>
    </div>
    <div class="question-form-div">
      <h6>내용</h6>
      <textarea class="form-control" name="description" rows="15" placeholder="내용을 입력해주세요 (최대 500자)" bind:value={modifyValues.formDescription}/>
    </div>
  </div>
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={onUpdateQuestion}>수정</button>
    <button class="btn btn-cancel" on:click={offEditMode}>취소</button>
  </div>
  {/if}
</div>