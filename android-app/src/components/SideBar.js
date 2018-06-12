import React from 'react'
import { Container, Content, Text, List, ListItem, Title, Left, Icon, Body } from 'native-base'
const routes = ['Inbox', 'Spam']
const icons = { Inbox: 'ios-mail', Spam: 'warning' };
const colors = { Inbox: '#fbadb5', Spam: '#c0c0c0' };

export default class SideBar extends React.Component {
  render () {
    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Content>
          <Title>Spam App</Title>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  icon
                  onPress={() => this.props.onSelect(data)}>
                  <Left>
                    <Icon name={icons[data]} style={{ color: colors[data] }} />
                  </Left>
                  <Body>
                    <Text>{data}</Text>
                  </Body>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}
