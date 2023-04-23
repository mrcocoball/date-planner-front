<script>
  export let review
  export let index
</script>

<div class="review_thumb">
  <span>{index+1}</span>
  <span>{review.placeName}</span>
  <span>{review.title}</span>
  <span>{review.reviewScore}</span>
  <span>{review.createdAt}</span>
  <span>{review.modifiedAt}</span>
</div>