<script>
  import { router } from 'tinro'
  import { auth, isLogin } from "../../store/auth/authStore"

  export let active

  const goLogin = () => router.goto('/login')
  const onLogout = () => auth.logout()

  const goMain = () => router.goto('/')

  const goPlace = () => router.goto('/places')
  const goRecommendation = () => router.goto('/recommendation')

  const goPlan = () => router.goto('/mypage/plans')
  const goMyPage = () => router.goto('/mypage')
  const goBookmark = () => router.goto('/mypage/bookmarks')
  const goReivew = () => router.goto('/mypage/reviews')

  const goSupport = () => router.goto('/support')
  const goAnnouncement = () => router.goto('/support/announcements')
  const goFaq = () => router.goto('/support/faq')
  const goQna = () => router.goto('/support/qna')

</script>

<nav id="main_nav" class="navbar navbar-expand-lg navbar-dark" aria-label="Eighth navbar example">
  <div class="container main-header">
    <a class="navbar-brand" href="" on:click={goMain}>Pla&Plan</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample07">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class={active == 'place' ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"} href="" data-bs-toggle="dropdown" aria-expanded="false">장소 검색</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="" on:click={goPlace}>장소 검색</a></li>
            <li><a class="dropdown-item" href="" on:click={goRecommendation}>추천 장소 검색</a></li>
          </ul>
        </li>
        {#if $isLogin}
          <li class="nav-item dropdown">
            <a class={active == 'plan' ? "nav-link active" : "nav-link"} href="" on:click={goPlan}>플랜</a>
          </li>
          <li class="nav-item dropdown">
            <a class={active == 'mypage' ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"} href="" data-bs-toggle="dropdown" aria-expanded="false">마이 페이지</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="" on:click={goMyPage}>내 프로필</a></li>
              <li><a class="dropdown-item" href="" on:click={goPlan}>내 플랜</a></li>
              <li><a class="dropdown-item" href="" on:click={goBookmark}>북마크한 장소</a></li>
              <li><a class="dropdown-item" href="" on:click={goReivew}>내 리뷰</a></li>
            </ul>
          </li>
        {/if}
        <li class="nav-item dropdown">
          <a class={active == 'support' ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"} href="" data-bs-toggle="dropdown" aria-expanded="false">고객센터</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="" on:click={goSupport}>고객센터</a></li>
            <li><a class="dropdown-item" href="" on:click={goAnnouncement}>공지사항</a></li>
            <li><a class="dropdown-item" href="" on:click={goFaq}>FAQ</a></li>
            <li><a class="dropdown-item" href="" on:click={goQna}>Q&A</a></li>
          </ul>
        </li>
      </ul>

      <div class="text-end">
        {#if $isLogin}
          <button type="button" class="btn btn-logout me-2" on:click={onLogout}>로그아웃</button>
        {:else}
          <button type="button" class="btn btn-outline-light me-2" on:click={goLogin}>로그인</button>
        {/if}
      </div>
    </div>
  </div>
</nav>