import Logic from '../src/game/Logic';


test('validate true if name greatter than 3 and lower than 11', () => {
  expect(Logic.validateData('salvador'.length)).toBe(true);
});

test('validate false if name lower than 3 ', () => {
  expect(Logic.validateData('sa'.length)).toBe(false);
});

test('validate false if name greatter than 11 ', () => {
  expect(Logic.validateData('salvadorsal'.length)).toBe(false);
});

test('expect to capitalize name if first char is not a number', () => {
  expect(Logic.capitalize('salvador')).toBe('Salvador');
});

test('not capitalize if first char is a number', () => {
  expect(Logic.capitalize('1salvador')).toBe('1salvador');
});

test('expect window.virusCollected to be 1', () => {
  window.virusCollected = 0;
  Logic.collectVirus();
  expect(window.virusCollected).toBe(1);
});

test('expect window.robotHealth to be 3', () => {
  window.robotHealth = 5;
  Logic.robotHealthSubs(2);
  expect(window.robotHealth).toBe(3);
});


test('expect window.robotHealth to be 0 with negative substraction', () => {
  window.robotHealth = 3;
  Logic.robotHealthSubs(5);
  expect(window.robotHealth).toBe(0);
});


test('expect true if virus health is 0', () => {
  const virusHealth = 0;
  expect(Logic.defeatVirus(virusHealth)).toBe(true);
});

test('expect false if virus health is 5', () => {
  const virusHealth = 5;
  expect(Logic.defeatVirus(virusHealth)).toBe(false);
});

test('expect gameOver true if window.robotHealth is 0', () => {
  window.robotHealth = 0;
  Logic.gameOver();
  expect(Logic.gameOver()).toBe(true);
});


test('expect gameOver false if window.robotHealth is 5', () => {
  window.robotHealth = 5;
  Logic.gameOver();
  expect(Logic.gameOver()).toBe(false);
});


test('expect window.robotHealth to be 6 with sumRobotHealth', () => {
  window.robotHealth = 3;
  Logic.sumRobotHealth();
  expect(window.robotHealth).toBe(6);
});
