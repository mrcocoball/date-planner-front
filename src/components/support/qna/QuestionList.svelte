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

  const onAddPlanMode = () => {
    addMode = true
  }

  const offAddPlanMode = () => {
    addMode = false
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
<div class="qna_detail">
  {#if $qnaDetail}
    <QuestionDetail {qnaDetail} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}

{#if !addMode}
<div>
  <button class="btn btn-create" on:click={onAddPlanMode}>질문 작성</button>
</div>
{:else}
<div>
  <button class="btn btn-create" on:click={offAddPlanMode}>작성 취소</button>
  <QuestionAddForm bind:addMode={addMode}/>
</div>
{/if}

{#if !addMode}
<div class="qna_list">
  <ul>
    {#each $qnas.data.content as qna, index}
      <li on:click={() => onDetailMode(qna.id)}>
        <Question {qna} {index} />
      </li>
    {/each}
  </ul>
</div>

<div class="qna_pagination">
  <ul>
    {#each $currentQnaPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentQnasPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}
{/if}