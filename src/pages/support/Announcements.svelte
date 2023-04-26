<script>
  import Footer from "../../components/Footer.svelte";
  import AuthHeader from "../../components/auth/AuthHeader.svelte";
  import AnnouncementList from "../../components/support/announcements/AnnouncementList.svelte";
</script>

<AuthHeader />
<main class="container-fluid announcements-main">
  <AnnouncementList />
  <Footer />
</main>