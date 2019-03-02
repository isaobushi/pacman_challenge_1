const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const X = 0;
const Y = 1;
const FACING = 2;

let state = null;
const mainLoop = input => {
	let newState = getInput(input, state);
	let msg;
	if (newState === null) {
		msg = 'welcome';
	} else if (typeof newState === 'string') {
		msg = newState;
	} else {
		msg = 'instruction';
		state = newState;
	}
	rl.question(msg, mainLoop);
};

rl.question('welcome', mainLoop);

const matchPlace = input => {
	let regex = /PLACE ([0-9]),([0-9]),(NORTH|EAST|SOUTH|WEST)/i;
	let match = input.match(regex);
	if (match) {
		(x = Number(match[1])), (y = Number(match[2]));
		facing = match[3].toUpperCase();
		return [x, y, facing];
	}
	return null;
};

const getInput = (input, state) => {
	const matched = matchPlace(input);
	if (matched) {
		return matched;
	}

	if (state === null) {
		return 'message error';
	}

	switch (input) {
		case 'MOVE':
			return move(state);
		case 'REPORT':
			return report(state);
		case 'LEFT':
			return left(status);
		case 'RIGHT':
			return right(status);
		default:
			return 'message error';
	}
};

//output actual pacman postition
const report = state => {
	return `(${state[X]},${state[Y]}) facing ${state[FACING]} \n`;
};

const move = state => {
	switch (state[FACING]) {
		case 'NORTH':
			return state[Y] < 5 ? state[Y]++ : state[Y];
		case 'SOUTH':
			return state[Y] < 5 ? state[Y]-- : state[Y];
		case 'EAST':
			state[X] < 5 ? state[X]++ : state[X];
			return state[X];
		case 'WEST':
			return state[X] < 5 ? state[X]-- : state[X];
		default:
			return 'message error';
	}
};

// rotate pacman facing rotation 90 deg left
const left = state => {
	assoc = {
		NORTH: 'WEST',
		EAST: 'NORTH',
		SOUTH: 'EAST',
		WEST: 'SOUTH',
	};

	if (Object.keys(assoc).indexOf(state[FACING]) > -1) {
		state[FACING] = assoc[state[FACING]];
	}
	return state;
};

// rotate pacman facing rotation 90 deg right
const right = state => {
	assoc = {
		NORTH: 'EAST',
		EAST: 'SOUTH',
		SOUTH: 'WEST',
		WEST: 'NORTH',
	};

	if (Object.keys(assoc).indexOf(state[FACING]) > -1) {
		state[FACING] = assoc[state[FACING]];
	}
	return state;
};

module.exports = functions = { matchPlace, move, report, left, right };
