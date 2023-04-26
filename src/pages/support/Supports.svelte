<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import { router } from 'tinro'

  const goAnnouncements = () => router.goto('/support/announcements')

  const goFaqs = () => router.goto('/support/faq')

  const goQnas = () => router.goto('/support/qna')

</script>

<AuthHeader />
<main class="container-fluid supports-main">
  <div class="supports-header">
    <h2>고객센터</h2>
    <span>도움이 필요하신가요? 성심껏 도와드리겠습니다.</span>
    <br>
    <span>고객센터 운영 시간 : 평일 오전 9시~오전 12시, 오후 1시~6시</span>
  </div>

  <div class="p-5 mb-4 bg-body-tertiary border rounded-3">
    <div class="container-fluid py-3 announcement">
      <h1>공지사항</h1>
      <p>새로운 소식, 이벤트, 업데이트와 같은 공지사항을 모아두었습니다.</p>
      <button class="btn btn-search btn-lg" on:click={goAnnouncements}>확인하기</button>
    </div>
  </div>

  <div class="row align-items-md-stretch" style="margin-bottom: 39px;">
    <div class="col-md-6">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3">
        <h2>자주 묻는 질문</h2>
        <p>여러분이 자주 질문해주시는 내용들을 모아두었습니다.</p>
        <button class="btn btn-search" on:click={goFaqs}>확인하기</button>
      </div>
    </div>
    <div class="col-md-6">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3">
        <h2>질문 / 답변</h2>
        <p>도움이 필요하신 내용에 대해 질문해주시면 도움을 드리겠습니다.</p>
        <button class="btn btn-search" on:click={goQnas}>확인하기</button>
      </div>
    </div>
  </div>

  <Footer />
</main>