<script>
  import Footer from "../components/Footer.svelte";
  import AuthHeader from "../components/auth/AuthHeader.svelte";
  import { auth, isLogin } from '../store/auth/authStore'
  import { router } from 'tinro'

  let active = ''

  const goPlaces = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/places')
  } 
  const goPlans = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/mypage/plans')
  } 
  const goLogin = () => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    router.goto('/login')
  }

</script>

<AuthHeader {active} />
<main class="container-fluid main-box">
  <div class="main-index-header">
    <h1>오늘 어디에서 만날까?</h1>
    <h1>오늘 뭐할까?</h1>
    <h1>어떻게 할 지 막막하시죠?</h1>
  </div>
  <div class="main-index-sub">
    <h6>여러분이 생각하고 있는 여행지, 처음 가보는 장소</h6>
    <h6>관광 명소는 어딜지, 맛집은 어딜지 알아봐야 할 것도 많은데</h6>
    <h6>가봐야 할 장소는 어디에 저장해야 할 지 모르겠고</h6>
    <h6>여러모로 고민이 많으셨죠?</h6>
    <br>
    <h5>이젠 걱정하지 않으셔도 됩니다.</h5>
    <br>
    <h5><b>주소, 카테고리로 쉽게 장소를 검색하고</b></h5>
    <h5><b>마음에 드는 장소는 북마크로 저장하고</b></h5>
    <h5><b>목적지를 정해 플랜을 짜고 리뷰를 남겨보세요!</b></h5>
  </div>
  
  <div class="main-image"></div>
  <div class="row align-items-md-stretch index_body">
    <div class="col-md-6" style="margin-bottom: 20px;">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3 main-place-box">
        <h2>장소 검색</h2>
        <br>
        <span>주소와 원하는 카테고리를 선택해</span>
        <br>
        <span>장소를 찾고 북마크할 수 있습니다.</span>
        <br>
        <span>또한 리뷰를 작성할 수도 있습니다.</span>
        <br>
        <br>
        <a class="btn btn-search" href="" on:click={goPlaces}>장소 검색하기</a>
      </div>
    </div>
    <div class="col-md-6" style="margin-bottom: 20px;">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3 main-plan-box">
        <h2>플랜 짜기</h2>
        <br>
        <span>여러분만의 일정 플랜을 짜보세요.</span>
        <br>
        <span>검색한 장소나 북마크한 장소로</span>
        <br>
        <span>목적지를 체크하여 플랜을 만들 수 있습니다.</span>
        <br>
        <br>
        <a class="btn btn-search" href="" on:click={goPlans}>플랜 짜기</a>
      </div>
    </div>
  </div>

  {#if !$isLogin}
  <div class="p-5 text-center bg-body-tertiary border rounded-3">
    <h2 class="text-body-emphasis">회원가입 / 로그인</h2>
    <p>북마크, 플랜, 리뷰 기능을 위해선 회원가입 및 로그인이 필요합니다.</p>
    <div class="d-inline-flex">
      <button class="btn btn-create" type="button" on:click={goLogin}>로그인하기</button>
    </div>
  </div>
  {/if}
</main>
<Footer />  