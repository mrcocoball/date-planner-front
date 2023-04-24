<script>
  import AuthHeader from "../components/auth/AuthHeader.svelte";
  import { router } from 'tinro'

  const goPlaces = () => router.goto('/places')
  const goPlans = () => router.goto('/mypage/plans')

</script>

<AuthHeader />
<main class="container-fluid index_main">
  <div class="index_header">
    <h1>오늘 어디에서 만날까?</h1>
    <h1>이 이야기만 들으면 막막하시다구요?</h1>
      <div class="col-lg-6">
        <span>본문1</span>
        <br>
        <span>본문2</span>
        <br>
        <span>본문3</span>
        <br>
        <br>
        <span><b>가볼만한 장소를 찾고 플랜을 짜고 리뷰를 남겨보세요!</b></span>
      </div>
  </div>

  <div class="row align-items-md-stretch index_body">
    <div class="col-md-6" style="margin-bottom: 20px;">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3">
        <h2>장소 검색</h2>
        <br>
        <span>주소와 원하는 장소 카테고리를 선택해</span>
        <br>
        <span>장소를 검색할 수 있습니다.</span>
        <br>
        <span>검색한 장소를 북마크하거나, 리뷰를 작성할 수 있습니다.</span>
        <br>
        <br>
        <a class="btn btn-search" href="" on:click={goPlaces}>장소 검색하기</a>
      </div>
    </div>
    <div class="col-md-6" style="margin-bottom: 20px;">
      <div class="h-100 p-5 bg-body-tertiary border rounded-3">
        <h2>플랜 짜기</h2>
        <br>
        <span>여러분만의 일정 플랜을 짜보세요.</span>
        <br>
        <span>장소를 검색하거나 북마크한 장소를 토대로</span>
        <br>
        <span>목적지를 체크하여 플랜을 만들 수 있습니다.</span>
        <br>
        <br>
        <a class="btn btn-search" href="" on:click={goPlans}>플랜 짜기</a>
      </div>
    </div>
  </div>  
</main>