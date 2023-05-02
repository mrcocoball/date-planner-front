import { writable, get } from 'svelte/store'
import { auth } from '../auth/authStore'
import { getApi, postApi, putApi, delApi } from '../../service/api'

// 페이지 초기화
function setPageInitialization() {
  currentQnaPaginationBar.resetPaginationBar()
  currentQnasPage.resetPage()
}

// 현재 페이지 관련 store
function setCurrentQnasPage() {

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
function setCurrentQnasPaginationBar() {

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
function setQnas() {

  let initValues = {
    data : {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const fetchQnas = async () => {    
    let path = `/api/v1/questions`

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
      currentQnaPaginationBar.setPaginationBar(0, getDatas.data.totalPages)

    }
    catch(error) {
      throw error
    }

  }

  const fetchQnasByPage = async (savedPath, pageNum) => {
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

      currentQnaPaginationBar.setPaginationBar(pageNum, getDatas.data.totalPages)
      currentQnasPage.setPage(pageNum)

    }
    catch(error) {
      throw error
    }

  }

  const addQuestion = async (title, description, categoryId) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: "/api/v1/questions",
        data: {
          title: title,
          description: description,
          categoryId: categoryId
        },
        access_token: access_token
      }

      const newQuestion = await postApi(options)

      update(datas => {
        datas.data.content = [newQuestion.data, ...datas.data.content]
        return datas
      })

      return

    }
    catch(error) {
      throw error
    }

  }

  const resetQnas = () => {
    set({...initValues})
    currentQnasPage.resetPage()
  }

  // 수정 기능
  const updateQuestion = async(updateQuestion) => {

    update(datas => {
      const newQuestionList = datas.data.content.map(question => {
        if(question.id === updateQuestion.data.id) {
          question = updateQuestion.data
        }
        return question
      })
      datas.data.content = newQuestionList
      return datas
    })

  }

  const deleteQuestion = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/questions/${id}`,
        access_token: access_token
      }

      await delApi(options)

      update(datas => {
        const newQuestionList = datas.data.content.filter(question => question.id !== id)
        datas.data.content = newQuestionList
        return datas
      })

    }
    catch(error) {
      alert('삭제 중에 오류가 발생하였습니다.')
    }
  }

  return {
    subscribe,
    fetchQnas,
    fetchQnasByPage,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    resetQnas,
  }
}

// 장소 상세 페이지
function setQnaDetail() {

  let initValues = {
    data: {
      id: '',
      uid: 0,
      nickname: '',
      email: '',
      categoryId: 0,
      categoryName: '',
      title: '',
      description: '',
      answers: [],
      createdAt: '',
      modifiedAt: '',
    },
  }

  const { subscribe, update, set } = writable({...initValues})

  const getQna = async (id) => {

    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/api/v1/questions/${id}`,
        access_token: access_token
      }

      const getData = await getApi(options)
      set(getData)

    }
    catch(error) {
      alert('오류가 발생했습니다. 다시 시도해주세요')
    }

  }

  // 수정 기능
  const updateQuestion = async(id, title, description, categoryId) => {

    const access_token = get(auth).Authorization

    try {
      const updateData = {
        id: id,
        title: title,
        description: description,
        categoryId: categoryId
      }

      const options = {
        path: `/api/v1/questions/${updateData.id}`,
        data: {
          title: updateData.title,
          description: updateData.description,
          categoryId: updateData.categoryId
        },
        access_token: access_token,
      }

      const updateQuestion = await putApi(options)

      update(data => {
        data.data.title = updateQuestion.data.title
        data.data.description = updateQuestion.data.description
        data.data.categoryName = updateQuestion.data.categoryName
        return data
      })
      qnas.updateQuestion(updateQuestion)

    }
    catch(error) {
      alert('수정 중에 오류가 발생하였습니다.')
    }

  }

  const resetQna = () => {
    set({...initValues})
  }

  const addAnswer = async (qid, description) => {
    const access_token = get(auth).Authorization

    try {

      const options = {
        path: `/api/v1/answers`,
        data: {
          qid: qid,
          description: description
        },
        access_token: access_token
      }

      const newAnswer = await postApi(options)

      update(datas => {
        datas.data.answers = [...datas.data.answers, newAnswer.data]
        return datas
      })

      return

    }
    catch(error) {
      throw error
    }

  }

  return {
    subscribe,
    getQna,
    resetQna,
    updateQuestion,
    addAnswer
  }

}

export const currentQnasPage = setCurrentQnasPage();
export const currentQnaPaginationBar = setCurrentQnasPaginationBar();
export const qnas = setQnas();
export const qnaDetail = setQnaDetail();
export const requestPath = writable('');