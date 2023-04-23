<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { faqDetail } from '../../../store/faqs/faqStore'
  import FaqAnswer from './FaqAnswer.svelte';
  export let faqDetailId
  export let detailMode

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  onDestroy(() => {
    dispatch('detail-off')
    faqDetail.resetFaq()
  })

</script>

<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
</div>

<div class="faq_answer">
  <h4>{$faqDetail.data.categoryName}</h4>
</div>

<div class="faq_answer_list">
{#each $faqDetail.data.favoriteAnswers as favoriteAnswer, index}
  <FaqAnswer {favoriteAnswer} {index} />
{/each}
</div>