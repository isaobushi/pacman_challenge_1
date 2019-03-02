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

// const getInput = (input, state) => {
// 	const matched = matchPlace(input);
// 	if (matched) {
// 		return matched;
// 	}

// 	if (state === null) {
// 		return 'message error';
// 	}

// 	switch (input) {
// 		case 'MOVE':
// 			return move(state);
// 		case 'REPORT':
// 			return 'function report';
// 		case 'LEFT':
// 			return 'function left';
// 		case 'RIGHT':
// 			return 'function right';
// 		default:
// 			return 'message error';
// 	}
// };

const move = state => {
	switch (state[FACING]) {
		case 'NORTH':
			console.log('in south');
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

module.exports = functions = { matchPlace, move };
