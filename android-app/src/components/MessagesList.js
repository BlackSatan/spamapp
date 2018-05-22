import React from 'react'
import { List } from 'native-base'

export default class MessagesList extends React.PureComponent {

  render() {
    const { children } = this.props;

    return (
      <List>
        {children}
      </List>
    );
  }
}
