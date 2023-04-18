import { writable, get, derived } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentReviewPaginationBar.resetPaginationBar()
  currentReviewsPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentReviewsPage() {

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
function setCurrentReviewsPaginationBar() {

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

// 게시글 전체 조회 관련
function setReviews() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
    menuPopup: '',
    editMode: '',
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchReviews = async (place_id) => {    
    let path = `/api/v1/reviews/list/${place_id}`
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

      currentReviewPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchReviewsByPage = async (savedPath, pageNum) => {
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

      currentReviewPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentReviewsPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetReviews = () => {
    set({...initValues})
    currentReviewsPage.resetPage()
  }

    // 팝업 관련
  // 선택 받은 객체의 id 값을 해당 스토어의 menuPopup에 저장
  const openMenuPopup = (id) => {
    update(datas => {
      datas.menuPopup = id
      return datas
    })
  }

  // 해당 스토어의 menuPopup 초기화
  const closeMenuPopup = () => {
    update(datas => {
      datas.menuPopup = ''
      return datas
    })
  }

  // 수정 폼 관련
  const openEditModeReview = (id) => {
    reviews.closeMenuPopup()

    // 수정된 데이터 업데이트
    update(datas => {
      datas.editMode = id
      return datas
    })
  }

  const closeEditModeReview = () => {
    update(datas => {
      datas.editMode = ''
      return datas
    })
  }

  return {
    subscribe,
    fetchReviews,
    fetchReviewsByPage,
    resetReviews,
    openMenuPopup,
    closeMenuPopup,
    openEditModeReview,
    closeEditModeReview,
  }
}

export const currentReviewsPage = setCurrentReviewsPage();
export const currentReviewPaginationBar = setCurrentReviewsPaginationBar();
export const reviews = setReviews();
export const requestPath = writable('')
//export const reviewDetail = setReviewDetail();