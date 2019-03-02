const rl = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

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
			return 'function move';
		case 'REPORT':
			return 'function report';
		case 'LEFT':
			return 'function left';
		case 'RIGHT':
			return 'function right';
		default:
			return 'message error';
	}
};

module.exports = { matchPlace: matchPlace, mainLoop: mainLoop, getInput: getInput };
