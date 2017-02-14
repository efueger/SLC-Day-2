'use strict';

const jasmine = require('jasmine').expect;

const words = require('../wordCount/library.js').words;


describe('words()', function () {
  it('counts one word', function () {
    const expectedCounts = { word: 1 };
    expect(words('word')).toEqual(expectedCounts);
  });

  it('counts one of each', function () {
    const expectedCounts = { one: 1, of: 1, each: 1 };
    expect(words('one of each')).toEqual(expectedCounts);
  });

  it('counts multiple occurrences', function () {
    const expectedCounts = { one: 1, fish: 4, two: 1, red: 1, blue: 1 };
    expect(words('one fish two fish red fish blue fish')).toEqual(expectedCounts);
  });

  it('includes punctuation', function () {
    const expectedCounts = { car: 1, ':': 2, carpet: 1, as: 1, java: 1, 'javascript!!&@$%^&': 1 };
    expect(words('car : carpet as java : javascript!!&@$%^&')).toEqual(expectedCounts);
  });

  it('includes numbers', function () {
    const expectedCounts = { testing: 2, 1: 1, 2: 1 };
    expect(words('testing 1 2 testing')).toEqual(expectedCounts);
  });

  it('respects case', function () {
    const expectedCounts = { go: 1, Go: 1, GO: 1 };
    expect(words('go Go GO')).toEqual(expectedCounts);
  });

  it('counts properly international characters', function () {
    const expectedCounts = { '¡Hola!': 1, '¿Qué': 1, 'tal?': 1, 'Привет!': 1 };
    expect(words('¡Hola! ¿Qué tal? Привет!')).toEqual(expectedCounts);
  });

  it('counts multiline', function () {
    const expectedCounts = { hello: 1, world: 1 };
    expect(words('hello\nworld')).toEqual(expectedCounts);
  });

  it('counts tabs', function () {
    const expectedCounts = { hello: 1, world: 1 };
    expect(words('hello\tworld')).toEqual(expectedCounts);
  });

  it('counts multiple spaces as one', function () {
    const expectedCounts = { hello: 1, world: 1 };
    expect(words('hello  world')).toEqual(expectedCounts);
  });

  it('handles properties that exist on Object’s prototype', function () {
    const expectedCounts = { reserved: 1, words: 1, like: 1, prototype: 1, and: 1, toString: 1, 'ok?': 1 };
    expect(words('reserved words like prototype and toString ok?')).toEqual(expectedCounts);
  });
});
