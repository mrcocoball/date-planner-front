<script>
  import {} from '../../../store/faqs/faqStore'
  export let favoriteAnswer
  export let index

  let answerMode = false

  const answerModeToggle = () => {
    answerMode = !answerMode
  }

</script>

<div>
  <span>{favoriteAnswer.title}</span>
  <button class="btn btn-cancel" on:click={answerModeToggle}>펼치기</button>
</div>

{#if answerMode}
<div>
  <pre>{favoriteAnswer.description}</pre>
</div>
{/if}