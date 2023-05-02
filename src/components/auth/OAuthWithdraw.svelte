<script>
  import { onMount, afterUpdate } from 'svelte'
  import { router } from 'tinro'
  import { auth } from '../../store/auth/authStore'

  let values = {
    code: '',
    access_token: '',
  }

  let tokenChecked = false

  onMount(() => {
    const authCode = new URL(window.location.href).searchParams.get('code')
    values.code = authCode
    getAccessToken()
  })

  const getAccessToken = async () => {
    try {
      const result = await auth.getKakaoAccessTokenWithdraw(values.code)
      const access_token = result.access_token
      values.access_token = access_token
      tokenChecked = true
    }
    catch(error) {
      tokenChecked = true
    }
  }

  const onSocialWithdraw = async() => {
    try {
      await auth.socialWithdraw(values.access_token)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const goBack = () => router.goto('/mypage')

</script>

<main class="form-signin w-100 m-auto">
  <div class="join-img"></div>
  <h1 class="h3 mb-3 fw-normal">정말 탈퇴하시겠습니까?</h1>
  <br>
  <h6>회원 탈퇴 시 가입된 이메일로는 재가입이 불가능합니다.</h6>
  <br>
  <button class="w-100 btn btn-lg btn-primary" on:click={onSocialWithdraw}>탈퇴하기</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack} style="margin-top: 10px;">취소</button>
</main>