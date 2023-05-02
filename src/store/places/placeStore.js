import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi, postApi, delApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentPlacePaginationBar.resetPaginationBar()
  currentPlacesPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentPlacesPage() {

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
function setCurrentPlacesPaginationBar() {

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

// 장소 전체 조회 관련
function setPlaces() {

  let initValues = {
    x: '',
    y: '',
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchPlaces = async (address, category) => {    
    let path = `/api/v1/places?address=${address}&categories=${category}`

    try {

      const access_token = get(auth).Authorization

      const options = {
        path: path,
        access_token: access_token
      }

      const getDatas = await getApi(options)
      setPageInitialization()

      const newData = {
        x: getDatas.x,
        y: getDatas.y,
        content: getDatas.data.content,
        totalPages: getDatas.data.totalPages,
      }

      update(datas => {
        datas.x = newData.x
        datas.y = newData.y
        datas.data.content = newData.content
        datas.data.totalPages = newData.totalPages
        return datas
      })
      requestPath.set(path)
      currentPlacePaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchPlacesByPage = async (savedPath, pageNum) => {
    let path = savedPath + `&page=${pageNum}`

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

      currentPlacePaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentPlacesPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetPlaces = () => {
    set({...initValues})
    currentPlacesPage.resetPage()
  }

  return {
    subscribe,
    fetchPlaces,
    fetchPlacesByPage,
    resetPlaces,
  }
}


// 장소 상세 페이지
function setPlaceDetail() {

  let initValues = {
    data: {
      id: '',
      category_name: '',
      place_name: '',
      place_id: '',
      place_url: '',
      address_name: '',
      x: '',
      y: '',
      review_score: '',
      review_count: '',
      avg_review_score: '',
      image_url: '',
      description: '',
      bookmarked: false
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const getPlace = async (place_id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/places/${place_id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetPlace = () => {
    set({...initValues})
  }

  const bookmark = async (place_id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/bookmarks?placeId=${place_id}`,
        access_token: access_token
      }

      const getData = await postApi(options)

      update(data => {
        data.data.bookmarked = true
        return data
      })

      return getData
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const cancelBookmark = async (place_id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/bookmarks/place/${place_id}`,
        access_token: access_token
      }

      await delApi(options)
      
      update(data => {
        data.data.bookmarked = false

        return data
      })
    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  return {
    subscribe,
    getPlace,
    bookmark,
    cancelBookmark,
    resetPlace
  }

}

// 장소 추천 전체 조회 관련
function setPlaceRecommendations() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchPlaces = async (region1, region2) => {    
    if (region1 == '제주') {
      region1 = region1 + '특별자치도'
    }
    let path = `/api/v1/recommendation?region1=${region1}&region2=${region2}`

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
      currentPlacePaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchPlacesByPage = async (savedPath, pageNum) => {
    let path = savedPath + `&page=${pageNum}`

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

      currentPlacePaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentPlacesPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetPlaces = () => {
    set({...initValues})
    currentPlacesPage.resetPage()
  }

  return {
    subscribe,
    fetchPlaces,
    fetchPlacesByPage,
    resetPlaces,
  }
}

export const currentPlacesPage = setCurrentPlacesPage();
export const currentPlacePaginationBar = setCurrentPlacesPaginationBar();
export const places = setPlaces();
export const placeRecommendations = setPlaceRecommendations();
export const requestPath = writable('')
export const placeDetail = setPlaceDetail();