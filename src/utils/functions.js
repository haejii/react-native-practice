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
