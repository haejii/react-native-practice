import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';

import {logout} from '../actions';
import styles from '../style/styles';
import SplashScreen from './SplashScreen';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  async function handlePressSignOut() {
    dispatch(logout());
  }

  useEffect(() => {
    database()
      .ref('/users/123')
      .once('value')
      .then((snapshot) => {
        if (!snapshot) {
        } else {
          console.log(snapshot);
        }
      });
  }, [user]);

  if (!user) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Text>Signed in! {user.displayName}</Text>
      <Button title="Sign out" onPress={() => handlePressSignOut()} />
      {user ? <Text>Welcome {user.email}</Text> : <></>}
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}

function CommunityContainer() {
  return (
    <View>
      <Text>CommunityContainer</Text>
    </View>
  );
}

function SearchContainer() {
  return (
    <View>
      <Text>SearchContainer</Text>
    </View>
  );
}

function ContentContainer() {
  return (
    <View>
      <Text>ContentContainer</Text>
    </View>
  );
}

function MypageContainer() {
  return (
    <View>
      <Text>MypageContainer</Text>
    </View>
  );
}

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === '홈') {
            return (
              <Icon
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '커뮤니티') {
            return (
              <Icon
                name={focused ? 'ios-reader' : 'ios-reader-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '검색') {
            return (
              <Icon
                name={focused ? 'ios-search' : 'ios-search-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '컨텐츠') {
            return (
              <Icon
                name={focused ? 'ios-book' : 'ios-book-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === '마이페이지') {
            return (
              <Icon
                name={
                  focused ? 'ios-person-circle' : 'ios-person-circle-outline'
                }
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'teal', // tomato
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityContainer} />
      <Tab.Screen name="검색" component={SearchContainer} />
      <Tab.Screen name="컨텐츠" component={ContentContainer} />
      <Tab.Screen name="마이페이지" component={MypageContainer} />
    </Tab.Navigator>
  );
}
