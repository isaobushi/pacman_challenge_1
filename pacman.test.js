const functions = require('./pacman');

test('expect to fail if returns null', () => {
	expect(functions.matchPlace('PLACE 1,2,SOUTH')).not.toBe(null);
});

test('expect to fail if string does not match', () => {
	expect(functions.matchPlace('PLACE 1,2,SOUTH')).toHaveLength(3);
});

test.skip('expect to increase state.y plus 1', () => {
	const X = 0;
	const Y = 1;
	const FACING = 2;
	let state = [2, 2, 'NORTH'];
	expect(functions.move(state)).toBe(3);
});

test.skip('expect to increase state.x plus 1', () => {
	const X = 0;
	const Y = 1;
	const FACING = 2;
	let state = [2, 2, 'EAST'];
	expect(functions.move(state)).toBe(3);
});

test('expect to raise error if state.facing is wrong', () => {
	const X = 0;
	const Y = 1;
	const FACING = 2;
	let state = [2, 2, 'WRONG'];
	expect(functions.move(state)).toEqual(expect.stringContaining('message error'));
});
