<script>
  export let plan
  export let index
</script>

<div class="plan_thumb">
  <span>{index+1}</span>
  <span>{plan.title}</span>
  {#if plan.finished}
  <span>완료됨</span>
  {/if}
</div>