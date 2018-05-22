import { createAction } from 'redux-actions'
import SmsAndroid from 'react-native-get-sms-android'

const filter = JSON.stringify({
  box: ''
})

export const setMessages = createAction(
  '@sms/set',
  ({ messages = [] }) => ({ messages })
)

export const markAsSpam = createAction(
  '@sms/spam',
  ({ id }) => ({ id })
)

export const unMarkAsSpam = createAction(
  '@sms/unspam',
  ({ id }) => ({ id })
)

export const loadMessages = () => (dispatch, getState) => {
  return new Promise(resolve => SmsAndroid.list(filter, (fail) => {
    console.log(`Failed with this error: ${fail}`)
  },
  (count, smsList) => {
    dispatch(setMessages({ messages: JSON.parse(smsList) }))
    resolve(true)
  }))
}
