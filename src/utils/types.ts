type Cell = 'x' | 'o' | null;

type BoardState = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

// available indecies for our moves
type Moves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type BoardResult = {
  winner: Cell;
  direction?: 'V' | 'H' | 'D'; // veritical / horizontal / diagonal
  column?: 1 | 2 | 3;
  row?: 1 | 2 | 3;
  diagonal?: 'MAIN' | 'COUNTER'; // main -> from top left to bottom right; counter is backwards
};

export { BoardResult, BoardState, Cell, Moves };
