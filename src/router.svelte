<script>
  import { Route } from 'tinro'

  // 로그인, 회원가입
  import Login from './pages/auth/Login.svelte';
  import Join from './pages/auth/Join.svelte';

  // 장소 관련
  import Places from './pages/places/Places.svelte';
  import PlaceDetail from './pages/places/PlaceDetail.svelte';
  import Recommendation from './pages/places/Recommendation.svelte';

  // 마이 페이지 관련
  import MyPages from './pages/mypage/MyPages.svelte';
  import Reviews from './pages/mypage/reviews/Reviews.svelte';
  import Bookmarks from './pages/mypage/bookmarks/Bookmarks.svelte';
  import Plans from './pages/mypage/plans/Plans.svelte';
  import PlanDetail from './pages/mypage/plans/PlanDetail.svelte';

  // 고객센터 관련
  import Supports from './pages/support/Supports.svelte';
  import Announcements from './pages/support/Announcements.svelte';
  import AnnouncementDetail from './pages/support/AnnouncementDetail.svelte';
  import FaQs from './pages/support/FAQs.svelte';
  import FaqDetail from './pages/support/FAQDetail.svelte';
  import QnAs from './pages/support/QNAs.svelte';
  import QnaDetail from './pages/support/QNADetail.svelte';

  // 에러 페이지 관련
  import NotFound from './pages/NotFound.svelte';
  
</script>

<Route path="/" redirect="places" />

<Route path="/login"><Login /></Route>
<Route path="/join"><Join /></Route>

<Route path="/places"><Places /></Route>
<Route path="/places/*"><PlaceDetail /></Route>
<Route path="/recommendation"><Recommendation /></Route>

<Route path="/mypage"><MyPages /></Route>
<Route path="/mypage/reviews/*"><Reviews /></Route>
<Route path="/mypage/bookmarks/*"><Bookmarks /></Route>
<Route path="/mypage/plans"><Plans /></Route>
<Route path="/mypage/plans/*"><PlanDetail /></Route>

<Route path="/support"><Supports /></Route>
<Route path="/support/annoucements"><Announcements /></Route>
<Route path="/support/announcements/*"><AnnouncementDetail /></Route>
<Route path="/support/faq"><FaQs /></Route>
<Route path="/support/faq/*"><FaqDetail /></Route>
<Route path="/support/qna"><QnAs /></Route>
<Route path="/support/qna/*"><QnaDetail /></Route>

<Route fallback><NotFound /></Route>