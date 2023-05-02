<script>
  import { onMount, onDestroy } from 'svelte'
  import { faqs, faqDetail, currentFaqPaginationBar, currentFaqsPage, requestPath } from '../../../store/faqs/faqStore'
  import FaqCategory from './FaqCategory.svelte';
  import FaqCategoryDetail from './FaqCategoryDetail.svelte';

  let detailMode = false;

  onMount(() => {
    faqs.resetFaqs()
    faqs.fetchFaqs()
  })

  const setPage = async (pageNum) => {
    try {
      await faqs.fetchFaqsByPage($requestPath, pageNum)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onDetailMode = (id) => {
    let element = document.getElementById("main_nav")
    element.scrollIntoView();
    detailMode = true
    goFaqDetail(id)
  }

  // 하위 컴포넌트인 FaqCategoryDetail에서 이벤트 전달 받음
  const offDetailMode = (event) => {
    detailMode = false
    faqDetail.resetFaq()
  }

  const goFaqDetail = async (id) => {
    try {
      await faqDetail.getFaq(id)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  onDestroy(() => {
    requestPath.set('')
    faqs.resetFaqs()
    faqDetail.resetFaq()
    currentFaqPaginationBar.resetPaginationBar()
    currentFaqsPage.resetPage()
  })

</script>

{#if detailMode}
<div class="faq-detail">
  {#if $faqDetail}
    <FaqCategoryDetail bind:faqDetailId={$faqDetail.data.id} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="faq-list-form-header">
  <h2>자주 묻는 질문</h2>
  <span>여러분이 자주 질문해주시는 내용들을 모았습니다.</span>
  <br>
  <span>리스트에 없는 내용의 경우 Q&A를 통해 질문을 남겨주세요!</span>
</div>
<div class="faq-list">
  {#each $faqs.data.content as faq, index}
  <ul class="list-group">
    <li class="list-group-item faq-thumb-item" on:click={() => onDetailMode(faq.id)}>
      <FaqCategory {faq} {index} />
    </li>
  </ul>
  {/each}
</div>

<!--
<nav id="pagination" aria-label="Page navigation"></nav>
  <div class="faq-pagination">
    <ul class="pagination justify-content-center">
      {#each $currentFaqPaginationBar as pageButton}
        <li class={pageButton === $currentFaqsPage ? "page-item active" : "page-item"} aria-current="page">
          <a class="page-link" href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
-->
{/if}