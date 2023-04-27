<script>
  import { afterUpdate } from 'svelte'
  export let qna
  export let index

  let category = ''

  afterUpdate(() => {
    if (qna.categoryId == 1) {
      category = 'ct-qcb1'
    } else if (qna.categoryId == 2) {
      category = 'ct-qcb2'
    } else if (qna.categoryId == 3) {
      category = 'ct-qcb3'
    } else if (qna.categoryId == 4) {
      category = 'ct-qcb4'
    } else {
      category = 'ct-qcb5'
    }
  })
</script>

<div class="qna-thumb">
  <div class="qna-default">
    <span class={category}>{qna.categoryName}</span>
    <h5>{qna.title}</h5>
  </div>
  <div class="qna-sub">
    {#if qna.answers.length != 0}
    <span class="qna-answered">답변 / 추가 질문</span>
    {/if}
    <br>
    <span class="qna-date">작성일자 : {qna.createdAt}</span>
  </div>
</div>