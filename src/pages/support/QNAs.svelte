<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import QuestionList from "../../components/support/qna/QuestionList.svelte";

  let active = 'support'
</script>

<AuthHeader {active} />
<main class="container-fluid qna-main">
  <QuestionList />
</main>
<Footer />