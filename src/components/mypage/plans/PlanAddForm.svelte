<script>
  import { plans } from '../../../store/plans/planStore'
  export let addMode

  let values = {
    formTitle : ''
  }

  const onAddPlan = async() => {
    if (!titleLengthValidate()) return
    try{
      await plans.addPlan(values.formTitle)
      onCancelAddPlan()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onCancelAddPlan = () => {
    values.formTitle = ''
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

</script>

<div class="plan-form">
  <div class="plan-form-deatil">
    <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요 (최대 20자)" bind:value={values.formTitle}/>
  </div>
</div>

<div class="detail-bottom-button">
  <button class="btn btn-create" on:click={onAddPlan}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddPlan}>취소</button>
</div>