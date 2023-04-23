import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentBookmarkPaginationBar.resetPaginationBar()
  currentBookmarksPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentBookmarksPage() {

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
function setCurrentBookmarksPaginationBar() {

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
function setBookmarks() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchBookmarks = async () => {    
    let path = `/api/v1/bookmarks`
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

      currentBookmarkPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchBookmarksByPage = async (savedPath, pageNum) => {
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

      currentBookmarkPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentBookmarksPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const resetBookmarks = () => {
    set({...initValues})
    currentBookmarksPage.resetPage()
  }

  // 북마크 추가 갱신
  const addBookmark = async (getData) => {

    update(datas => {
      datas.data.content = [getData.data, ...datas.data.content]
      return datas
    })

    return

  }

  // 북마크 삭제 갱신
  const deleteBookmark = async(placeId) => {

    update(datas => {
      const newBookmarkList = datas.data.content.filter(bookmark => bookmark.placeId !== placeId)
      datas.data.content = newBookmarkList
      return datas
    })

  }

  return {
    subscribe,
    fetchBookmarks,
    fetchBookmarksByPage,
    resetBookmarks,
    addBookmark,
    deleteBookmark
  }
}

export const currentBookmarksPage = setCurrentBookmarksPage();
export const currentBookmarkPaginationBar = setCurrentBookmarksPaginationBar();
export const bookmarks = setBookmarks();
export const requestPath = writable('')