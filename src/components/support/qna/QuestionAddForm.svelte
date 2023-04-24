<script>
  import { qnas } from '../../../store/qnas/qnaStore'
  export let addMode

  let values = {
    formCategoryId: '',
    formTitle: '',
    formDescription: '',
  }

  const onAddQuestion = async() => {
    try{
      if (values.formCategoryId != '') {
        await qnas.addQuestion(values.formTitle, values.formDescription, values.formCategoryId)
        onCancelAddQuestion()
      }
      else { alert('카테고리를 선택해주세요') }
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

</script>

<div class="question_add_form">
  <div>
    <select bind:value={values.formCategoryId}>
      <option value="" disabled>카테고리 선택</option>
      <option value=1>장소 관련 문의</option>
      <option value=2>계정 관련 문의</option>
      <option value=3>이벤트 관련 문의</option>
      <option value=4>오류 관련 문의</option>
      <option value=5>기타 문의</option>
    </select>
  </div>
  <div>
    <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={values.formTitle}/>
  </div>
  <div>
    <textarea name="description" rows="5" placeholder="내용을 입력해주세요" bind:value={values.formDescription}/>
  </div>
</div>

<div>
  <button class="btn btn-create" on:click={onAddQuestion}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddQuestion}>취소</button>
</div>