import * as ScreenOrientation from 'expo-screen-orientation';

export function lockPortrait() {
  return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export function unlockOrientation() {
  return ScreenOrientation.unlockAsync();
}
