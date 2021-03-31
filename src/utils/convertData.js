export function convertUserData(user) {
  console.log('convertUserData', user);
  const {refreshToken, uid, photoURL, displayName} = user;
  return [refreshToken, {uid, photoURL, displayName, type: 'firebase'}];
}

export function convertMealTimeEnglishToKorean(englishWord) {
  const words = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식',
  };

  return words[englishWord];
}
