  <script>
    import { router } from 'tinro'

    const goSupport = () => {
      let element = document.getElementById("main_nav")
      element.scrollIntoView();
      router.goto('/support')
    }
    const sendEmail = () => alert('준비 중입니다')
    const goHomepage = () => alert('준비 중입니다')
  </script>
  
  <footer class="main-footer">
    <ul class="nav justify-content-center border-bottom">
    </ul>
    <div class="text-center footer-div-1">
      <span on:click={goSupport}>고객센터</span>
      <span>|</span>
      <span on:click={sendEmail}>이메일 문의</span>
      <span>|</span>
      <span on:click={goHomepage}>공식 홈페이지</span>
    </div>
    <div class="text-center footer-div-2">
      <span class="text-center">&copy; 2023 Cocoball Factory</span>
    </div>
  </footer>