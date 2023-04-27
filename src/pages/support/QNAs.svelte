<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import QuestionList from "../../components/support/qna/QuestionList.svelte";
</script>

<AuthHeader />
<main class="container-fluid qna-main">
  <QuestionList />
  <Footer />
</main>