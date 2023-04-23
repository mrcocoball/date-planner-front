import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi, postApi, delApi, putApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentMyReviewPaginationBar.resetPaginationBar()
  currentMyReviewsPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentMyReviewsPage() {

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
function setCurrentMyReviewsPaginationBar() {

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

// 리뷰 전체 조회 관련
function setMyReviews() {

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

  const fetchMyReviews = async () => {    
    let path = `/api/v1/reviews`
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

      currentMyReviewPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchMyReviewsByPage = async (savedPath, pageNum) => {
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

      currentMyReviewPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentMyReviewsPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetMyReviews = () => {
    set({...initValues})
    currentMyReviewsPage.resetPage()
  }

  // 수정 기능
  const updateMyReview = async(updateReview) => {
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
  }

  const deleteMyReview = async (id) => {

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
    fetchMyReviews,
    fetchMyReviewsByPage,
    resetMyReviews,
    updateMyReview,
    deleteMyReview
  }
}

// 장소 상세 페이지
function setMyReviewDetail() {

  let initValues = {
    data: {
      placeId: '',
      placeName: '',
      placeUrl : '',
      title: '',
      description: '',
      reviewScore: '',
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const getMyReview = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/reviews/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      console.log(getData)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetMyReview = () => {
    set({...initValues})
  }

  // 수정 기능
  const updateMyReview = async(id, title, description, reviewScore) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: id,
        title: title,
        description: description,
        reviewScore : reviewScore
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

      update(data => {
        data.data.title = updateReview.data.title
        data.data.description = updateReview.data.description
        data.data.reviewScore = updateReview.data.reviewScore
        return data
      })
      myReviews.updateMyReview(updateReview)

    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  return {
    subscribe,
    getMyReview,
    resetMyReview,
    updateMyReview,
  }

}

export const currentMyReviewsPage = setCurrentMyReviewsPage();
export const currentMyReviewPaginationBar = setCurrentMyReviewsPaginationBar();
export const myReviews = setMyReviews();
export const myReviewDetail = setMyReviewDetail();
export const requestPath = writable('')