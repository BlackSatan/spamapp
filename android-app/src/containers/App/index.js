import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Tab, Tabs, View } from 'native-base'
import Message from '../../components/Message'
import { loadMessages, markAsSpam, unMarkAsSpam } from '../../reducers/sms/smsActions'
import { makeSelectGoodMessages, makeSelectSpamMessages } from '../../reducers/sms/smsSelectors'
import MessagesList from '../../components/MessagesList'

class App extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      smsListenerId: null
    }
  }

  componentDidMount () {
    const { doLoadMessages } = this.props

    doLoadMessages()
    const smsListenerId = setInterval(() => doLoadMessages(), 3000)
    this.setState({ smsListenerId })
  }

  componentWillUnmount() {
    const { smsListenerId } = this.props

    smsListenerId && clearInterval(smsListenerId)
  }

  render () {
    const { goodMessages, spamMessages, onSpam, onUnSpam } = this.props

    return (
      <Container>
        <View style={{flex: 1}}>
          <Tabs>
            <Tab heading="Inbox">
              <MessagesList>
                {goodMessages.map(message => <Message
                  {...message.toJS()}
                  key={message.get('id')}
                  onSpam={onSpam}
                />).toJS()}
              </MessagesList>
            </Tab>
            <Tab heading="Spam">
              <MessagesList>
                {spamMessages.map(message => <Message
                  {...message.toJS()}
                  key={message.get('id')}
                  onUnSpam={onUnSpam}
                />).toJS()}
              </MessagesList>
            </Tab>
          </Tabs>
        </View>
      </Container>
    )
  }
}

export default connect(createStructuredSelector({
  goodMessages: makeSelectGoodMessages(),
  spamMessages: makeSelectSpamMessages()
}), dispatch => ({
  doLoadMessages () {
    dispatch(loadMessages())
  },
  onSpam (id) {
    dispatch(markAsSpam({ id }))
  },
  onUnSpam (id) {
    dispatch(unMarkAsSpam({ id }))
  }
}))(App)
