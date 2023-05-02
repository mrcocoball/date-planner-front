<script>
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'
  import '../../styles/auth.css'

  let values = {
    formEmail: '',
    formPassword: '',
  }

  let clientKey = import.meta.env.VITE_KAKAO_CLIENT_KEY
  let redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URL

  const resetValues = () => {
    values.formEmail = ''
    values.formPassword = ''
  }

  const onLogin = async() => {
    try {
      await auth.login(values.formEmail, values.formPassword)
      resetValues()
    }
    catch (error) {
      alert(error.msg)
    }
  }

  const onSocialLogin = () => {
    let url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientKey}&redirect_uri=${redirectUri}`
    location.href = url
  }

  const goJoin = () => router.goto('/join')

  const goBack = () => router.goto('/')

</script>

<main class="form-signin w-100 m-auto">
  <div class="login-img"></div>
  <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  <div class="form-floating">
    <input type="email" class="form-control" name="email" id="floatingInput" placeholder="이메일" autocomplete="off" bind:value={values.formEmail}>
    <label for="floatingInput">이메일</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="PASSWORD" autocomplete="off" bind:value={values.formPassword}>
    <label for="floatingPassword">비밀번호</label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" on:click={onLogin}>로그인</button>
  <div class="login-footer">
    <span>혹시 아이디가 없으신가요?</span>
    <div class="login-footer-button">
      <button class="w-100 btn btn-lg btn-create" on:click={goJoin}>회원가입</button>
      <button class="w-100 btn btn-lg btn-kakao" on:click={onSocialLogin} style="margin-top: 10px;">카카오 로그인 (이메일 제공 동의 필요)</button>
      <button class="w-100 btn btn-lg btn-cancel" on:click={goBack} style="margin-top: 10px;">취소</button>
    </div>
  </div>
  <p class="mt-5 mb-3 text-muted">&copy; 2023 Cocoball Factory</p>
</main>