<script>
  import { onMount, beforeUpdate, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
  import { auth, isLogin } from "../../../store/auth/authStore";
  import DetailPlan from './DetailPlan.svelte';
  import PlanMap from './PlanMap.svelte';
  export let planDetail
  export let detailMode

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  onDestroy(() => {
    dispatch('detail-off')
  })
</script>

<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
</div>

<div class="col-md-7 col-lg-8 common_form">
  <ul class="list-group mb-3">
    <li class="list-group-item">
      <div>
        <h6>제목</h6>
        <p class="categoryName" id="categoryName">{$planDetail.data.title}</p>
      </div>
    </li>
  </ul>
</div>

<div class="plan_map">
  <PlanMap {planDetail} />
</div>

<div>
  <h4>목적지</h4>
  {#if $planDetail.data.detailPlans}
  {#each $planDetail.data.detailPlans as detailPlan, index}
    <DetailPlan {detailPlan} {index} />
  {/each}
  {/if}
</div>