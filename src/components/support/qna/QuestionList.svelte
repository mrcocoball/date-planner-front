<script>
  import { onMount, onDestroy } from 'svelte'
  import { qnas, qnaDetail, currentQnaPaginationBar, currentQnasPage, requestPath } from '../../../store/qnas/qnaStore'
  import Question from './Question.svelte';
  import QuestionDetail from './QuestionDetail.svelte';
  import QuestionAddForm from './QuestionAddForm.svelte';

  let addMode = false;
  let detailMode = false;

  onMount(() => {
    qnas.resetQnas()
    qnas.fetchQnas()
  })

  const setPage = async (pageNum) => {
    try {
      await qnas.fetchQnasByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (id) => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    detailMode = true
    goQnaDetail(id)
  }

  // 하위 컴포넌트인 FaqCategoryDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    qnaDetail.resetQna()
  }

  const goQnaDetail = async (id) => {
    try {
      await qnaDetail.getQna(id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onAddQuestionMode = () => {
    addMode = true
  }

  onDestroy(() => {
    requestPath.set('')
    qnas.resetQnas()
    qnaDetail.resetQna()
    currentQnaPaginationBar.resetPaginationBar()
    currentQnasPage.resetPage()
  })

</script>

{#if detailMode}
<div class="qna-detail">
  {#if $qnaDetail}
    <QuestionDetail {qnaDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
{#if !addMode}
<div class="qna-list-header">
  <h2>질문과 답변</h2>
  <span>궁금하신 내용에 대해 언제든지 질문해주세요!</span>
</div>
<div class="detail-top-button">
  <button class="btn btn-create" on:click={onAddQuestionMode}>질문 작성</button>
</div>
{:else}
<div class="qna-list-header">
  <h2>질문 작성</h2>
  <span>내용을 작성해주시면 최대한 빠르게 답변해드리겠습니다!</span>
</div>
<div class="question-add-form">
  <QuestionAddForm bind:addMode={addMode}/>
</div>
{/if}

{#if !addMode}
<div class="qna-list">
  {#each $qnas.data.content as qna, index}
  <ul class="list-group">
    <li class="list-group-item qna-thumb-item" on:click={() => onDetailMode(qna.id)}>
      <Question {qna} {index} />
    </li>
  </ul>
  {/each}
</div>

<nav id="pagination" aria-label="Page navigation">
  <div class="qna-pagination">
    <ul class="pagination justify-content-center">
      {#each $currentQnaPaginationBar as pageButton}
        <li class={pageButton === $currentQnasPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
{/if}
{/if}