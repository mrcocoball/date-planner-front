<script>
  import { afterUpdate } from 'svelte'
  export let review
  export let index

  let reviewScoreStar = ''

  afterUpdate(() => {
    if (review.reviewScore < 1) {
      reviewScoreStar = `☆☆☆☆☆`
    } else if (review.reviewScore >= 1 && review.reviewScore < 2) {
      reviewScoreStar = `★☆☆☆☆`
    } else if (review.reviewScore >= 2 && review.reviewScore < 3) {
      reviewScoreStar = `★★☆☆☆`
    } else if (review.reviewScore >= 3 && review.reviewScore < 4) {
      reviewScoreStar = `★★★☆☆`
    } else if (review.reviewScore >= 4 && review.reviewScore < 5) {
      reviewScoreStar = `★★★★☆`
    } else {
      reviewScoreStar = `★★★★★`
    }
  })

</script>

<div class="my-review-thumb">
  <div class="my-review-default">
    <h5>{review.title}</h5>
    <span>{review.placeName}</span>
  </div>
  <div class="my-review-sub">
    <span class="review-score">{reviewScoreStar}</span>
    <span>({review.reviewScore}점)</span>
    <br>
    <span>작성일자 : {review.createdAt}</span>
    <br>
    <span>수정일자 : {review.modifiedAt}</span>
  </div>
</div>