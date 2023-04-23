<script>
  export let bookmark
  export let index
</script>

<div class="bookmark_thumb">
  <span>{index+1}</span>
  <span>{bookmark.placeName}</span>
  <span>{bookmark.addressName}</span>
  <span>{bookmark.createdAt}</span>
</div>