<script>
  import { plans } from '../../../store/plans/planStore'
  export let addMode

  let values = {
    formTitle : ''
  }

  const onAddPlan = async() => {
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
</script>

<div class="plan-form">
  <div class="plan-form-deatil">
    <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요" bind:value={values.formTitle}/>
  </div>
</div>

<div class="detail-bottom-button">
  <button class="btn btn-create" on:click={onAddPlan}>입력</button>
  <button class="btn btn-cancel" on:click={onCancelAddPlan}>취소</button>
</div>