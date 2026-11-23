// The server and web builds do not have a device orientation to lock.
export function lockPortrait() {
  return Promise.resolve();
}

export function unlockOrientation() {
  return Promise.resolve();
}
