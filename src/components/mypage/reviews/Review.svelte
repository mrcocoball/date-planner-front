<script>
  export let review
  export let index
</script>

<div class="my-review-thumb">
  <div class="my-review-default">
    <h5>{review.title}</h5>
    <span>{review.placeName}</span>
  </div>
  <div class="my-review-sub">
    <span>평점 : {review.reviewScore}</span>
    <br>
    <span>작성일자 : {review.createdAt}</span>
    <br>
    <span>수정일자 : {review.modifiedAt}</span>
  </div>
</div>