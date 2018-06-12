import React from 'react'
import { List, Content, Button, Icon, Text } from 'native-base'
import { ListView } from 'react-native';
import Message from './Message';

export default class MessagesList extends React.PureComponent {

  constructor (props) {
    super(props)

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  render () {
    const { dataSource, ...otherProps } = this.props;

    return (
        <List
          dataSource={this.ds.cloneWithRows(dataSource)}
          renderRow={data => <Message {...data} />}
          leftOpenValue={90}
          rightOpenValue={-75}
          renderLeftHiddenRow={data =>
            <Button title="hello" full warning onPress={() => data.onSpam(data.id)}>
              <Icon active name="warning"/>
              <Text>Spam</Text>
            </Button>}
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={() => data.onUnSpam(data.id)}>
              <Icon active name="trash" />
            </Button>}
          {...otherProps}
        />
    );
  }
}
