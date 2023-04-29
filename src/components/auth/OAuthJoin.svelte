<script>
  import { onMount, afterUpdate } from 'svelte'
  import { postApi } from '../../service/api'
  import { router } from 'tinro'
  import { auth } from '../../store/auth/authStore'

  let values = {
    formNickname: '',
    code: '',
    access_token: '',
  }

  let nicknameChecked = false
  let checkedNickname = ''
  let registerd = false
  let tokenChecked = false
  let formValid = 'form-control is-valid'
  let formInvalid = 'form-control is-invalid'

  onMount(() => {
    const authCode = new URL(window.location.href).searchParams.get('code')
    values.code = authCode
    getAccessToken()
  })

  const getAccessToken = async () => {
    try {
      const result = await auth.getKakaoAccessToken(values.code)
      const access_token = result.access_token
      values.access_token = access_token
      tokenChecked = true
      checkRegister()
    }
    catch(error) {
      tokenChecked = true
    }
  }

  const checkRegister = async () => {
    const check = await auth.registerCheck(values.access_token)
    if (check == true) registerd = true
  }

  afterUpdate(() => {
    if (values.formNickname != checkedNickname) {
      checkedNickname = ''
      nicknameChecked = false
    }
    if (registerd) onSocialLogin()
  })

  const onNicknameCheck = async () => {
    try {
      await postApi({path: `/api/v1/nicknameCheck?nickname=${values.formNickname}`})
      checkedNickname = values.formNickname
      nicknameChecked = true
    }
    catch(error) {
      alert('중복된 닉네임입니다.')
      nicknameChecked = false
    }
  }

  const onSocialJoin = async() => {
    if (!nicknameChecked) {
      alert('닉네임 중복 체크를 하지 않았습니다!')
      return
    }
    try {
      await auth.socialRegister(values.formNickname, values.access_token)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const onSocialLogin = async() => {
    try {
      await auth.socialLogin(values.access_token)
    }
    catch(error) {
      alert(error.response.data.msg)
    }
  }

  const goBack = () => router.goto('/login')

</script>

{#if !registerd}
<main class="form-signin w-100 m-auto">
  <div class="join-img"></div>
  <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
  <div class="form-floating valid-form-text">
    <input type="text" class={nicknameChecked ? formValid : formInvalid} name="nickname" placeholder="닉네임" autocomplete="off" bind:value={values.formNickname}>
    <label for="floatingInput">닉네임</label>
    {#if !nicknameChecked}
    <div class="join-valid-button">
      <button class="btn btn-search" on:click={onNicknameCheck}>중복 체크</button>
    </div>
    {/if}
  </div>

  <button class="w-100 btn btn-lg btn-primary" on:click={onSocialJoin}>회원가입</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack} style="margin-top: 10px;">취소</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2023 Cocoball Factory</p>
</main>
{/if}