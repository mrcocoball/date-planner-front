<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import FaqCategoryList from "../../components/support/faq/FaqCategoryList.svelte";
</script>

<AuthHeader />
<main class="container-fluid faq-main">
  <FaqCategoryList />
  <Footer />
</main>