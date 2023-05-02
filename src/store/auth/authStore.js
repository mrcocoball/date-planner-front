import { writable, derived } from 'svelte/store'
import { delApi, postApi, postKakaoApi } from '../../service/api'
import { router } from 'tinro'

// 인증 관련 store
function setAuth() {

  let initValues = {
    uid: "",
    email: "",
    Authorization: "",
    social: false,
  }

  const { subscribe, set, update } = writable({ ...initValues }); // 스프레드 이용 이유 : initValues가 참조되지 않고 복제되므로
  
  // refresh_token을 통해 access_token을 요청
  const refresh = async () => {
    try {
      const authenticationUser = await postApi({path: '/api/v1/refresh'});
      set(authenticationUser);
      isRefresh.set(true)
    } catch (err) {
      auth.resetUserInfo();
      isRefresh.set(false)
    }
  };

  // 해당 스토어를 초기화
  const resetUserInfo = () => set({ ...initValues });

  const login = async (email, password) => {
    try {
      const options = {
        path: "/api/v1/login",
        data: {
          email: email,
          password: password,
        },
      };
      const result = await postApi(options);
      set(result);
      isRefresh.set(true);
      router.goto("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const logout = async () => {
    try {
      const options = {
        path: "/api/v1/logout",
      }
      await delApi(options)
      set({...initValues})
      isRefresh.set(false)
      router.goto('/')
    }
    catch(error) {
      alert(error.response.data.msg);
    }

  };

  const register = async (email, password, nickname) => {
    try {
      const options = {
        path: "/api/v1/join",
        data: {
          email: email,
          password: password,
          nickname: nickname,
        },
      };

      await postApi(options);
      alert("회원 가입이 완료되었습니다");
      router.goto("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const getKakaoAccessToken = async (code) => {
    
    // 환경변수 처리 필요
    let clientKey = import.meta.env.VITE_KAKAO_CLIENT_KEY
    let redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URL

    try {
      const options = {
        path: "https://kauth.kakao.com/oauth/token",
        data: {
          grant_type: "authorization_code",
          client_id: clientKey,
          redirect_uri: redirectUri,
          code: code
        },
      };

      const result = await postKakaoApi(options)
      return result
    } catch (error) {
    }
  }

  const getKakaoAccessTokenWithdraw = async (code) => {
    
    // 환경변수 처리 필요
    let clientKey = import.meta.env.VITE_KAKAO_CLIENT_KEY
    let redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URL2

    try {
      const options = {
        path: "https://kauth.kakao.com/oauth/token",
        data: {
          grant_type: "authorization_code",
          client_id: clientKey,
          redirect_uri: redirectUri,
          code: code
        },
      };

      const result = await postKakaoApi(options)
      return result
    } catch (error) {
    }
  }

  const registerCheck = async (access_token) => {
    try {
      await postApi({path: `/api/v1/oauth/check?accessToken=${access_token}`})
      return true
    } catch (error) {
      return false
    }
  }

  const socialRegister = async (nickname, access_token) => {
    try {
      const options = {
        path: "/api/v1/oauth/join/kakao",
        data: {
          nickname: nickname,
          access_token: access_token
        },
      };

      await postApi(options);
      alert("회원 가입이 완료되었습니다");
      router.goto("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const socialLogin = async (access_token) => {
    try {
      const options = {
        path: "/api/v1/oauth/login/kakao",
        data: {
          access_token: access_token,
        },
      };
      const result = await postApi(options);
      set(result);
      isRefresh.set(true);
      router.goto("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const withdraw = async () => {
    try {
      await delApi({path: `/api/v1/withdraw`});
      set({...initValues})
      isRefresh.set(false)
      alert("회원 탈퇴 완료되었습니다. 이용해주셔서 감사합니다.");
      router.goto("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const socialWithdraw = async (access_token) => {
    try {
      const options = {
        path: "/api/v1/withdraw",
        data: {
          access_token: access_token,
        },
      };
      await delApi(options);
      set({...initValues})
      isRefresh.set(false)
      alert("회원 탈퇴 및 카카오 로그인 연동이 해제되었습니다. 이용해주셔서 감사합니다.");
      router.goto("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
    getKakaoAccessToken,
    getKakaoAccessTokenWithdraw,
    registerCheck,
    socialRegister,
    socialLogin,
    withdraw,
    socialWithdraw
  };
}

// 로그인 판별 store
function setIsLogin() {
  const checkLogin = derived(auth, $auth => $auth.Authorization ? true : false);
  return checkLogin;
}

export const auth = setAuth();
export const isLogin = setIsLogin();
export const isRefresh = writable(false);