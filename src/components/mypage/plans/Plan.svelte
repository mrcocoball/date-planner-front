<script>
  export let plan
  export let index
</script>

<div class="plan-thumb">
  <div class="plan-default">
    <span class="plan-title">{plan.title}</span>
    {#if plan.finished}
    <br>
    <span class="plan-finished">완료됨</span>
    {/if}
  </div>
  <div class="plan-sub">
    <span>작성일자 : {plan.createdAt}</span>
    <br>
    <span>수정일자 : {plan.modifiedAt}</span>
    <br>
  </div>
</div>