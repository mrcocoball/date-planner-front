<script>
  import { afterUpdate } from 'svelte'
  export let answer

  let admin = false

  afterUpdate(() => {
    if (answer.nickname == 'Admin' || answer.nickname == 'admin' || answer.nickname == '관리자') {
      admin = true
    }
  })
</script>

<div class="answer-thumb">
  <div class="answer-default">
    <span class={admin ? 'nickname-admin' : ''}><b>{answer.nickname}</b></span>
    <pre class="ans-description">{answer.description}</pre>
  </div>
</div>
<div class="detail-bottom-button">
  <span class="qna-date">{answer.createdAt}</span>
</div>