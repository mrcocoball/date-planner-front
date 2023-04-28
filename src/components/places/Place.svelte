<script>
  import { afterUpdate } from 'svelte'
  export let place
  export let index

  let reviewScoreStar = ''

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

  })

</script>

<div class="place-thumb">
  <div class="place-default">
    <span class={'ct-'+place.category_group_id}>{place.category_name}</span>
    <h5>{place.place_name}</h5>
    <span>{place.address_name}</span>
    <br>
    <span class="tag">
      {#if place.description}
      {place.description}
      {/if}
    </span>
  </div>
  <div class="place-sub">
    <span>평점 : {place.avg_review_score}</span>
    <br>
    <span class="review-score">{reviewScoreStar}</span>
    <br>
    <span class="distance">{place.distance}m</span>
  </div>
</div>