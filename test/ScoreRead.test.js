import Score from '../src/game/Score';

const { mockFirebase } = require('firestore-jest-mock'); // eslint-disable-line import/no-unresolved

mockFirebase({
  database: {
    users: [
      { score: 11, first: 'Lisa' },
      { score: 3, first: 'Marge' },
      { score: 4, first: 'Bart' },
      { score: 5, first: 'Milhouse' },
      { score: 10, first: 'Nelson' },
      { score: 6, first: 'Moe' },
      { score: 7, first: 'Jerry' },
      { score: 8, first: 'Fred' },
      { score: 9, first: 'Eddie' },
      { score: 2, first: 'Homer' },
    ],
  },
});

const firebase = require('firebase'); // eslint-disable-line import/no-unresolved
// eslint-disable-line global-require
window.db = firebase.firestore();


test('retrieve data in order first element should be Lisa', async () => {
  const data = await Score.readScore();
  expect(data.docs[0].data().first).toBe('Lisa');
});

test('retrieve data in order first element should be 5', async () => {
  const data = await Score.readScore();
  expect(data.docs[0].data().score).toBe(11);
});


test('retrieve data in order last element should be Homer', async () => {
  const data = await Score.readScore();
  expect(data.docs[9].data().first).toBe('Homer');
});

test('retrieve data in order last element should be 2', async () => {
  const data = await Score.readScore();
  expect(data.docs[9].data().score).toBe(2);
});


test('retrive 10 scores data', async () => {
  const data = await Score.readScore();
  expect(Object.keys(data.docs).length).toBe(10);
});
