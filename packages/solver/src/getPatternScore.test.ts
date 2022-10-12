import { literaki } from '@scrabble-solver/configs';
import { Board, Cell, HorizontalPattern, Locale, Pattern, Tile, VerticalPattern } from '@scrabble-solver/types';

import getPatternScore from './getPatternScore';

const config = literaki[Locale.PL_PL];
const board = Board.fromStringArray([
  ' kasom         ',
  '     i         ',
  '     napiją    ',
  '  w  i         ',
  ' krabim        ',
  '  z            ',
  '  ę  eh        ',
  'f s srać       ',
  'i z t       s  ',
  'knebel      e  ',
  'a  ew     warcz',
  'ł  żyło  wody  ',
  'o     pecyj chu',
  '            y  ',
  '            t  ',
]);

describe('getPatternScore', () => {
  it('gives proper score without collisions', () => {
    const pattern = new Pattern({
      board,
      cells: [
        new Cell({ x: 0, y: 0, tile: new Tile({ character: 'ź' }), isEmpty: true }),
        new Cell({ x: 1, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 2, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 3, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 4, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 5, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 6, y: 0, tile: new Tile({ character: 'a' }), isEmpty: true }),
        new Cell({ x: 7, y: 0, tile: new Tile({ character: 'ź' }), isEmpty: false }),
      ],
    });
    const score = getPatternScore(config, pattern);
    expect(score).toBe(128);
  });

  it('gives proper score with collisions', () => {
    const pattern = new VerticalPattern({
      board,
      cells: [
        new Cell({ x: 2, y: 11, tile: new Tile({ character: 'l' }), isEmpty: true }),
        new Cell({ x: 2, y: 12, tile: new Tile({ character: 'i' }), isEmpty: true }),
        new Cell({ x: 2, y: 13, tile: new Tile({ character: 'n' }), isEmpty: true }),
        new Cell({ x: 2, y: 14, tile: new Tile({ character: 'o' }), isEmpty: true }),
      ],
    });
    const score = getPatternScore(config, pattern);
    expect(score).toBe(44);
  });

  it('gives proper score for blank', () => {
    const pattern = new HorizontalPattern({
      board,
      cells: [
        new Cell({ x: 13, y: 14, tile: new Tile({ character: 'o', isBlank: true }), isEmpty: true }),
        new Cell({ x: 12, y: 14, tile: new Tile({ character: 't' }), isEmpty: false }),
      ],
    });
    const score = getPatternScore(config, pattern);
    expect(score).toBe(2);
  });
});
