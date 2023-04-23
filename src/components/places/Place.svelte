<script>
  export let place
  export let index

</script>

<div class="place_thumb">
  <span>{index+1}</span>
  <span>{place.category_name}</span>
  <span>{place.place_name}</span>
  <span>{place.address_name}</span>
  <span>{place.avg_review_score}</span>
  <span>{place.distance}</span>
  <span>{place.description}</span>
</div>