<script>
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import PlaceRecommendationList from "../../components/places/PlaceRecommendationList.svelte";
  import Footer from "../../components/Footer.svelte";

</script>

<AuthHeader />
<main class="container-fluid place-recommendation-main">
  <PlaceRecommendationList />
  <Footer />
</main>