import { handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { setMessagesAction, markAsSpamAction, unMarkAsSpamAction } from './smsActions'
import initialState from './smsInitialState'

export default handleActions({
  [setMessagesAction]: (state, { payload }) => {
    const { messages } = payload
    const newMessages = messages.map(message => Map({
      id: message._id,
      address: message.address,
      date: message.date,
      text: message.body,
      isSpam: message.isSpam
    }))
    return state.update(
      'messages',
      messages => messages.push(...newMessages)
    )
  },
  [markAsSpamAction]: (state, { payload }) => state.updateIn([
    'messages',
    state.get('messages').findIndex(message => message.get('id') === payload.id)
  ], item => item.set('isSpam', true)),
  [unMarkAsSpamAction]: (state, { payload }) => state.updateIn([
    'messages',
    state.get('messages').findIndex(message => message.get('id') === payload.id)
  ], item => item.set('isSpam', false))
}, initialState)
