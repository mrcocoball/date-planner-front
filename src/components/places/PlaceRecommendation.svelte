<script>
  import { afterUpdate } from 'svelte'
  export let place
  export let index

  let reviewScoreStar = ''
  let category = ''

  afterUpdate(() => {
    if (place.avg_review_score < 1) {
      reviewScoreStar = `☆☆☆☆☆`
    } else if (place.avg_review_score >= 1 && place.avg_review_score < 2) {
      reviewScoreStar = `★☆☆☆☆`
    } else if (place.avg_review_score >= 2 && place.avg_review_score < 3) {
      reviewScoreStar = `★★☆☆☆`
    } else if (place.avg_review_score >= 3 && place.avg_review_score < 4) {
      reviewScoreStar = `★★★☆☆`
    } else if (place.avg_review_score >= 4 && place.avg_review_score < 5) {
      reviewScoreStar = `★★★★☆`
    } else {
      reviewScoreStar = `★★★★★`
    }

    if (place.category_name == '관광명소') {
      category = 'ct-cb1'
    } else if (place.category_name == '카페') {
      category = 'ct-cb2'
    } else if (place.category_name == '문화시설') {
      category = 'ct-cb3'
    } else if (place.category_name == '음식점') {
      category = 'ct-cb4'
    } else {
      category = 'ct-cb5'
    }
  })

</script>

<div class="place-thumb">
  <div class="place-default">
    <span class={category}>{place.category_name}</span>
    <h5>{place.place_name}</h5>
    <span>{place.address_name}</span>
  </div>
  <div class="place-sub">
    <span>평점 : {place.avg_review_score}</span>
    <br>
    <span class="review-score">{reviewScoreStar}</span>
  </div>
</div>