export const checkDevice = {
  isAndroid: /android/i.test(navigator.userAgent),
  isWindows: /windows/i.test(navigator.userAgent),
  isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
};
