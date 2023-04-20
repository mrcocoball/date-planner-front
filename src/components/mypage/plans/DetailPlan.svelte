<script>
  export let detailPlan
  export let index
</script>

<div class="detailPlan_thumb">
  <span>{index+1}</span>
  <span>{detailPlan.placeName}</span>
  <span>{detailPlan.addressName}</span>
</div>