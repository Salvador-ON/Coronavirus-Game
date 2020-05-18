import Score from '../src/game/Score';

const { mockFirebase } = require('firestore-jest-mock');
// Create a fake firestore with a `users` and `posts` collection
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


test('retrieve data in order first element should be Lisa', async() => {
  const firebase = require('firebase'); // or import firebase from 'firebase';
  window.db = firebase.firestore();

  const data = await Score.readScore();
  expect(data.docs[0].data().first).toBe('Lisa');
});

test('retrieve data in order first element should be 5', async() => {
  const firebase = require('firebase'); // or import firebase from 'firebase';
  window.db = firebase.firestore();

  const data = await Score.readScore();
  expect(data.docs[0].data().score).toBe(11);
});


test('retrieve data in order last element should be Homer', async() => {
  const firebase = require('firebase'); // or import firebase from 'firebase';
  window.db = firebase.firestore();

  const data = await Score.readScore();
  expect(data.docs[9].data().first).toBe('Homer');
});

test('retrieve data in order last element should be 2', async() => {
  const firebase = require('firebase'); // or import firebase from 'firebase';
  window.db = firebase.firestore();

  const data = await Score.readScore();
  expect(data.docs[9].data().score).toBe(2);
});


test('invalid eleven data score', async() => {
  const firebase = require('firebase'); // or import firebase from 'firebase';
  window.db = firebase.firestore();

  const data = await Score.readScore();
  expect(Object.keys(data.docs).length).toBe(10);
});








// function maybeGetUsersInState(state) {
//   const query = firestore.collection('users');

//   if (state) {
//     query = query.where('state', '==', state);
//   }

//   return query.get();
// }

// test('query with state', async () => {
//   await maybeGetUsersInState('Homer');

//   // Assert that we call the correct firestore methods
//   expect(mockCollection).toHaveBeenCalledWith('users');
//   expect(mockWhere).toHaveBeenCalledWith('name', '==', 'Homer');
// });

// test('no state', async () => {
//   await maybeGetUsersInState();

//   // Assert that we call the correct firestore methods
//   expect(mockCollection).toHaveBeenCalledWith('users');
//   expect(mockWhere).not.toHaveBeenCalled();
// });
