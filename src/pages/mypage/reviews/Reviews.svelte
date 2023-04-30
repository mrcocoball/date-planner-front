<script>
  import Footer from "../../../components/Footer.svelte";
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import ReviewList from "../../../components/mypage/reviews/ReviewList.svelte";

  let active = 'mypage'
</script>

<AuthHeader {active} />
<main class="container-fluid review-main">
  <ReviewList />
</main>
<Footer />