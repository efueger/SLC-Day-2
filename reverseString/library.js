'use strict';

function doReverse(sentence) {
  const result = [];
  for (let i = 0; i < sentence.length; i += 1) {
    result.unshift(sentence[i]);
  }
  return result.join('');
}
module.exports = {
  reverseString(text) {
    if (!(text)) {
      return null;
    } else if (doReverse(text) === text) {
      return true;
    }

    return doReverse(text);
  },
};
