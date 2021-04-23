import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Agenda} from 'react-native-calendars';

import no_user from '../../assets/image/no_user.png';

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {
        // '2012-05-22': [
        //   {
        //     name: 'item 1 - any js object',
        //     image: Image.resolveAssetSource(no_user).uri,
        //   },
        // ],
        // '2012-05-23': [{name: 'item 2 - any js object'}],
        // '2012-05-24': [],
        // '2012-05-25': [
        //   {name: 'item 3 - any js object'},
        //   {name: 'any js object'},
        // ],
      },
    };
  }

  render() {
    return (
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    fetch('https://google.com').then((res) => console.log(res));

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);

          const date = new Date();

          for (let j = 0; j < 1; j++) {
            if (
              strTime ==
              `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            ) {
              this.state.items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                // height: Math.max(50, Math.floor(Math.random() * 150)),
                height: 200,
                image: Image.resolveAssetSource(no_user).uri,
              });
            }
          }
        }
      }

      const newItems = {};
      Object.keys(this.state.items).forEach((key) => {
        newItems[key] = this.state.items[key];
      });

      this.setState({
        items: newItems,
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        // style={[styles.item, {height: item.height}]}
        style={[styles.item]}
        onPress={() => Alert.alert(item.name)}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate(date) {
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const handlePressInputMemo = () => {
      this.props.navigation.navigate('InputMemo', {date: formattedDate});
    };

    return (
      // <View style={styles.emptyDate}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => handlePressInputMemo()}
          style={{
            backgroundColor: 'skyblue',
            flex: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            클릭해서 투석일지 혹은 메모를 남겨주세요!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
