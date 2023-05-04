<script>
  import { router } from 'tinro'

  const goMain = () => {
    router.goto('/')
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
  }
</script>

<main class="container-fluid auth-main">
  <div class="text-center">
    <img src="/images/error-background.png" style="margin-bottom: 20px;">
    <h1 class="h3 mb-3 fw-normal">오류가 발생하였습니다.</h1>
    <button class="w-100 btn btn-cancel" style="margin-top: 20px;" on:click={goMain}>처음 화면으로 이동</button>
  </div>
</main>