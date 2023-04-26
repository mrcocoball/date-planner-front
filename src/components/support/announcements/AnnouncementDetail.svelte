<script>
  import { afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
  export let announcementDetail
  export let detailMode

  let category = ''

  afterUpdate(() => {
    if ($announcementDetail.data.categoryName == '일반') {
      category = 'ct-acb1'
    } else if ($announcementDetail.data.categoryName == '이벤트') {
      category = 'ct-acb2'
    } else if ($announcementDetail.data.categoryName == '업데이트') {
      category = 'ct-acb3'
    } else {
      category = 'ct-acb4'
    }
  })

  const dispatch = createEventDispatcher()

  const offDetailMode = () => {
    detailMode = false
    dispatch('detail-off')
  }

  onDestroy(() => {
    dispatch('detail-off')
  })

</script>

<div class="detail-top-button">
  <button class="btn-close" on:click={offDetailMode} aria-label="Close"></button>
</div>

<div class="common-form">
  <div class="announcement-detail-header">
    <span class={category}>{$announcementDetail.data.categoryName}</span>
    <h2>{$announcementDetail.data.title}</h2>
    <span>{$announcementDetail.data.createdAt}</span>
  </div>
  <div class="announcement-form">
    <pre class="announcement-description">{$announcementDetail.data.description}</pre>
  </div>
</div>