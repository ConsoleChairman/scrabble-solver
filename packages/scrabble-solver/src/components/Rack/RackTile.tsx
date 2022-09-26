import { BLANK } from '@scrabble-solver/constants';
import { Tile as TileModel } from '@scrabble-solver/types';
import {
  FunctionComponent,
  KeyboardEventHandler,
  MutableRefObject,
  RefObject,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';

import { createKeyboardNavigation, isCtrl } from 'lib';
import { TILE_SIZE } from 'parameters';
import { rackSlice, selectCharacterPoints, selectConfig, useTranslate, useTypedSelector } from 'state';

import Tile from '../Tile';

import styles from './Rack.module.scss';

interface Props {
  activeIndexRef: MutableRefObject<number | undefined>;
  character: string | null;
  index: number;
  inputRef: RefObject<HTMLInputElement>;
  tile: TileModel | null;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const RackTile: FunctionComponent<Props> = ({ activeIndexRef, character, index, inputRef, tile, onKeyDown }) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const config = useTypedSelector(selectConfig);
  const points = useTypedSelector((state) => selectCharacterPoints(state, character));

  const handleFocus = useCallback(() => {
    activeIndexRef.current = index;
  }, [index]);

  const handleCharacterChange = useCallback(
    (value: string | null) => {
      dispatch(rackSlice.actions.changeCharacter({ character: value, index }));
    },
    [index],
  );

  const handleKeyDown = useMemo(() => {
    return createKeyboardNavigation({
      onBackspace: () => handleCharacterChange(null),
      onDelete: () => handleCharacterChange(null),
      onKeyDown: (event) => {
        const newCharacter = event.key.toLowerCase();
        const twoCharacterTile = config.getTwoCharacterTileByPrefix(newCharacter);

        if (isCtrl(event) && twoCharacterTile) {
          event.preventDefault();
          handleCharacterChange(twoCharacterTile);
        } else if (config.hasCharacter(newCharacter) || newCharacter === BLANK) {
          handleCharacterChange(newCharacter);
        }

        onKeyDown(event);
      },
    });
  }, [config, handleCharacterChange, onKeyDown]);

  return (
    <Tile
      autoFocus={index === 0}
      className={styles.tile}
      character={character === null ? undefined : character}
      highlighted={tile !== null}
      inputRef={inputRef}
      isBlank={character === BLANK}
      key={index}
      placeholder={translate('rack.placeholder')[index]}
      points={points}
      raised
      size={TILE_SIZE}
      tabIndex={index === 0 ? undefined : -1}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    />
  );
};

export default RackTile;
