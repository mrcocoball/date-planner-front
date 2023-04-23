<script>
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'

  const goPlans = () => router.goto('/mypage/plans')

  const goReviews = () => router.goto('/mypage/reviews')

  const goBookmarks = () => router.goto('/mypage/bookmarks')

</script>

<AuthHeader />
<main class="mypages_main">
  <div class="profile">
    <h4>프로필</h4>
    <p>ID : {$auth.email}</p>
  </div>

  <div class="plans">
    <h4>작성한 플랜들</h4>
    <p>여러분이 작성한 플랜을 모아봤습니다.</p>
    <button class="btn btn-search" on:click={goPlans}>확인하기</button>
  </div>

  <div class="bookmarks">
    <h4>북마크한 장소들</h4>
    <p>여러분이 저장한 장소들을 한 번 볼까요?</p>
    <button class="btn btn-search" on:click={goBookmarks}>확인하기</button>
  </div>

  <div class="reviews">
    <h4>작성한 리뷰들</h4>
    <p>여러분의 리뷰가 다른 분들에게 도움이 됩니다.</p>
    <button class="btn btn-search" on:click={goReviews}>확인하기</button>
  </div>

</main>