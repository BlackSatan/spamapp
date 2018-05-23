import { createSelector } from 'reselect';

const selectSms = state => state.sms

const makeSelectMessages = () => createSelector(
  selectSms,
  state => state.get('messages')
)

export const makeSelectSpamMessages = () => createSelector(
  makeSelectMessages(),
  messages => messages.filter(message => message.get('isSpam'))
)

export const makeSelectGoodMessages = () => createSelector(
  makeSelectMessages(),
  messages => messages.filter(message => !message.get('isSpam'))
)

export const makeSelectMessageById = (id) => createSelector(
  makeSelectMessages(),
  messages => messages.find(message => message.get('id') == id)
)
