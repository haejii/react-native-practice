export function convertUserData(user) {
  console.log('convertUserData', user);
  const {refreshToken, uid, photoURL, displayName} = user;
  return [refreshToken, {uid, photoURL, displayName, type: 'firebase'}];
}
