const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

//----------------output binding-------------------//

const messageStart = `\n----To start place Pacman on the board with command PLACE X,Y,F: X and Y have values between 0 and 5, F can be NORTH EAST SOUTH WEST -----  \n`;

const messageInstruction = `\n---Enter: \n MOVE to make pacman advance \n LEFT and RIGHT to make him rotate \n REPORT to know where he is \n EXIT to leave \n\n----------------\n`;

const messageValuesError = '\nwrong values entered, try again or enter EXIT to leave\n';
//----------------------------------------------------------------

// const to replace state array index
const X = 0;
const Y = 1;
const FACING = 2;
//----------------------------------------------------------------

// main CLI loop

let state = null;
const mainLoop = input => {
	let newState = getInput(input, state);
	let msg;
	if (newState === null) {
		msg = messageStart;
	} else if (typeof newState === 'string') {
		msg = newState;
	} else {
		msg = messageInstruction;
		state = newState;
	}
	rl.question(msg, mainLoop);
};

rl.question(messageStart, mainLoop);

// it matches the input with the regex to validate the string, if true set a newState array
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

// it channels the user's input, giving back errors if not valid inputs are sent
const getInput = (input, state) => {
	const matched = matchPlace(input);
	if (matched) {
		return matched;
	}
	if (state === null) {
		return messageValuesError;
	}
	switch (input) {
		case 'MOVE':
			return move(state);
		case 'REPORT':
			return report(state);
		case 'LEFT':
			return left(state);
		case 'RIGHT':
			return right(state);
		default:
			return messageValuesError;
	}
};

//output actual pacman postition
const report = state => {
	return `(${state[X]},${state[Y]}) facing ${state[FACING]} \n`;
};

//it moves pacman of one unit in towards the state facing direction, it will not go beyond 5 and below 0, but will not raise an error if it tempts to.
const move = state => {
	switch (state[FACING]) {
		case 'NORTH':
			state[Y] < 5 ? state[Y]++ : state[Y];
			break;
		case 'SOUTH':
			state[Y] < 5 ? state[Y]-- : state[Y];
			break;
		case 'EAST':
			state[X] < 5 ? state[X]++ : state[X];
			break;
		case 'WEST':
			state[X] < 5 ? state[X]-- : state[X];
			break;
		default:
			messageValuesError;
			break;
	}
	return state;
};

// rotate pacman facing rotation 90 deg left, without changing position
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

// rotate pacman facing rotation 90 deg right, without changing position
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
