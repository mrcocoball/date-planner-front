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

<div class="detailplan-thumb">
  <div class="detailplan-default">
    <h6>{index+1} {detailPlan.placeName}</h6>
    <span>{detailPlan.addressName}</span>
  </div>
  <div class="detailplan-sub">
    <button type="button" class="btn btn-delete" on:click={() => onDeleteReview(detailPlan.id)}>삭제</button>
  </div>
</div>