const matchPlace = require('./pacman');

test('expect to fail if returns null', () => {
	expect(matchPlace.matchPlace('PLACE 1,2,SOUTH')).not.toBe(null);
});

test('expect to fail if string does not match', () => {
	expect(matchPlace.matchPlace('PLACE 1,2,SOUTH')).toHaveLength(3);
});
