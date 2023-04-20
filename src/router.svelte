<script>
  import { Route } from 'tinro'
  import { isLogin } from './store/auth/authStore';

  // 로그인, 회원가입
  import Login from './pages/auth/Login.svelte';
  import Join from './pages/auth/Join.svelte';

  // 장소 관련
  import Places from './pages/places/Places.svelte';
  import Recommendation from './pages/places/Recommendation.svelte';

  // 마이 페이지 관련
  import MyPages from './pages/mypage/MyPages.svelte';
  import Reviews from './pages/mypage/reviews/Reviews.svelte';
  import Bookmarks from './pages/mypage/bookmarks/Bookmarks.svelte';
  import Plans from './pages/mypage/plans/Plans.svelte';

  // 고객센터 관련
  import Supports from './pages/support/Supports.svelte';
  import Announcements from './pages/support/Announcements.svelte';
  import FaQs from './pages/support/FAQs.svelte';
  import QnAs from './pages/support/QNAs.svelte';

  // 에러 페이지 관련
  import NotFound from './pages/NotFound.svelte';
  
</script>

<!--추후 메인 페이지 컴포넌트 제작 시 연결-->
<!--
<Route path="/" redirect="/places"></Route>
-->

{#if !$isLogin}
  <Route path="/login"><Login /></Route>
  <Route path="/join"><Join /></Route>
{:else}
  <Route path="/login"><NotFound /></Route>
  <Route path="/join"><NotFound /></Route>
{/if}

<Route path="/"><Places /></Route>
<Route path="/recommendation"><Recommendation /></Route>

{#if $isLogin}
  <Route path="/mypage"><MyPages /></Route>
  <Route path="/mypage/reviews/"><Reviews /></Route>
  <Route path="/mypage/bookmarks/"><Bookmarks /></Route>
  <Route path="/mypage/plans/"><Plans /></Route>
{:else}
  <Route path="/mypage"><Login /></Route>
  <Route path="/mypage/reviews/"><Login /></Route>
  <Route path="/mypage/bookmarks/"><Login /></Route>
  <Route path="/mypage/plans/"><Login /></Route>
{/if}

<Route path="/support"><Supports /></Route>
<Route path="/support/annoucements"><Announcements /></Route>
<Route path="/support/faq"><FaQs /></Route>
<Route path="/support/qna"><QnAs /></Route>

<Route fallback><NotFound /></Route>