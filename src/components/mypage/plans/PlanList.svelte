<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte'
  import { plans, planDetail, requestPath, currentPlanPaginationBar, currentPlansPage } from '../../../store/plans/planStore'
  import Plan from './Plan.svelte';
  import PlanDetail from './PlanDetail.svelte';

  let detailMode = false
  let searchMode = true

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
<div class="plan_detail">
  {#if $planDetail}
    <PlanDetail {planDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}

{#if searchMode}
<div class="plan_list" bind:this={component}>
  <ul>
    {#each $plans.data.content as plan, index}
      <li on:click={() => onDetailMode(plan.id)}>
        <Plan {plan} {index} />
      </li>
    {/each}
  </ul>
</div>

<div class="plan_pagination">
  <ul>
    {#each $currentPlanPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentPlansPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}
{/if}