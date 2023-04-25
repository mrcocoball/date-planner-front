<script>
  import Footer from "../../../components/Footer.svelte";
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import BookmarkList from "../../../components/mypage/bookmarks/BookmarkList.svelte";

  let bookmarkSearchMode = false
  
</script>

<AuthHeader />
<main class="container-fluid bookmark-main">
  <BookmarkList {bookmarkSearchMode} />
  <Footer />
</main>