import { writable, derived } from 'svelte/store'
import { delApi, postApi } from '../../service/api'
import { router } from 'tinro'

// 인증 관련 store
function setAuth() {

  let initValues = {
    uid: "",
    email: "",
    Authorization: "",
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

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register,
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