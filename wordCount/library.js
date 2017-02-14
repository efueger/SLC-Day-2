'use strict';

module.exports = {
  words(sentences) {
    sentences = sentences.split(/[\s\n\t\r]+/g).sort();

    let current = null;
    let count = 0;
    const json = {};

    for (let index = 0; index < sentences.length; index += 1) {
      if (sentences[index] !== current) {
        current = sentences[index];
        count = 1;
      } else {
        count += 1;
        json[sentences[index]] = count;
      }

      json[sentences[index]] = count;
    }
    return json;
  },
};
