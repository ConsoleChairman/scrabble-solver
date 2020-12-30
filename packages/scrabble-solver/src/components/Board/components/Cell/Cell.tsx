import { EMPTY_CELL } from '@scrabble-solver/constants';
import { Cell as CellModel } from '@scrabble-solver/models';
import classNames from 'classnames';
import React, { forwardRef, KeyboardEventHandler, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createKeyboardNavigation } from 'lib';
import { board, selectBonus, selectCharacterPoints, selectConfig, solve, useTypedSelector } from 'state';

import Tile from '../../../Tile';

import styles from './Cell.module.scss';
import { getBonusClassname, getCharacterPointsClassname } from './lib';

interface Props {
  cell: CellModel;
  className?: string;
  size: number;
  onFocus: (x: number, y: number) => void;
  onKeyDown: KeyboardEventHandler;
  onMoveFocus: () => void;
}

interface Ref {
  focus: () => void;
}

const Cell = forwardRef<Ref, Props>(({ cell, className, size, onFocus, onKeyDown, onMoveFocus }, ref) => {
  const dispatch = useDispatch();
  const config = useTypedSelector(selectConfig);
  const bonus = useTypedSelector((state) => selectBonus(state, cell));
  const characterPoints = useTypedSelector((state) => selectCharacterPoints(state, cell));
  const handleFocus = useCallback(() => onFocus(cell.x, cell.y), [cell.x, cell.y, onFocus]);
  const handleKeyDown = useMemo(
    () =>
      createKeyboardNavigation({
        onDelete: () => dispatch(board.actions.changeCellValue({ value: EMPTY_CELL, x: cell.x, y: cell.y })),
        onBackspace: () => dispatch(board.actions.changeCellValue({ value: EMPTY_CELL, x: cell.x, y: cell.y })),
        onEnter: () => dispatch(solve.actions.submit()),
        onKeyDown: (event) => {
          const character = event.key;
          const isTogglingBlank = (event.ctrlKey || event.metaKey) && character === 'b'; // TODO: consider using is-hotkey

          if (isTogglingBlank) {
            dispatch(board.actions.toggleCellIsBlank({ x: cell.x, y: cell.y }));
          } else if (config.hasCharacter(character)) {
            dispatch(board.actions.changeCellValue({ value: character, x: cell.x, y: cell.y }));
            onMoveFocus();
          }

          onKeyDown(event);
        },
      }),
    [cell.x, cell.y, config, dispatch, onKeyDown, onMoveFocus],
  );
  const { tileFontSize } = Tile.getSizes(size);

  return (
    <div
      className={classNames(
        styles.cell,
        getBonusClassname(cell, bonus),
        getCharacterPointsClassname(characterPoints),
        className,
        {
          [styles.candidate]: cell.isCandidate(),
        },
      )}
      style={{
        fontSize: tileFontSize,
      }}
    >
      <Tile
        className={styles.tile}
        character={cell.tile.character === EMPTY_CELL ? undefined : cell.tile.character}
        highlighted={cell.isCandidate()}
        isBlank={cell.tile.isBlank}
        raised={cell.tile.character !== EMPTY_CELL}
        ref={ref}
        size={size}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

export default Cell;
