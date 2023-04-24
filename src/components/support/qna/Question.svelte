<script>
  export let qna
  export let index
</script>

<div class="qna_thumb">
  <span>{index+1}</span>
  <span>{qna.categoryName}</span>
  <span>{qna.title}</span>
  <span>{qna.createdAt}</span>
</div>