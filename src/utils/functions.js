import {Platform} from 'react-native';
import {cos} from 'react-native-reanimated';

const koreanMealTimes = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식',
};

export const getTwoDigits = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};

export function convertMealTime(mealTime) {
  return koreanMealTimes[mealTime];
}

export function createImageFormData(image, body) {
  console.log(image);
  const data = new FormData();

  data.append('image', {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
  });

  const array = new FormData();

  Object.keys(body).forEach((key) => {
    // if (key === 'dialysis') {
    //   Object.keys(body[key]).forEach((key) => {
    //     array.append(key, body['dialysis'][key]);
    //   });

    //   var arr = '';
    //   Object.keys(array).forEach((d) => {
    //     let i = 0;
    //     while (i < 11) {
    //       arr += `${array[d][i][1]}, `;
    //       i++;
    //     }
    //   });
    //   data.append('dialysis', arr);
    // } else {

    data.append(key, JSON.stringify(body[key]));
    // }
  });

  console.log(data);
  return data;
}
export function getFormattedDate(date) {
  let dateObject;
  if (typeof date === 'object') {
    dateObject = date;
  } else {
    dateObject = new Date(date);
  }

  const formattedDate = `${dateObject.getFullYear()}-${
    dateObject.getMonth() + 1 < 10
      ? `0${dateObject.getMonth() + 1}`
      : dateObject.getMonth() + 1
  }-${
    dateObject.getDate() < 10
      ? `0${dateObject.getDate()}`
      : dateObject.getDate()
  }`;

  return formattedDate;
}
