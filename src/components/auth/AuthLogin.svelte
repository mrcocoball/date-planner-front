<script>
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'
  import '../../styles/auth.css'

  let values = {
    formEmail: '',
    formPassword: '',
  }

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

  const goJoin = () => router.goto('/join')

  const goBack = () => router.goto('/places')

</script>

<main class="form-signin w-100 m-auto">
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
  <span>아이디가 없으신가요?</span>
  <button class="w-100 btn btn-lg btn-create" on:click={goJoin}>회원가입</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack}>취소</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2023 Cocoball Enterprise</p>
</main>