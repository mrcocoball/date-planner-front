<script>
  import { onDestroy, createEventDispatcher } from 'svelte'
  export let announcementDetail
  export let detailMode

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  onDestroy(() => {
    dispatch('detail-off')
  })

</script>

<div>
  <button class="btn btn-cancel" on:click={offDetailMode}>창 숨기기</button>
</div>

<div class="col-md-7 col-lg-8 common_form">
  <ul class="list-group mb-3">
    <h2>{$announcementDetail.data.title}</h2>
    <li class="list-group-item">
      <div>
        <h6>카테고리</h6>
        <p class="categoryName" id="categoryName">{$announcementDetail.data.categoryName}</p>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>본문</h6>
        <pre class="description" id="description">{$announcementDetail.data.description}</pre>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h6>작성일자</h6>
        <p class="avgReviewScore" id="avgReviewScore">{$announcementDetail.data.createdAt}</p>
      </div>
    </li>
  </ul>
</div>