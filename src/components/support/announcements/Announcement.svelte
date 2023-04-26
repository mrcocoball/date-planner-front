<script>
  import { afterUpdate } from 'svelte'
  export let announcement
  export let index

  let category = ''

  afterUpdate(() => {
    if (announcement.categoryName == '일반') {
      category = 'ct-acb1'
    } else if (announcement.categoryName == '이벤트') {
      category = 'ct-acb2'
    } else if (announcement.categoryName == '업데이트') {
      category = 'ct-acb3'
    } else {
      category = 'ct-acb4'
    }
  })
</script>

<div class="announcement-thumb">
  <div class="announcement-default">
    <span class={category}>{announcement.categoryName}</span>
    <h6>{announcement.title}</h6>
  </div>
  <div class="announcement-sub">
    <span>작성일자</span>
    <br>
    <span>{announcement.createdAt}</span>
  </div>
</div>