<script>
  import {} from '../../../store/faqs/faqStore'
  export let favoriteAnswer
  export let index

  let answerMode = false

  const answerModeToggle = () => {
    answerMode = !answerMode
  }

</script>

<div class="faq-answer-thumb">
  <div class="faq-answer-default">
    <h5>{favoriteAnswer.title}</h5>
  </div>
  <div class="faq-answer-sub">
    {#if answerMode}
    <button class="btn btn-cancel" on:click={answerModeToggle}>접기</button>
    {:else}
    <button class="btn btn-search" on:click={answerModeToggle}>펼치기</button>
    {/if}
  </div>
</div>

{#if answerMode}
<div>
  <pre class="faq-answer-description">{favoriteAnswer.description}</pre>
</div>
{/if}