<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import PlaceList from "../../components/places/PlaceList.svelte";

  let placeSearchMode = false
  let active = 'place'

</script>

<AuthHeader {active} />
<main class="container-fluid place-main">
  <PlaceList {placeSearchMode} />
</main>
<Footer />