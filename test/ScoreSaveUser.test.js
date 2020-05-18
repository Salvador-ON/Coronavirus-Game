import Score from '../src/game/Score';

const { mockFirebase } = require('firestore-jest-mock'); // eslint-disable-line import/no-unresolved

mockFirebase({
  database: {
    users: [
      { score: 11, first: 'Lisa' },
      { score: 3, first: 'Marge' },
      { score: 4, first: 'Bart' },
      { score: 5, first: 'Milhouse' },
    ],
  },
});

const firebase = require('firebase'); // eslint-disable-line import/no-unresolved
// eslint-disable-line global-require
window.db = firebase.firestore();


test('submit score Harry-1', async () => {
  const data = await Score.saveUser('Harry', 1);
  expect(data).toBe('data submited: Harry-1');
});

test('submit score Peter-2', async () => {
  const data = await Score.saveUser('Peter', 2);
  expect(data).not.toBe('data submited: Harry-1');
});