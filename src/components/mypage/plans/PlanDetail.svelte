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
<div class="detail-plan-selected">
  <div class="detail-top-button">
    <button class="btn-close" on:click={offAddMode} aria-label="Close"></button>
  </div>
  {#if inputDetailPlanValue.formPlace_id}
  <div class="detail-plan-selected-header">
    <h4>입력된 장소</h4>
    <ul class="list-group">
      <li class="list-group-item">
        <span>{inputDetailPlanValue.formPlace_name}</span>
      </li>
    </ul>
    <div class="detail-bottom-button">
      <button class="w-100 btn btn-create" on:click={onAddDetailPlan}>목적지로 추가하기</button>
    </div>
  </div>
  {/if}
  <div class="detail-plan-add-form">
    <DetailPlanAddForm bind:planDetailInfo={planDetail} bind:inputDetailPlanValue={inputDetailPlanValue} />
  </div>
</div>
{:else}
<div class="detail-top-button">
  <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
</div>

<div class="common-form">
  <ul class="list-group">
    <li class="list-group-item">
      <div>
        <h6>플랜 이름</h6>
        {#if !editMode}
        <p class="categoryName" id="categoryName">{$planDetail.data.title}</p>
        <div class="detail-bottom-button">
          <button class="btn btn-update" on:click={onEditMode}>제목 수정</button>
          <button class="btn btn-delete" on:click={() => onDeletePlan($planDetail.data.id)}>삭제하기</button>
        </div>
        {:else}
        <input type="text" class="form-control" name="title" placeholder="제목을 입력해주세요" bind:value={titleValues.formTitle}/>
        <div class="detail-bottom-button">
          <button class="btn btn-update" on:click={() => onUpdatePlan($planDetail.data.id, titleValues.formTitle)}>수정</button>
          <button class="btn btn-cancel" on:click={offEditMode}>취소하기</button>
        </div>
        {/if}
      </div>
    </li>
  </ul>
</div>

<div class="plan-map">
  <PlanMap {planDetail} />
</div>

<div class="detail-plan">
  <h4>목적지 리스트</h4>
  <div class="detail-top-button">
    <button class="btn btn-create" on:click={onAddMode}>목적지 추가하기</button>
  </div>
  {#if $planDetail.data.detailPlans.length != 0}
  <div class="detail-plan-list">
    {#each $planDetail.data.detailPlans as detailPlan, index}
    <ul class="list-group">
      <li class="list-group-item detailplan-thumb-item">
        <DetailPlan {detailPlan} {index} />
      </li>
    </ul>
    {/each}
  </div>
  {:else}
  <div class="detail-plan-list-empty">
    <ul class="list-group">
      <li class="list-group-item text-center detail-plan-list-empty-box">
        <br>
        <br>
        <br>
        <h4>목적지가 아직 없네요?</h4>
        <span>장소를 검색해서 목적지를 추가해보세요!</span>
        <br>
        <br>
        <span><b>[목적지 추가하기]</b> →</span>
        <br>
        <span><b>[장소 검색해서 가져오기]</b></span>
        <br>
        <span>또는</span>
        <br>
        <span><b>[북마크 목록에서 가져오기]</b> 클릭</span>
      </li>
    </ul>
  </div>
  {/if}
</div>

{#if !$planDetail.data.finished}
<div class="plan-comment-empty">
  <div class="detail-bottom-button">
    <button class="w-100 btn btn-update" on:click={() => onFinishPlan($planDetail.data.id)}>플랜 완료하기</button>
  </div>
</div>
{:else}
<div class="plan-comment">
  {#if !$planDetail.data.comment}
  <div class="plan-comment-form">
    <div class="plan-comment-form-header">
      <h4>후기 작성</h4>
      <span>플랜을 완료하셨군요! 후기를 남겨보세요!</span>
    </div>
  </div>
  <textarea rows="5" class="form-control" bind:value={commentValues.formComment}></textarea>
  <div class="detail-bottom-button">
    <button class="btn btn-create" on:click={() => onWriteComment($planDetail.data.id)}>후기 작성</button>
  </div>
  {:else}
  {#if commentEditMode}
  <div class="plan-comment-form">
    <div class="plan-comment-form-header">
      <h4>후기 수정</h4>
      <span>후기를 수정합니다</span>
    </div>
  </div>
  <textarea rows="5" class="form-control" bind:value={commentValues.formComment}></textarea>
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={() => onUpdateComment($planDetail.data.id)}>수정하기</button>
    <button class="btn btn-cancel" on:click={offCommentEditMode}>취소하기</button>
  </div>
  {:else}
  <div class="plan-comment-header">
    <h4>후기</h4>
  </div>
  <ul class="list-group">
    <li class="list-group-item">
      <pre>{$planDetail.data.comment}</pre>
    </li>
  </ul>
  <div class="detail-bottom-button">
    <button class="btn btn-update" on:click={onCommentEditMode}>후기 수정</button>
  </div>
  {/if}
  {/if}
</div>
{/if}
{/if}