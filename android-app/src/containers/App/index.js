import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Container, Drawer, View, Header, Left, Body, Right, Title, Icon, Button } from 'native-base'
import { loadMessages, markAsSpam, unMarkAsSpam } from '../../reducers/sms/smsActions'
import { makeSelectGoodMessages, makeSelectSpamMessages } from '../../reducers/sms/smsSelectors'
import SideBar from '../../components/SideBar'
import MessagesList from '../../components/MessagesList'

class App extends React.PureComponent {

  constructor (props) {
    super(props)

    this.state = {
      smsListenerId: null,
      name: 'Inbox'
    }
  }

  componentDidMount () {
    const { doLoadMessages } = this.props

    doLoadMessages()
    const smsListenerId = setInterval(() => doLoadMessages(), 3000)
    this.setState({ smsListenerId })
  }

  componentWillUnmount () {
    const { smsListenerId } = this.props

    smsListenerId && clearInterval(smsListenerId)
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  onSelect = (name) => {
    this.setState({ name })
    this.closeDrawer()
  }

  render () {
    const { goodMessages, spamMessages, onSpam, onUnSpam } = this.props
    const { name } = this.state
    const messages = name === 'Spam' ? spamMessages : goodMessages

    return (
      <Drawer
        ref={(ref) => { this.drawer = ref }}
        content={<SideBar onSelect={name => this.onSelect(name)} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          <View style={{flex: 1}}>
            <Header style={{ backgroundColor: '#FF71A2' }}>
              <Left>
                <Button title="Menu" transparent onPress={() => this.openDrawer()}>
                  <Icon name="menu" color="#82002e" />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: '#82002e', fontWeight: '600' }}>{name}</Title>
              </Body>
              <Right />
            </Header>
            <MessagesList
              dataSource={messages.map(message => ({
                ...message.toJS(),
                onSpam,
                onUnSpam
              })).toJS()}
            />
          </View>
        </Container>
     </Drawer>
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
