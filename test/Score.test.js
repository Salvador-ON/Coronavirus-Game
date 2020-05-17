import Score from '../src/game/Score';



test('retrieve information of firestore to be true', () => {
  Score.initBase();
  expect((readScore()).empty).toBe(false);
});
