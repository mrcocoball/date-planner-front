<script>
  import { router } from 'tinro'
  import { auth, isLogin } from "../../store/auth/authStore"

  const goLogin = () => router.goto('/login')
  const onLogout = () => auth.logout()

</script>

<nav id="main_nav" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
  <div class="container">
    <a class="navbar-brand" href="">Date Planner</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07"
            aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample07">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">장소 검색</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/recommendation">추천 장소 검색</a></li>
          </ul>
        </li>
        {#if $isLogin}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown" aria-expanded="false">플랜 짜기</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/mypage/plans">플랜 보기</a></li>
              <li><a class="dropdown-item">플랜 작성</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown" aria-expanded="false">마이 페이지</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/mypage">내 프로필</a></li>
              <li><a class="dropdown-item" href="/mypage/bookmarks">북마크한 장소</a></li>
              <li><a class="dropdown-item" href="/mypage/reivews">내 리뷰</a></li>
              <li><a class="dropdown-item" href="/mypage/plans">내 플랜</a></li>
            </ul>
          </li>
        {/if}
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown" aria-expanded="false">고객센터</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/support">고객센터</a></li>
            <li><a class="dropdown-item" href="/support/announcements">공지사항</a></li>
            <li><a class="dropdown-item" href="/support/faq">FAQ</a></li>
            <li><a class="dropdown-item" href="/support/qna">Q&A</a></li>
          </ul>
        </li>
      </ul>

      <div class="text-end">
        {#if $isLogin}
          <button type="button" class="btn btn-dark me-2" on:click={onLogout}>로그아웃</button>
        {:else}
          <button type="button" class="btn btn-outline-light me-2" on:click={goLogin}>로그인</button>
        {/if}
      </div>
    </div>
  </div>
</nav>