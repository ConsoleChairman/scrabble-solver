import { BLANK } from '@scrabble-solver/constants';
import { CellJson, Config } from '@scrabble-solver/types';

const isCellValid = (cell: CellJson, config: Config): boolean => {
  const { isEmpty, tile, x, y } = cell;

  if (x < 0 || x >= config.boardWidth) {
    return false;
  }

  if (y < 0 || y >= config.boardHeight) {
    return false;
  }

  if (isEmpty && tile !== null) {
    return false;
  }

  if (tile !== null && !config.hasCharacter(tile.character) && tile.character !== BLANK) {
    return false;
  }

  return true;
};

export default isCellValid;
