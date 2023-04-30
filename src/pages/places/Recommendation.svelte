<script>
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import PlaceRecommendationList from "../../components/places/PlaceRecommendationList.svelte";
  import Footer from "../../components/Footer.svelte";

  let active = 'place'

</script>

<AuthHeader {active} />
<main class="container-fluid place-recommendation-main">
  <PlaceRecommendationList />
</main>
<Footer />