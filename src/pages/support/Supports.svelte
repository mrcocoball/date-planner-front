<script>
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import { router } from 'tinro'

  const goAnnouncements = () => router.goto('/support/announcements')

  const goFaqs = () => router.goto('/support/faq')

  const goQnas = () => router.goto('/support/qna')

</script>

<AuthHeader />
<main class="supports_main">
  <div class="supports">
    <h2>고객센터</h2>
    <p>도움이 필요하신가요? 성심껏 도와드리겠습니다.</p>
  </div>

  <div class="announcements">
    <h4>공지사항</h4>
    <p>새로운 소식, 이벤트, 업데이트와 같은 공지사항을 모아두었습니다.</p>
    <button class="btn btn-search" on:click={goAnnouncements}>확인하기</button>
  </div>

  <div class="faqs">
    <h4>FAQ</h4>
    <p>여러분이 자주 질문해주시는 내용들을 모아두었습니다.</p>
    <button class="btn btn-search" on:click={goFaqs}>확인하기</button>
  </div>

  <div class="qnas">
    <h4>Q&A</h4>
    <p>도움이 필요하신 내용에 대해 질문해주시면 도움을 드리겠습니다. (로그인 필요)</p>
    <button class="btn btn-search" on:click={goQnas}>확인하기</button>
  </div>

</main>