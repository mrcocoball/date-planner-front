import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentFaqPaginationBar.resetPaginationBar()
  currentFaqsPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentFaqsPage() {

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
function setCurrentFaqsPaginationBar() {

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

// FAQ 카테고리 전체 조회 관련
function setFaqs() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchFaqs = async () => {    
    let path = `/api/v1/faqs`

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
      currentFaqPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchFaqsByPage = async (savedPath, pageNum) => {
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

      currentFaqPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentFaqsPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetFaqs = () => {
    set({...initValues})
    currentFaqsPage.resetPage()
  }

  return {
    subscribe,
    fetchFaqs,
    fetchFaqsByPage,
    resetFaqs,
  }
}

// FAQ 카테고리 상세 페이지
function setFaqDetail() {

  let initValues = {
    data: {
      id: '',
      categoryName: '',
      favoriteAnswers: [],
      createdAt: '',
    },
  }

  const { subscribe, set } = writable({...initValues})

  const getFaq = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/faqs/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetFaq = () => {
    set({...initValues})
  }

  return {
    subscribe,
    getFaq,
    resetFaq
  }

}

export const currentFaqsPage = setCurrentFaqsPage();
export const currentFaqPaginationBar = setCurrentFaqsPaginationBar();
export const faqs = setFaqs();
export const faqDetail = setFaqDetail();
export const requestPath = writable('');