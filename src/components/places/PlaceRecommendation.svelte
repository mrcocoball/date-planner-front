<script>
  export let place
  export let index

</script>

<div class="place_recommendation_thumb">
  <span>{index+1}</span>
  <span>{place.category_name}</span>
  <span>{place.place_name}</span>
  <span>{place.address_name}</span>
  <span>{place.avg_review_score}</span>
</div>