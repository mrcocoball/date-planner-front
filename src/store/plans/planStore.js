import { writable, get } from 'svelte/store'
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
    
      requestPath.set(path)
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

  const addPlan = async (title) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: "/api/v1/plans",
        data: {
          title: title,
        },
        access_token: access_token
      }

      const newPlan = await postApi(options)

      update(datas => {
        datas.data.content = [newPlan.data, ...datas.data.content]
        return datas
      })

      return

    }
    catch(error) {
      throw error
    }

  }

  const resetPlans = () => {
    set({...initValues})
    currentPlansPage.resetPage()
  }

  // 수정 기능
  const updatePlan = async(updatePlan) => {

    update(datas => {
      const newPlanList = datas.data.content.map(plan => {
        if(plan.id === updatePlan.data.id) {
          plan = updatePlan.data
        }
        return plan
      })
      datas.data.content = newPlanList
      return datas
    })

  }

  const deletePlan = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/plans/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newPlanList = datas.data.content.filter(plan => plan.id !== id)
        datas.data.content = newPlanList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중에 오류가 발생하였습니다.')
    }
  }

  return {
    subscribe,
    fetchPlans,
    fetchPlansByPage,
    addPlan,
    resetPlans,
    updatePlan,
    deletePlan
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

  // 수정 기능
  const updatePlan = async(id, title, comment) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: id,
        title: title,
        comment: comment,
      }

      const options = {
        path: `/api/v1/plans/${updateData.id}`,
        data: {
          title: updateData.title,
          comment: updateData.comment
        },
        access_token: access_token,
      }

      const updatePlan = await putApi(options)

      update(data => {
        data.data.title = updatePlan.data.title
        data.data.comment = updatePlan.data.comment
        return data
      })
      plans.updatePlan(updatePlan)

    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  const updateComment = async(id, title, comment) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: id,
        title: title,
        comment: comment,
      }

      const options = {
        path: `/api/v1/plans/${updateData.id}`,
        data: {
          title: updateData.title,
          comment: updateData.comment,
        },
        access_token: access_token,
      }

      const updatePlan = await putApi(options)

      update(data => {
        data.data.title = updatePlan.data.title
        data.data.comment = updatePlan.data.comment
        return data
      })
      plans.updatePlan(updatePlan)

    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  const getDetailPlan = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/detailPlans/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetDetailPlan = () => {
    set({...initValues})
  }

  const addDetailPlan = async (place_id, plan_id, index) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: `/api/v1/detailPlans?planId=${plan_id}`,
        data: {
          ord: index,
          pid: plan_id,
          kpid: place_id
        },
        access_token: access_token
      }

      const newDetailPlan = await postApi(options)

      update(datas => {
        datas.data.detailPlans = [...datas.data.detailPlans, newDetailPlan.data]
        return datas
      })

      return

    }
    catch(error) {
      throw error
    }

  }

  const deleteDetailPlan = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/detailPlans/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newDetailPlanList = datas.data.detailPlans.filter(detailPlan => detailPlan.id !== id)
        datas.data.detailPlans = newDetailPlanList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중에 오류가 발생하였습니다.')
    }

  }

  return {
    subscribe,
    getPlan,
    resetPlan,
    updatePlan,
    updateComment,
    getDetailPlan,
    addDetailPlan,
    deleteDetailPlan,
    resetDetailPlan,
    finished
  }

}


export const currentPlansPage = setCurrentPlansPage();
export const currentPlanPaginationBar = setCurrentPlansPaginationBar();
export const plans = setPlans();
export const requestPath = writable('');
export const planDetail = setPlanDetail();