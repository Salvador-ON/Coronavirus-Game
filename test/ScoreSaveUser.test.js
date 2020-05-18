import Score from '../src/game/Score';

const { mockFirebase } = require('firestore-jest-mock');

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


test('submit score Harry-1', async() => {
  const firebase = require('firebase');
  window.db = firebase.firestore();
  
  const data = await Score.saveUser('Harry', 1);
  expect(data).toBe('data submited: Harry-1');
});

test('submit score Peter-2', async() => {
  const firebase = require('firebase');
  window.db = firebase.firestore();
  
  const data = await Score.saveUser('Peter', 2);
  expect(data).not.toBe('data submited: Harry-1');
});