import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {Agenda} from 'react-native-calendars';

import {useSelector, useDispatch} from 'react-redux';
import {fetchMemos} from '../actions';
import {BarStyle} from '../style/styles';
import {getFormattedDate} from '../utils/functions';

function AgendaScreen({navigation}) {
  const dispatch = useDispatch();

  const dialysisMemos = useSelector((state) => state.dialysisMemos);
  const kidneyType = useSelector((state) => state.user.kidneyType);

  useEffect(() => {
    console.log('1. useState', kidneyType);
    dispatch(fetchMemos(new Date(), kidneyType));
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() =>
          item.dialysisTypeId === 1
            ? navigation.navigate('UpdateMemo2', {item})
            : navigation.navigate('UpdateMemo', {item})
        }>
        {item.image ? (
          <Image
            source={{uri: item.image}}
            style={{
              width: '100%',
              height: 300,
            }}
          />
        ) : null}
        <Text style={{paddingVertical: 10}}>{item.name}</Text>
        {/* <Text>{JSON.stringify(item)}</Text> */}
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = (emptyDate) => {
    const formattedDate = getFormattedDate(emptyDate);

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

  const loadItems = (dateString) => {
    // console.log('dateString', dateString);
    dispatch(fetchMemos(dateString, kidneyType));
  };

  return (
    <>
      <View style={BarStyle.ViewContainer} />
      <Agenda
        theme={{
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        items={dialysisMemos}
        // loadItemsForMonth={({dateString}) => loadItems(dateString)}
        onDayPress={({dateString}) => loadItems(dateString)}
        selected={new Date()}
        renderItem={(item) => renderItem(item)}
        renderEmptyDate={(emptyDate) => renderEmptyDate(emptyDate)}
        rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}

        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        // onRefresh={() => {
        //   console.log('refreshing...');
        //   dispatch(fetchMemos(new Date()));
        // }}

        // Set this true while waiting for new data from a refresh
        // refreshing={true}

        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        // refreshControl={null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    justifyContent: 'center',
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

export default React.memo(AgendaScreen);
