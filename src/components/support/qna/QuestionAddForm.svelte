<script>
  import { qnas } from '../../../store/qnas/qnaStore'
  export let addMode

  let values = {
    formCategoryId: '',
    formTitle: '',
    formDescription: '',
  }

  const onAddQuestion = async() => {
    if(!categoryIdValidate() || !titleLengthValidate() || !descriptionLengthValidate()) return
    try{
      await qnas.addQuestion(values.formTitle, values.formDescription, values.formCategoryId)
      onCancelAddQuestion()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onCancelAddQuestion = () => {
    values.formTitle = ''
    values.formDescription = ''
    values.formCategoryId = ''
    addMode = false
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

  const categoryIdValidate = () => {
    if (values.formCategoryId == '') {
      alert('카테고리를 선택해주세요!')
      return false
    }
    return true
  }

</script>

<div class="question-add-form">
  <div class="question-form-div">
    <h6>카테고리</h6>
    <select class="form-control qna-category" bind:value={values.formCategoryId}>
      <option value="" disabled>카테고리 선택</option>
      <option value=1>장소 관련 문의</option>
      <option value=2>계정 관련 문의</option>
      <option value=3>이벤트 관련 문의</option>
      <option value=4>오류 관련 문의</option>
      <option value=5>기타 문의</option>
    </select>
  </div>
  <div class="question-form-div">
    <h6>제목</h6>
    <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요 (최대 20자)" bind:value={values.formTitle}/>
  </div>
  <div class="question-form-div">
    <h6>내용</h6>
    <textarea class="form-control" name="description" rows="15" placeholder="내용을 입력해주세요 (최대 500자)" bind:value={values.formDescription}/>
  </div>
</div>

<div class="detail-bottom-button">
  <button class="btn btn-create" on:click={onAddQuestion}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddQuestion}>취소</button>
</div>