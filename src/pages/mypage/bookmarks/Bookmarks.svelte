<script>
  import AuthHeader from "../../../components/auth/AuthHeader.svelte";
  import BookmarkList from "../../../components/mypage/bookmarks/BookmarkList.svelte";

  let bookmarkSearchMode = false
  
</script>

<AuthHeader />
<main class="bookmark-main">
  <BookmarkList {bookmarkSearchMode} />
</main>