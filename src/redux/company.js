import moment from 'moment'
import { apiProvider } from '../services/api/api-provider'

const initialState = {
  name: '',
  description: '',
  address: '',
  postalCode: '',
  region: '',
  city: '',
  jobOpenings: null,
  isBusy: false,
  taskError: null,
}

// const types
const SET_PROFILE = 'SET_COMPANY_PROFILE'
const ADD_JOB_OPENING = 'ADD_JOB_OPENING'
const ADD_JOB_OPENING_COMPLETE = 'ADD_JOB_OPENING_COMPLETE'
const ADD_JOB_OPENING_ERROR = 'ADD_JOB_OPENING_ERROR'
const COMPANY_UPDATE = 'COMPANY_UPDATE'
const COMPANY_UPDATE_COMPLETE = 'COMPANY_UPDATE_COMPLETE'
const JOB_OPENING_UPDATE = 'JOB_OPENING_UPDATE'
const JOB_OPENING_UPDATE_COMPLETE = 'JOB_OPENING_UPDATE_COMPLETE'
const SET_ERROR = 'SET_ERROR'
const SIGN_OUT = 'SIGN_OUT'

// reducers
const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return initialState

    case COMPANY_UPDATE:
      return {
        ...state,
        isBusy: true,
      }

    case COMPANY_UPDATE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        description: action.payload.description,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        region: action.payload.region,
        city: action.payload.city,
      }

    case JOB_OPENING_UPDATE:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case JOB_OPENING_UPDATE_COMPLETE:
      return {
        ...state,
        isBusy: false,
        jobOpenings: action.payload,
      }

    case SET_PROFILE:
      return {
        ...state,
        isBusy: false,
        name: action.payload.name,
        description: action.payload.description,
        address: action.payload.address,
        postalCode: action.payload.postalCode,
        region: action.payload.region,
        city: action.payload.city,
        jobOpenings: action.payload.jobOpenings,
      }

    case ADD_JOB_OPENING:
      return {
        ...state,
        taskError: null,
        isBusy: true,
      }

    case ADD_JOB_OPENING_COMPLETE:
      return {
        ...state,
        isBusy: false,
        jobOpenings: action.payload,
      }

    case ADD_JOB_OPENING_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: true,
      }

    case SET_ERROR:
      return {
        ...state,
        isBusy: false,
        taskError: action.payload,
      }

    default:
      return state
  }
}

export default companyReducer

// actions

const signOut = () => dispatch => dispatch({ type: SIGN_OUT })

const setProfile = profile => dispatch => {
  const { jobOpenings, enrolls, students } = profile
  const jobs = jobOpenings.map(j => {
    j.enrolls = enrolls.map(en => {
      en.studentDetail = students.find(s=> s._id === en.student)
      return en
    })
    return j
  })

  const props = {...profile, jobOpenings: jobs}

  dispatch({ type: SET_PROFILE, payload: props })
}

const updateCompany = data => (dispatch, getState) => {
  dispatch({ type: COMPANY_UPDATE })
  const { userId, accessToken } = getState().user

  apiProvider
    .put('companies', userId, data, accessToken)
    .then(() => dispatch({ type: COMPANY_UPDATE_COMPLETE, payload: data }))
    .catch(e => dispatch({ type: SET_ERROR, payload: e }))
}

const addJobOpening = data => (dispatch, getState) => {
  const { userId, accessToken } = getState().user
  const { jobOpenings } = getState().company
  const model = { ...data, company: userId }
  dispatch({ type: ADD_JOB_OPENING })
  apiProvider
    .post('job_openings', model, accessToken)
    .then(res => {
      const jobs = [...jobOpenings, data]
      dispatch({ type: ADD_JOB_OPENING_COMPLETE, payload: jobs })
    })
    .catch(e => dispatch({ type: ADD_JOB_OPENING_ERROR }))
}

const removeJobOpening = jobId => (dispatch, getState) => {
  dispatch({ type: JOB_OPENING_UPDATE })
  const { accessToken } = getState().user
  const { jobOpenings } = getState().company
  const job = jobOpenings.find(j => j.id === jobId)
  const hDate = moment().subtract(3, 'years').format('YYYY-MM-DD')
  const model = { ...job, hiringDate: hDate }
  apiProvider.put('job_openings', jobId, model, accessToken).then(res => {
    const jobs = res.data.job_openings.filter(jb => moment(jb.hiringDate) > moment())
    dispatch({ type: JOB_OPENING_UPDATE_COMPLETE, payload: jobs })
  })
}

export const actions = {
  signOut,
  setProfile,
  updateCompany,
  addJobOpening,
  removeJobOpening,
}
