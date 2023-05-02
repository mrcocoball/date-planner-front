<script>
  import { afterUpdate } from 'svelte'
  export let faq
  export let index

  let categoryText = ''

  afterUpdate(() => {
    if (faq.id == 1) {
      categoryText = '장소 정보와 관련된 질문과 답변입니다.'
    }
    else if (faq.id == 2) {
      categoryText = '계정 관련 질문과 답변입니다.'
    }
    else if (faq.id == 3) {
      categoryText = '이벤트 관련 질문과 답변입니다.'
    }
    else if (faq.id == 4) {
      categoryText = '서비스 관련 오류에 대한 질문과 답변입니다.'
    }
    else if (faq.id == 5) {
      categoryText = '기타 문의입니다.'
    }
    else {
      categoryText = ''
    }
  })
</script>

<div class="faq-category-thumb">
  <h5>{faq.categoryName}</h5>
  <span>{categoryText}</span>
</div>