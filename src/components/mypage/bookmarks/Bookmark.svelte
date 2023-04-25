<script>
  import { afterUpdate } from 'svelte'
  export let bookmark
  export let index

  let category = ''
  let categoryName = ''

  afterUpdate(() => {
    if (bookmark.categoryCode == 'AT4') {
      category = 'ct-cb1'
      categoryName = '관광명소'
    } else if (bookmark.categoryCode == 'CE7') {
      category = 'ct-cb2'
      categoryName = '카페'
    } else if (bookmark.categoryCode == 'CT1') {
      category = 'ct-cb3'
      categoryName = '문화시설'
    } else if (bookmark.categoryCode == 'FD6') {
      category = 'ct-cb4'
      categoryName = '음식점'
    } else {
      category = 'ct-cb5'
      categoryName = '지하철'
    }
  })
</script>

<div class="bookmark-thumb">
  <div class="bookmark-default">
    <span class={category}>{categoryName}</span>
    <h5>{bookmark.placeName}</h5>
    <span>{bookmark.addressName}</span>
  </div>
  <div class="bookmark-sub">
    <span>북마크한 날짜 : {bookmark.createdAt}</span>
  </div>
</div>