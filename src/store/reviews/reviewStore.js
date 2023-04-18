import { writable, get, derived } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi, postApi, delApi, putApi } from '../../service/api'

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

  const addReview = async (place_id, title, description, reviewScore) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: "/api/v1/reviews",
        data: {
          placeId: place_id,
          title: title,
          description: description,
          reviewScore: reviewScore
        },
        access_token: access_token
      }

      const newReview = await postApi(options)

      update(datas => {
        datas.data.content = [newReview.data, ...datas.data.content]
        return datas
      })

      // 일단 임시로 artices.resetArticles() 호출, 백엔드 API 쪽 리턴값 변경 후 삭제
      reviews.resetReviews()

      return

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

  // 수정 기능
  const updateReview = async(review) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: review.id,
        title: review.title,
        description: review.description,
        reviewScore: review.reviewScore
      }

      const options = {
        path: `/api/v1/reviews/${updateData.id}`,
        data: {
          title: updateData.title,
          description: updateData.description,
          reviewScore: updateData.reviewScore
        },
        access_token: access_token,
      }

      const updateReview = await putApi(options)

      update(datas => {
        const newReviewList = datas.data.content.map(review => {
          if(review.id === updateReview.data.id) {
            review = updateReview.data
          }
          return review
        })
        datas.data.content = newReviewList
        return datas
      })

      reviews.closeEditModeReview()
      alert('수정 완료')
    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  const deleteReview = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/reviews/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newReviewList = datas.data.content.filter(review => review.id !== id)
        datas.data.content = newReviewList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중에 오류가 발생하였습니다.')
    }

  }

  return {
    subscribe,
    fetchReviews,
    fetchReviewsByPage,
    resetReviews,
    addReview,
    openMenuPopup,
    closeMenuPopup,
    openEditModeReview,
    closeEditModeReview,
    updateReview,
    deleteReview,
  }
}

export const currentReviewsPage = setCurrentReviewsPage();
export const currentReviewPaginationBar = setCurrentReviewsPaginationBar();
export const reviews = setReviews();
export const requestPath = writable('')