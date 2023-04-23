<script>
  export let announcement
  export let index
</script>

<div class="announcement_thumb">
  <span>{index+1}</span>
  <span>{announcement.categoryName}</span>
  <span>{announcement.title}</span>
  <span>{announcement.createdAt}</span>
</div>