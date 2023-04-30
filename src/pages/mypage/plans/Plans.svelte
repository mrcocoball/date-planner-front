<script>
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import PlanList from "../../../components/mypage/plans/PlanList.svelte";
  import Footer from "../../../components/Footer.svelte";

  let active = 'plan'

</script>

<AuthHeader {active} />
<main class="container-fluid plan-main">
  <PlanList />
</main>
<Footer />