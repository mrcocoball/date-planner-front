<script>
  import { planDetail } from '../../../store/plans/planStore'
  export let detailPlan
  export let index

  const onDeleteReview = (id) => {
    if(confirm('리뷰를 삭제하시겠습니까?')) {
      planDetail.deleteDetailPlan(id)
    }
  }
</script>

<div class="detailPlan_thumb">
  <span>{index+1}</span>
  <span>{detailPlan.placeName}</span>
  <span>{detailPlan.addressName}</span>
  <button type="button" class="btn btn-delete" on:click={() => onDeleteReview(detailPlan.id)}>삭제</button>
</div>