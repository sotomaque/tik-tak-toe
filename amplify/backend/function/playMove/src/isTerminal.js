const isTerminal = state => {
  if (isBoardEmpty(state)) return false;
  // winningLines => all possible indecies that lead to a winning game
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < winningLines.length; index++) {
    const current = winningLines[index];
    const [cell1, cell2, cell3] = current;
    if (
      state[cell1] &&
      state[cell1] === state[cell2] &&
      state[cell1] === state[cell3]
    ) {
      const result = {
        winner: state[cell1], // either X or O
      };
      if (index < 3) {
        result.direction = 'H';
        result.row = index === 0 ? 1 : index === 1 ? 2 : 3;
      } else if (index >= 3 && index <= 5) {
        result.direction = 'V';
        result.column = index === 3 ? 1 : index === 4 ? 2 : 3;
      } else if (index > 5) {
        result.direction = 'D';
        result.diagonal = index === 6 ? 'MAIN' : 'COUNTER';
      }
      return result;
    }
  }

  if (isBoardFull(state)) {
    return {
      winner: null,
    };
  }

  return false;
};

const isBoardEmpty = state => {
  return state.every(cell => cell === null);
};

const isBoardFull = state => {
  return state.every(cell => cell);
};

module.exports = isTerminal;
