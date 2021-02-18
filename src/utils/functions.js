const koreanMealTimes = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
  snack: '간식',
};

export function convertMealTime(mealTime) {
  return koreanMealTimes[mealTime];
}
