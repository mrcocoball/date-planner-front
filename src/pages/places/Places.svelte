<script>
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import PlaceList from "../../components/places/PlaceList.svelte";
  import PlaceMap from "../../components/places/PlaceMap.svelte";

</script>

<AuthHeader />
<main class="place-main">
  <PlaceList />
  <PlaceMap />
</main>