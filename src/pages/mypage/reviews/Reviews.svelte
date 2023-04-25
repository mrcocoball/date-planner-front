<script>
  import Footer from "../../../components/Footer.svelte";
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import ReviewList from "../../../components/mypage/reviews/ReviewList.svelte";
</script>

<AuthHeader />
<main class="container-fluid review-main">
  <ReviewList />
  <Footer />
</main>