import { isTerminal, getAvailableMoves } from './board';
import { BoardState } from './types';

/**
 *
 * @param state -> current board state
 * @param maximizing -> boolean
 * @param depth -> current depth of tree
 * @returns index of best move
 */

export const getBestMove = (
  state: BoardState,
  maximizing: boolean,
  depth = 0,
  maxDepth = -1
): number => {
  const memo: { [key: string]: string } = {};

  const getBestMoveRecursive = (
    state: BoardState,
    maximizing: boolean,
    depth = 0,
    maxDepth: number
  ): number => {
    // Base Case:
    const terminalObj = isTerminal(state);
    if (terminalObj || depth === maxDepth) {
      // we are at a terminal state
      if (terminalObj && terminalObj.winner === 'x') {
        return 100 - depth;
      } else if (terminalObj && terminalObj.winner === 'o') {
        return -100 + depth;
      } else {
        // draw
        return 0;
      }
    }

    // Recursive Case:
    if (maximizing) {
      // if maximizing that means its 'X's turn
      let best = Number.MIN_SAFE_INTEGER;
      getAvailableMoves(state).forEach(index => {
        const childNode: BoardState = [...state];
        childNode[index] = 'x';
        const childValue = getBestMoveRecursive(
          childNode,
          false,
          depth + 1,
          maxDepth
        );
        best = Math.max(best, childValue);
        if (depth === 0) {
          memo[childValue] = memo[childValue]
            ? `${memo[childValue]},${index}`
            : `${index}`;
        }
      });
      if (depth === 0) {
        const arr = memo[best].split(',');
        const rand = Math.floor(Math.random() * arr.length);
        return parseInt(arr[rand]);
      }
      return best;
    } else {
      let best = Number.MAX_SAFE_INTEGER;
      getAvailableMoves(state).forEach(index => {
        const childNode: BoardState = [...state];
        childNode[index] = 'o';
        const childValue = getBestMoveRecursive(
          childNode,
          true,
          depth + 1,
          maxDepth
        );
        best = Math.min(best, childValue);
        if (depth === 0) {
          memo[childValue] = memo[childValue]
            ? `${memo[childValue]},${index}`
            : `${index}`;
        }
      });

      if (depth === 0) {
        const arr = memo[best].split(',');
        const rand = Math.floor(Math.random() * arr.length);
        return parseInt(arr[rand]);
      }
      return best;
    }
  };

  return getBestMoveRecursive(state, maximizing, depth, maxDepth);
};
