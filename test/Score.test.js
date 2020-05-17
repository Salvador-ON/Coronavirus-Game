import Score from '../src/game/Score';



test('retrieve information of firestore to be true', () => {
  Score.initBase();

  async function retrieveScore() {
    const data = await Score.readScore();
  }

  expect((retrieveScore).empty).toBe(false);
});
