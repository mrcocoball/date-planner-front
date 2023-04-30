<script>
  import Footer from "../../../components/Footer.svelte";
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import BookmarkList from "../../../components/mypage/bookmarks/BookmarkList.svelte";

  let active = 'mypage'
  let bookmarkSearchMode = false
  
</script>

<AuthHeader {active} />
<main class="container-fluid bookmark-main">
  <BookmarkList {bookmarkSearchMode} />
</main>
<Footer />