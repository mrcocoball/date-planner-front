<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'

  let active = 'mypage'
  let clientKey = import.meta.env.VITE_KAKAO_CLIENT_KEY
  let redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URL2

  const goPlans = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/mypage/plans')
  } 

  const goReviews = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/mypage/reviews')
  } 

  const goBookmarks = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/mypage/bookmarks')
  } 

  const goWithdrawCommon = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/withdraw')
  }

  const goWithdrawSocial = () => {
    let url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}`
    location.href = url
  }

</script>

<AuthHeader {active} />
<main class="container-fluid mypages-main">
  <div class="mypages-header">
    <h2>마이 페이지</h2>
    <p>프로필, 플랜, 북마크, 리뷰를 모아둔 페이지입니다.</p>
  </div>
  <div class="row mb-2">
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">Profile</strong>
          <h3 class="mb-0">프로필</h3>
          <br>
          <p class="card-text mb-auto">ID : {$auth.email}</p>
          {#if $auth.social}
          <button class="btn btn-search" on:click={goWithdrawSocial}>탈퇴하기</button>
          {:else}
          <button class="btn btn-search" on:click={goWithdrawCommon}>탈퇴하기</button>
          {/if}
        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img profile-img" width="200" height="250">
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">Plans</strong>
          <h3 class="mb-0">작성한 플랜들</h3>
          <br>
          <p class="mb-auto">여러분이 작성한 플랜을 모아봤습니다.</p>
          <button class="btn btn-search" on:click={goPlans}>확인하기</button>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img plan-img" width="200" height="250">
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">Bookmarks</strong>
          <h3 class="mb-0">북마크한 장소들</h3>
          <br>
          <p class="mb-auto">여러분이 저장한 장소들을 한 번 볼까요?</p>
          <button class="btn btn-search" on:click={goBookmarks}>확인하기</button>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img bookmark-img" width="200" height="250">
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary">Reviews</strong>
          <h3 class="mb-0">작성한 리뷰들</h3>
          <br>
          <p class="mb-auto">여러분의 리뷰가 다른 분들에게 도움이 됩니다.</p>
          <button class="btn btn-search" on:click={goReviews}>확인하기</button>
        </div>
        <div class="col-auto d-none d-lg-block">
          <img class="bd-placeholder-img review-img" width="200" height="250">
        </div>
      </div>
    </div>
  </div>
</main>
<Footer />