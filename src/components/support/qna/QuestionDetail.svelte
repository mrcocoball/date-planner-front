<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
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

  const dispatch = createEventDispatcher()

  const onAddAnswer = async () => {
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
    if(confirm('질문을 수정하시겠습니까?')) {
      qnaDetail.updateQuestion($qnaDetail.data.id, modifyValues.formTitle, modifyValues.formDescription, modifyValues.formCategoryId)
      editMode = false
    }
  }

  onDestroy(() => {
    dispatch('detail-off')
    qnaDetail.resetQna()
  })

</script>

<div class="col-md-7 col-lg-8 common_form">
  {#if !editMode}
  <div>
    <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
  </div>

  <button class="btn btn-update" on:click={onEditMode}>수정하기</button>
  <button class="btn btn-delete" on:click={onDeleteQuestion}>삭제하기</button>
  <ul class="list-group mb-3">
    <h2>{$qnaDetail.data.title}</h2>
    <li class="list-group-item">
      <div>
        <h6>카테고리</h6>
        <p class="categoryName" id="categoryName">{$qnaDetail.data.categoryName}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>작성자</h6>
        <p class="nickname" id="nickname">{$qnaDetail.data.nickname}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>본문</h6>
        <pre class="description" id="description">{$qnaDetail.data.description}</pre>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>작성일자</h6>
        <p class="avgReviewScore" id="avgReviewScore">{$qnaDetail.data.createdAt}</p>
      </div>
    </li>
  </ul>

  <div>
    <div>
      <h4>답변</h4>
    </div>
    {#each $qnaDetail.data.answers as answer}
      <Answer {answer} />
    {/each}
  </div>
  <div>
    <textarea bind:value={answerValues.formDescription}></textarea>
    <button class="btn btn-create" on:click={onAddAnswer}>답변 작성</button>
  </div>
  {:else}
  <div class="question_add_form">
    <div>
      <select bind:value={modifyValues.formCategoryId}>
        {#each categories as category}
        <option value={category.value} selected={Number(modifyValues.formCategoryId) == category.value}>{category.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={modifyValues.formTitle}/>
    </div>
    <div>
      <textarea name="description" rows="5" placeholder="내용을 입력해주세요" bind:value={modifyValues.formDescription}/>
    </div>
  </div>

  <button class="btn btn-update" on:click={onUpdateQuestion}>수정</button>
  <button class="btn btn-cancel" on:click={offEditMode}>취소</button>
  {/if}
</div>