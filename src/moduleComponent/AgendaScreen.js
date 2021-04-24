import React, {useState, useEffect} from 'react';
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

import {SERVER_PATH} from '../service/apis';

export default function AgendaScreen({
  navigation,
  route: {
    params: {userToken},
  },
}) {
  const [items, setItems] = useState({});
  async function fetchMemos(dateValue) {
    const response = await fetch(
      SERVER_PATH + '/hemodialysis-memo?date=' + dateValue,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken,
        },
      },
    );
    const result = await response.json();
    return result;
  }

  const loadItems = async (selectedDate) => {
    const {year, month} = selectedDate;
    const yearMonth = month < 10 ? `${year}-0${month}` : `${year}-${month}`;

    let tempItems = {};

    Array(moment(yearMonth).daysInMonth())
      .fill()
      .forEach((_, i) => {
        if (i + 1 < 10) {
          tempItems[`${yearMonth}-0${i + 1}`] = [];
        } else {
          tempItems[`${yearMonth}-${i + 1}`] = [];
        }
      });

    const {isSuccess, hemodialysisMemos} = await fetchMemos(yearMonth);

    if (isSuccess) {
      hemodialysisMemos.forEach((hemodialysisMemo) => {
        const {dialysisId, recordDate, memo, photo} = hemodialysisMemo;
        const recordedDate = new Date(recordDate);
        const formattedDate = `${recordedDate.getFullYear()}-0${
          recordedDate.getMonth() + 1
        }-${recordedDate.getDate()}`;

        tempItems[formattedDate] = [
          {
            dialysisId,
            name: memo,
            image: photo,
          },
        ];
      });

      setTimeout(() => {
        const newItems = {};
        Object.keys(tempItems).forEach((key) => {
          newItems[key] = tempItems[key];
        });

        setItems(newItems);
      }, 1000);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
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
  };

  const renderEmptyDate = (emptyDate) => {
    const formattedDate = `${emptyDate.getFullYear()}-${
      emptyDate.getMonth() + 1
    }-${emptyDate.getDate()}`;

    const handlePressInputMemo = () => {
      navigation.navigate('InputMemo', {date: formattedDate});
    };

    return (
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
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <Agenda
      theme={{
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue',
      }}
      items={items}
      loadItemsForMonth={(selectedDate) => loadItems(selectedDate)}
      selected={new Date()}
      renderItem={(item) => renderItem(item)}
      renderEmptyDate={(emptyDate) => renderEmptyDate(emptyDate)}
      rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}
      // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
      // onRefresh={() => console.log('refreshing...')}

      // Set this true while waiting for new data from a refresh
      // refreshing={false}

      // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
      // refreshControl={null}
    />
  );
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
