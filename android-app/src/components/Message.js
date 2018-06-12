import React from 'react'
import { ListItem, Text, Body, Right, Picker } from 'native-base'
import Moment from 'moment'

export default class Message extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'key0'
    }
  }

  onValueChange (value: string) {
    const { onSpam, onUnSpam, id } = this.props

    if (value === 'key2') {
      onSpam(id)
    } else if (value === 'key1') {
      onUnSpam(id)
    }
    this.setState({ selected: value })
  }

  render () {
    const { address, text, date, isSpam } = this.props;

    return (
      <ListItem avatar>
        <Body>
          <Text>{address}</Text>
          <Text note>{text}</Text>
        </Body>
        <Right>
          <Text style={{ fontSize: 11 }} note>{Moment(date).format('MM/DD h:mm')}</Text>
          {/*<Picker*/}
            {/*mode="dropdown"*/}
            {/*selectedValue={this.state.selected}*/}
            {/*style={{ width: 150 }}*/}
            {/*onValueChange={this.onValueChange.bind(this)}*/}
          {/*>*/}
            {/*<Picker.Item label="Action" value="key0" />*/}
            {/*{isSpam ? <Picker.Item label="Remove from spam" value="key1"/>*/}
              {/*: <Picker.Item label="Mark as spam" value="key2"/>*/}
            {/*}*/}
          {/*</Picker>*/}
        </Right>
      </ListItem>
    )
  }
}
