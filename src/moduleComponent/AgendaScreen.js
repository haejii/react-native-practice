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
import moment from 'moment';

import no_user from '../../assets/image/no_user.png';
import {SERVER_PATH} from '../service/apis';

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
      items: {},
    };
  }
  render() {
    return (
      <Agenda
        theme={{
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        // onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        // refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        // refreshControl={null}
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
        // renderDay={(day, item) => <Text>{day ? day.day : 'item'}</Text>}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    const {year, month} = day;
    const yearMonth = month < 10 ? `${year}-0${month}` : `${year}-${month}`;
    console.log(yearMonth);

    Array(moment(yearMonth).daysInMonth())
      .fill()
      .forEach((_, i) => {
        if (i + 1 < 10) {
          this.state.items[`${yearMonth}-0${i + 1}`] = [];
        } else {
          this.state.items[`${yearMonth}-${i + 1}`] = [];
        }
      });

    fetch(SERVER_PATH + '/hemodialysis-memo?date=' + day.dateString, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.route.params.userToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const {isSuccess, hemodialysisMemos} = res;

        if (isSuccess) {
          hemodialysisMemos.forEach((hemodialysisMemo) => {
            const {dialysisId, recordDate, memo, photo} = hemodialysisMemo;
            const date = new Date(recordDate);
            const formattedDate = `${date.getFullYear()}-0${
              date.getMonth() + 1
            }-${date.getDate()}`;

            this.state.items[formattedDate] = [];
            this.state.items[formattedDate].push({
              dialysisId,
              name: memo,
              image: photo,
            });
          });

          setTimeout(() => {
            // for (let i = -15; i < 85; i++) {
            //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            //   const strTime = this.timeToString(time);
            //   if (!this.state.items[strTime]) {
            //     this.state.items[strTime] = [];
            //     // const numItems = Math.floor(Math.random() * 3 + 1);

            //     hemodialysisMemos.forEach((hemodialysisMemo) => {
            //       const {
            //         dialysisId,
            //         recordDate,
            //         memo,
            //         photo,
            //       } = hemodialysisMemo;
            //       const date = new Date(recordDate);

            //       if (
            //         strTime ===
            //         `${date.getFullYear()}-0${
            //           date.getMonth() + 1
            //         }-${date.getDate()}`
            //       ) {
            //         this.state.items[strTime].push({
            //           dialysisId,
            //           name: memo,
            //           // height: Math.max(50, Math.floor(Math.random() * 150)),
            //           height: 200,
            //           image: photo,
            //         });
            //       }
            //     });

            //     // const date = new Date();
            //     // for (let j = 0; j < 1; j++) {
            //     //   if (
            //     //     strTime ==
            //     //     `${date.getFullYear()}-${
            //     //       date.getMonth() + 1
            //     //     }-${date.getDate()}`
            //     //   ) {
            //     //     this.state.items[strTime].push({
            //     //       name: 'Item for ' + strTime + ' #' + j,
            //     //       // height: Math.max(50, Math.floor(Math.random() * 150)),
            //     //       height: 200,
            //     //       image: Image.resolveAssetSource(no_user).uri,
            //     //     });
            //     //   }
            //     // }
            //   }
            // }

            // console.log(
            //   Object.keys(this.state.items)[0],
            //   Object.keys(this.state.items).length,
            // );

            const newItems = {};
            Object.keys(this.state.items).forEach((key) => {
              newItems[key] = this.state.items[key];
            });

            this.setState({
              items: newItems,
            });
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
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
            width: '100%',
            height: 300,
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
