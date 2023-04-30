<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import FaqCategoryList from "../../components/support/faq/FaqCategoryList.svelte";

  let active = 'support'
</script>

<AuthHeader {active} />
<main class="container-fluid faq-main">
  <FaqCategoryList />
</main>
<Footer />