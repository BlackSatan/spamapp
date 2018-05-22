import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { setMessages, markAsSpam, unMarkAsSpam } from './smsActions'
import initialState from './smsInitialState'

export default handleActions({
  [setMessages]: (state, { payload }) => {
    const { messages } = payload

    return state.set('messages', fromJS(messages.map(message => ({
      id: message._id,
      address: message.address,
      date: message.date,
      text: message.body,
      isSpam: false
    }))))
  },
  [markAsSpam]: (state, { payload }) => state.updateIn([
    'messages',
    state.get('messages').findIndex(message => message.get('id') === payload.id)
  ], item => item.set('isSpam', true)),
  [unMarkAsSpam]: (state, { payload }) => state.updateIn([
    'messages',
    state.get('messages').findIndex(message => message.get('id') === payload.id)
  ], item => item.set('isSpam', false))
}, initialState)
