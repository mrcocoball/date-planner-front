<script>
  import { onMount, onDestroy } from 'svelte'
  import { plans, planDetail, requestPath, currentPlanPaginationBar, currentPlansPage } from '../../../store/plans/planStore'
  import Plan from './Plan.svelte';
  import PlanDetail from './PlanDetail.svelte';
  import PlanAddForm from './PlanAddForm.svelte';

  let detailMode = false
  let searchMode = true
  let addMode = false

  let component

  onMount(() => {
    try {
      plans.resetPlans()
      plans.fetchPlans()
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  })

  const setPage = async (pageNum) => {
    try {
      await plans.fetchPlansByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (id) => {
    detailMode = true
    goPlanDetail(id)
  }

  // 하위 컴포넌트인 PlanDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    planDetail.resetPlan()
  }

  const onAddPlanMode = () => {
    addMode = true
  }

  const offAddPlanMode = () => {
    addMode = false
  }

  const goPlanDetail = async (id) => {
    try {
      await planDetail.getPlan(id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    requestPath.set('')
    plans.resetPlans()
    planDetail.resetPlan()
    currentPlanPaginationBar.resetPaginationBar()
    currentPlansPage.resetPage()
    searchMode = false
  })

</script>

{#if detailMode}
<div class="plan-detail">
  {#if $planDetail}
    <PlanDetail {planDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}

{#if !addMode}
<div class="plan-add-form-header">
  <h2>플랜 목록</h2>
  <span>여러분만의 일정 플랜을 짜보세요. 장소를 검색하거나 북마크한 장소를 토대로 목적지를 체크하여 플랜을 짤 수 있습니다.</span>
  <br>
  <span>또한 플랜을 완료하셨다면 후기를 남길 수 있습니다!</span>
</div>
<div class="detail-top-button">
  <button class="btn btn-create" on:click={onAddPlanMode}>플랜 작성해보기</button>
</div>
{:else}
<div class="plan-add-form-header">
  <h4>플랜 작성</h4>
  <span>플랜의 제목을 입력하세요. 그리고 만들어진 플랜을 클릭하여 목적지를 추가할 수 있습니다.</span>
</div>
<div class="plan-add-form">
  <PlanAddForm bind:addMode={addMode}/>
</div>
{/if}

{#if searchMode}
<div class="plan-list" bind:this={component}>
  {#each $plans.data.content as plan, index}
  <ul class="list-group">
    <li class="list-group-item plan-thumb-item" on:click={() => onDetailMode(plan.id)}>
      <Plan {plan} {index} />
    </li>
  </ul>
  {/each}
</div>

<nav id="pagination" aria-label="Page navigation">
  <div class="plan-pagination">
    <ul class="pagination justify-content-center">
      {#each $currentPlanPaginationBar as pageButton}
        <li class={pageButton === $currentPlansPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
{/if}
{/if}