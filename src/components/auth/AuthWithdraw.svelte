<script>
  import { router } from 'tinro'
  import { auth } from '../../store/auth/authStore'

  const onWithdraw = async() => {
    try {
      await auth.withdraw()
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
  <button class="w-100 btn btn-lg btn-primary" on:click={onWithdraw}>탈퇴하기</button>
  <button class="w-100 btn btn-lg btn-cancel" on:click={goBack} style="margin-top: 10px;">취소</button>
</main>