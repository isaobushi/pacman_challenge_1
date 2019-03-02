const functions = require('./pacman');

test('expect to return null', () => {
	expect(functions.matchPlace('PLACE 1,2,SOUTH')).not.toBe(null);
});

test('expect to return exact length 3', () => {
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

test('expect to log state', () => {
	const X = 0;
	const Y = 1;
	const FACING = 2;
	let state = [2, 2, 'NORTH'];
	expect(functions.report(state)).toEqual(expect.stringContaining('(2,2) facing NORTH \n'));
});
