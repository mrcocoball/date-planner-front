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
<div class="faq_detail">
  {#if $faqDetail}
    <FaqCategoryDetail bind:faqDetailId={$faqDetail.data.id} bind:detailMode={detailMode} on:detail-off={offDetailMode} />
  {/if}
</div>
{:else}
<div class="faq_list">
  <ul>
    {#each $faqs.data.content as faq, index}
      <li on:click={() => onDetailMode(faq.id)}>
        <FaqCategory {faq} {index} />
      </li>
    {/each}
  </ul>
</div>

<div class="faq_pagination">
  <ul>
    {#each $currentFaqPaginationBar as pageButton}
      <li>
        <a class={pageButton === $currentFaqsPage ? "btn-page-active" : "btn-page"} href="" on:click={() => setPage(pageButton)}>{pageButton+1}</a>
      </li>
    {/each}
  </ul>
</div>
{/if}