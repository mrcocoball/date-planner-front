<script>
  import { onDestroy, createEventDispatcher } from 'svelte'
  import { plans } from '../../../store/plans/planStore'
  import DetailPlan from './DetailPlan.svelte';
  import PlanMap from './PlanMap.svelte';
  import DetailPlanAddForm from './DetailPlanAddForm.svelte';
  export let planDetail
  export let detailMode

  let inputDetailPlanValue = {
    formPlace_id: '',
    formPlace_name: '',
  }

  let titleValues = {
    formTitle: '',
  }

  let commentValues = {
    formComment: '',
  }

  let addMode = false
  let editMode = false
  let commentEditMode = false

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  const onAddMode = () => {
    addMode = true
    offEditMode()
  }

  const offAddMode = () => {
    addMode = false
    inputDetailPlanValue.formPlace_id = ''
    inputDetailPlanValue.formPlace_name = ''
  }

  const onEditMode = () => {
    titleValues.formTitle = $planDetail.data.title
    editMode = true
  }

  const offEditMode = () => {
    editMode = false
    titleValues.formTitle = ''
  }

  const onAddDetailPlan = async() => {
    let size = $planDetail.data.detailPlans.length
    try{
      await planDetail.addDetailPlan(inputDetailPlanValue.formPlace_id, $planDetail.data.id, size)
      alert('추가되었습니다.')
      onCancelAddDetailPlan()
      offAddMode()
    }
    catch(error) {
      alert(error)
    }
  }

  const onCancelAddDetailPlan = () => {
    inputDetailPlanValue.formPlace_id = ''
    inputDetailPlanValue.formPlace_name = ''
  }

  const onDeletePlan = (id) => {
    if(confirm('플랜을 삭제하시겠습니까?')) {
      plans.deletePlan(id)
      detailMode = false
    }
  }

  const onUpdatePlan = (id, title) => {
    if(confirm('플랜을 수정하시겠습니까?')) {
      planDetail.updatePlan(id, title, $planDetail.data.comment)
      editMode = false
    }
  }

  const onFinishPlan = (id) => {
    if(confirm('플랜을 완료하시겠습니까?')) {
      planDetail.finished(id)
    }
  }

  const onWriteComment = (id) => {
    if(confirm('후기를 작성하시겠습니까?')) {
      planDetail.updateComment(id, $planDetail.data.title, commentValues.formComment)
    }
  }

  const onCommentEditMode = () => {
    commentValues.formComment = $planDetail.data.comment
    commentEditMode = true
  }

  const offCommentEditMode = () => {
    commentValues.formComment = ''
    commentEditMode = false
  }

  const onUpdateComment = (id) => {
    if(confirm('후기를 수정하시겠습니까?')) {
      planDetail.updateComment(id, $planDetail.data.title, commentValues.formComment)
    }
    offCommentEditMode()
  }

  onDestroy(() => {
    dispatch('detail-off')
  })

</script>

{#if addMode}
<div>
  {#if inputDetailPlanValue.formPlace_id}
  <div>
    <h6>입력된 장소</h6>
    <span>{inputDetailPlanValue.formPlace_name}</span>
    <button class="btn btn-create" on:click={onAddDetailPlan}>추가하기</button>
  </div>
  {/if}
  <button class="btn btn-cancel" on:click={offAddMode}>취소하기</button>
  <DetailPlanAddForm bind:planDetailInfo={planDetail} bind:inputDetailPlanValue={inputDetailPlanValue} />
</div>

{:else}
<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
  <button class="btn btn-update" on:click={onEditMode}>제목 수정</button>
  <button class="btn btn-delete" on:click={() => onDeletePlan($planDetail.data.id)}>삭제하기</button>
</div>

<div class="col-md-7 col-lg-8 common_form">
  <ul class="list-group mb-3">
    <li class="list-group-item">
      <div>
        <h6>제목</h6>
        {#if !editMode}
        <p class="categoryName" id="categoryName">{$planDetail.data.title}</p>
        {:else}
        <input type="text" name="title" placeholder="제목을 입력해주세요" bind:value={titleValues.formTitle}/>
        <button class="btn btn-update" on:click={() => onUpdatePlan($planDetail.data.id, titleValues.formTitle)}>수정</button>
        <button class="btn btn-cancel" on:click={offEditMode}>취소하기</button>
        {/if}
      </div>
    </li>
  </ul>
</div>

<div class="plan_map">
  <PlanMap {planDetail} />
</div>

<div>
  <h4>목적지</h4>
  <div>
    <button class="btn btn-create" on:click={onAddMode}>목적지 추가하기</button>
  </div>
  {#if $planDetail.data.detailPlans}
  {#each $planDetail.data.detailPlans as detailPlan, index}
    <DetailPlan {detailPlan} {index} />
  {/each}
  {/if}
</div>

{#if !$planDetail.data.finished}
<div>
  <button class="btn btn-update" on:click={() => onFinishPlan($planDetail.data.id)}>플랜 완료하기</button>
</div>
{:else}
<div>
  {#if !$planDetail.data.comment}
  <textarea rows="5" bind:value={commentValues.formComment}></textarea>
  <button class="btn btn-create" on:click={() => onWriteComment($planDetail.data.id)}>후기 작성</button>
  {:else}
  {#if commentEditMode}
  <textarea rows="5" bind:value={commentValues.formComment}></textarea>
  <button class="btn btn-update" on:click={() => onUpdateComment($planDetail.data.id)}>수정하기</button>
  <button class="btn btn-cancel" on:click={offCommentEditMode}>취소하기</button>
  {:else}
  <textarea rows="5" readonly>{$planDetail.data.comment}</textarea>
  <button class="btn btn-update" on:click={onCommentEditMode}>후기 수정</button>
  {/if}
  {/if}
</div>
{/if}
{/if}