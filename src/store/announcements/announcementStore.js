import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentAnnouncementPaginationBar.resetPaginationBar()
  currentAnnouncementsPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentAnnouncementsPage() {

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
function setCurrentAnnouncementsPaginationBar() {

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
function setAnnouncements() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchAnnouncements = async () => {  
    let path = `/api/v1/announcements`

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
      currentAnnouncementPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchAnnouncementsBySearch = async (categoryId, condition, keyword) => {

    let path = `/api/v1/announcements?condition=${condition}&keyword=${keyword}`
    if (categoryId != 0) {
      path = path + `&categoryId=${categoryId}`
    }

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
      currentAnnouncementPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchAnnouncementsByPage = async (savedPath, pageNum) => {

    let path = ''
    if (savedPath.endsWith('announcements')) {
      path = savedPath + `?page=${pageNum}`
    } else {
      path = savedPath + `&page=${pageNum}`
    }

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

      currentAnnouncementPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentAnnouncementsPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetAnnouncements = () => {
    set({...initValues})
    currentAnnouncementsPage.resetPage()
  }

  return {
    subscribe,
    fetchAnnouncements,
    fetchAnnouncementsByPage,
    fetchAnnouncementsBySearch,
    resetAnnouncements,
  }
}


// 장소 상세 페이지
function setAnnouncementDetail() {

  let initValues = {
    data: {
      id: '',
      categoryName: '',
      title: '',
      description: '',
      createdAt: '',
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const getAnnouncement = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/announcements/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  const resetAnnouncement = () => {
    set({...initValues})
  }

  return {
    subscribe,
    getAnnouncement,
    resetAnnouncement
  }

}

export const currentAnnouncementsPage = setCurrentAnnouncementsPage();
export const currentAnnouncementPaginationBar = setCurrentAnnouncementsPaginationBar();
export const announcements = setAnnouncements();
export const announcementDetail = setAnnouncementDetail();
export const requestPath = writable('')