import React from 'react'
import { List, Content } from 'native-base'

export default class MessagesList extends React.PureComponent {

  render() {
    const { children } = this.props;

    return (
      <Content scrollEnabled={true}>
        <List>
          {children}
        </List>
      </Content>
    );
  }
}
