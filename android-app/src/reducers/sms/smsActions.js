import { Alert } from 'react-native'
import { createAction } from 'redux-actions'
import SmsAndroid from 'react-native-get-sms-android'
import ApiClient from '../../lib/ApiClient'
import { makeSelectMessageById } from './smsSelectors'

const filter = JSON.stringify({
  box: ''
})

export const setMessages = ({ messages = [] }) => async (dispatch, getState) => {
  const log = {};
  let newMessages = messages
    .filter(({ _id }) => {
      log[_id] = makeSelectMessageById(_id)(getState()) == null
      return makeSelectMessageById(_id)(getState()) == null
    })

  if (!newMessages.length) {
    return;
  }

  const { result = [] } = await ApiClient('/check-sms', {
    method: 'POST',
    body: JSON.stringify({
      sms: newMessages.map(message => message.body)
    })
  })

  newMessages = newMessages.map((item, index) => ({
    ...item,
    isSpam: !!result[index]
  }))

  dispatch(setMessagesAction({ messages: newMessages }))
}

export const setMessagesAction = createAction(
  '@sms/set',
  ({ messages = [] }) => ({ messages })
)

export const markAsSpam = ({ id }) => async (dispatch, getState) => {
  const sms = makeSelectMessageById(id)(getState())
  if (!sms) {
    return;
  }

  dispatch(markAsSpamAction({ id }))
  await ApiClient('/add-spam', {
    method: 'POST',
    body: JSON.stringify({
      sms: sms.get('text')
    })
  })
}

export const unMarkAsSpam = ({ id }) => async (dispatch, getState) => {
  const sms = makeSelectMessageById(id)(getState())
  if (!sms) {
    return;
  }

  dispatch(unMarkAsSpamAction({ id }))
  await ApiClient('/remove-spam', {
    method: 'POST',
    body: JSON.stringify({
      sms: sms.get('text')
    })
  })
}

export const markAsSpamAction = createAction(
  '@sms/spam',
  ({ id }) => ({ id })
)

export const unMarkAsSpamAction = createAction(
  '@sms/unspam',
  ({ id }) => ({ id })
)

export const loadMessages = () => (dispatch) => {
  return new Promise(resolve => SmsAndroid.list(filter, (fail) => {
    console.log(`Failed with this error: ${fail}`)
  },
  (count, smsList) => {
    dispatch(setMessages({ messages: JSON.parse(smsList) }))
    resolve(true)
  }))
}
