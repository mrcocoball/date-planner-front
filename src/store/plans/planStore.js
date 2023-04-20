import { writable, get, derived } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi, postApi, putApi, delApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentPlanPaginationBar.resetPaginationBar()
  currentPlansPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentPlansPage() {

  const {subscribe, set} = writable(0) // Spring Data JPA Pageable 특성상 초기값 0

  const setPage = (pageNum) => set(pageNum)

  const resetPage = () => set(0)

  return {
    subscribe,
    setPage,
    resetPage,
  }

}

// 페이지 바 관련 store
function setCurrentPlansPaginationBar() {

  const {subscribe, set} = writable([])

  const setPaginationBar = (pageBar, totalPages) => {

    let paginationBar = []
    const BAR_LENGTH = 10
    const start_number = Math.max(pageBar - (BAR_LENGTH / 2), 0)
    const end_number = Math.min(start_number + BAR_LENGTH, totalPages)

    for (let i=start_number; i<end_number; i++) {
      paginationBar.push(i)
    }

    set(paginationBar)
  }

  const resetPaginationBar = () => set([])

  return {
    subscribe,
    setPaginationBar,
    resetPaginationBar,
  }

}

// 플랜 전체 조회 관련
function setPlans() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchPlans = async () => {    
    let path = `/api/v1/plans`
    requestPath.set(path)

    try {

      const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token
      }

      const getDatas = await getApi(options)
      setPageInitialization()

      const newData = {
        content: getDatas.data.content,
        totalPages: getDatas.data.totalPages,
      }

      update(datas => {
        datas.data.content = newData.content
        datas.data.totalPages = newData.totalPages
        return datas
      })

      currentPlanPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchPlansByPage = async (savedPath, pageNum) => {
    let path = savedPath + `?page=${pageNum}`

    try {

      const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token
      }

      const getDatas = await getApi(options)

      const newData = {
        content: getDatas.data.content,
        totalPages: getDatas.data.totalPages,
      }

      update(datas => {
        datas.data.content = newData.content
        datas.data.totalPages = newData.totalPages
        return datas
      })

      currentPlanPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentPlansPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetPlans = () => {
    set({...initValues})
    currentPlansPage.resetPage()
  }

  return {
    subscribe,
    fetchPlans,
    fetchPlansByPage,
    resetPlans,
  }
}


// 장소 상세 페이지
function setPlanDetail() {

  let initValues = {
    data: {
      id: '',
      nickname: '',
      title: '',
      detailPlans: [],
      finished: false,
      comment: ''
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const getPlan = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/plans/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetPlan = () => {
    set({...initValues})
  }

  const finished = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/plans/${id}/finish`,
        access_token: access_token
      }

      const getData = await putApi(options)

      update(data => {
        data.data.finished = true
        return data
      })
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  return {
    subscribe,
    getPlan,
    resetPlan,
    finished
  }

}

export const currentPlansPage = setCurrentPlansPage();
export const currentPlanPaginationBar = setCurrentPlansPaginationBar();
export const plans = setPlans();
export const requestPath = writable('')
export const planDetail = setPlanDetail();