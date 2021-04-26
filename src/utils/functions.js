import {Platform} from 'react-native';

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
  const data = new FormData();

  data.append('image', {
    name: image.fileName,
    type: image.type,
    uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
  });
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

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
