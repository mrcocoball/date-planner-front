<script>
  import { afterUpdate, createEventDispatcher, onDestroy } from 'svelte'
  import { faqDetail } from '../../../store/faqs/faqStore'
  import FaqAnswer from './FaqAnswer.svelte';
  export let faqDetailId
  export let detailMode

  let categoryText = ''

  afterUpdate(() => {
    if ($faqDetail.data.id == '1') {
      categoryText = '장소 정보와 관련된 질문과 답변입니다.'
    }
    else if ($faqDetail.data.id == '2') {
      categoryText = '계정 관련 질문과 답변입니다.'
    }
    else if ($faqDetail.data.id == '3') {
      categoryText = '이벤트 관련 질문과 답변입니다.'
    }
    else if ($faqDetail.data.id == '4') {
      categoryText = '서비스 관련 오류에 대한 질문과 답변입니다.'
    }
    else if ($faqDetail.data.id == '5') {
      categoryText = '기타 문의입니다.'
    }
    else {
      categoryText = ''
    }
  })

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

<div class="detail-top-button">
  <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
</div>

<div class="faq-answer-header">
  <h2>{$faqDetail.data.categoryName}</h2>
  <span>{categoryText}</span>
  <br>
  <span>'펼치기'를 통해 질문에 대한 답변을 확인할 수 있습니다.</span>
</div>

<div class="faq-answer-list">
{#each $faqDetail.data.favoriteAnswers as favoriteAnswer, index}
  <ul class="list-group">
    <li class="list-group-item faq-answer-thumb-item">
      <FaqAnswer {favoriteAnswer} {index} />
    </li>
  </ul>
{/each}
</div>