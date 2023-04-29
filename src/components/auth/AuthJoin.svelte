<script>
  import { postApi } from '../../service/api'
  import { afterUpdate } from 'svelte'
  import { auth } from '../../store/auth/authStore'
  import { router } from 'tinro'

  let values = {
    formEmail: '',
    formNickname: '',
    formPassword: '',
    formPasswordConfirm: '',
  }

  let emailChecked = false
  let nicknameChecked = false
  let passwordChecked = false
  let checkedEmail = ''
  let checkedNickname = ''
  let formValid = 'form-control is-valid'
  let formInvalid = 'form-control is-invalid'

  afterUpdate(() => {
    if (values.formEmail != checkedEmail) {
      checkedEmail = ''
      emailChecked = false
    }
    if (values.formNickname != checkedNickname) {
      checkedNickname = ''
      nicknameChecked = false
    }
    if (values.formPassword != '' && values.formPassword == values.formPasswordConfirm) {
      passwordChecked = true 
    }
    if (values.formPassword != '' && values.formPassword != values.formPasswordConfirm) {
      passwordChecked = false
    }
  })

  const onEmailCheck = async () => {

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(values.formEmail)) {
      alert('올바른 이메일 형식이 아닙니다')
      return
    }
    try {
      await postApi({path: `/api/v1/emailCheck?email=${values.formEmail}`})
      checkedEmail = values.formEmail
      emailChecked = true
    }
    catch(error) {
      alert('중복된 닉네임입니다.')
      nicknameChecked = false
    }
  }

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

  const onJoin = async() => {
    if (!emailChecked) {
      alert('이메일 중복 체크를 하지 않았습니다!')
      return
    }
    if (!nicknameChecked) {
      alert('닉네임 중복 체크를 하지 않았습니다!')
      return
    }
    if (!passwordChecked) {
      alert('비밀번호가 맞지 않습니다!')
      return
    }
    try {
      await auth.register(values.formEmail, values.formPassword, values.formNickname)
    }
    catch(error) {
      alert('회원 가입에 실패했습니다. 다시 시도해주세요')
    }
  }

  const goBack = () => router.goto('/login')

</script>

<main class="form-signin w-100 m-auto">
  <div class="join-img"></div>
  <h1 class="h3 mb-3 fw-normal">Sign Up</h1>
  <div class="form-floating valid-form">
    <input type="email" class={emailChecked ? formValid : formInvalid} name="email" placeholder="이메일" autocomplete="off" bind:value={values.formEmail}>
    <label for="floatingInput">이메일</label>
    {#if !emailChecked}
    <div class="join-valid-button">
      <button class="btn btn-search" on:click={onEmailCheck}>중복 체크</button>
    </div>
    {/if}
  </div>
  <div class="form-floating valid-form-text">
    <input type="text" class={nicknameChecked ? formValid : formInvalid} name="nickname" placeholder="닉네임" autocomplete="off" bind:value={values.formNickname}>
    <label for="floatingInput">닉네임</label>
    {#if !nicknameChecked}
    <div class="join-valid-button">
      <button class="btn btn-search" on:click={onNicknameCheck}>중복 체크</button>
    </div>
    {/if}
  </div>
  <div class="form-floating valid-form">
    <input type="password" class={passwordChecked ? formValid : formInvalid} name="password" placeholder="PASSWORD" autocomplete="off" bind:value={values.formPassword}>
    <label for="floatingPassword">비밀번호</label>
  </div>
  <div class="form-floating valid-form">
    <input type="password" class={passwordChecked ? formValid : formInvalid} name="passwordConfirm" placeholder="PASSWORD" autocomplete="off" bind:value={values.formPasswordConfirm}>
    <label for="floatingPassword">비밀번호 재확인</label>
  </div>

  <button class="w-100 btn btn-lg btn-primary" on:click={onJoin}>회원가입</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack} style="margin-top: 10px;">취소</button>
  <p class="mt-5 mb-3 text-muted">&copy; 2023 Cocoball Factory</p>
</main>