<script>
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'
  import '../../styles/auth.css'

  let values = {
    formEmail: '',
    formNickname: '',
    formPassword: '',
    formPasswordConfirm: '',
  }

  const onJoin = async() => {
    try {
      await auth.register(values.formEmail, values.formPassword, values.formNickname)
    }
    catch(error) {
      console.log(error)
      alert('회원 가입에 실패했습니다. 다시 시도해주세요')
    }
  }

  const goBack = () => router.goto('/places')

</script>

<main class="form-signin w-100 m-auto">
  <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
  <div class="form-floating">
    <input type="email" class="form-control" name="email" id="floatingInput" placeholder="이메일" autocomplete="off" bind:value={values.formEmail}>
    <label for="floatingInput">이메일</label>
  </div>
  <div class="form-floating">
    <input type="text" class="form-control" name="nickname" id="floatingInput" placeholder="닉네임" autocomplete="off" bind:value={values.formNickname}>
    <label for="floatingInput">닉네임</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="PASSWORD" autocomplete="off" bind:value={values.formPassword}>
    <label for="floatingPassword">비밀번호</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" name="passwordConfirm" id="floatingPassword" placeholder="PASSWORD" autocomplete="off" bind:value={values.formPasswordConfirm}>
    <label for="floatingPassword">비밀번호 재확인</label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" on:click={onJoin}>회원가입</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack}>취소</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2023 Cocoball Enterprise</p>
</main>