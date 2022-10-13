import { EMPTY_CELL } from '@scrabble-solver/constants';
import {
  ChangeEventHandler,
  createRef,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  RefObject,
  useEffect,
  useMemo,
} from 'react';

import { getTileSizes, noop } from 'lib';

import TilePure from './TilePure';

interface Props {
  autoFocus?: boolean;
  character?: string;
  className?: string;
  disabled?: boolean;
  highlighted?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  isBlank?: boolean;
  placeholder?: string;
  points?: number;
  raised?: boolean;
  size: number;
  tabIndex?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
}

const Tile: FunctionComponent<Props> = ({
  autoFocus,
  className,
  character = '',
  disabled,
  highlighted,
  inputRef: ref,
  isBlank,
  placeholder,
  points,
  raised,
  size,
  tabIndex,
  onChange,
  onFocus = noop,
  onKeyDown = noop,
  onKeyUp,
}) => {
  const { pointsFontSize, tileFontSize, tileSize } = getTileSizes(size);
  const style = useMemo(() => ({ height: tileSize, width: tileSize }), [tileSize]);
  const inputStyle = useMemo(() => ({ fontSize: tileFontSize }), [tileFontSize]);
  const pointsStyle = useMemo(() => ({ fontSize: pointsFontSize }), [pointsFontSize]);
  const inputRef = useMemo<RefObject<HTMLInputElement>>(() => ref || createRef(), [ref]);
  const isEmpty = !character || character === EMPTY_CELL;
  const canShowPoints = (isBlank || !isEmpty) && typeof points !== 'undefined';

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    inputRef.current?.select();
    onKeyDown(event);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener(
        'keydown',
        () => {
          inputRef.current?.select();
        },
        {
          capture: true,
        },
      );
    }
  }, [inputRef]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  return (
    <TilePure
      autoFocus={autoFocus}
      canShowPoints={canShowPoints}
      character={character}
      className={className}
      disabled={disabled}
      highlighted={highlighted}
      inputRef={inputRef}
      inputStyle={inputStyle}
      isBlank={isBlank}
      placeholder={placeholder}
      points={points}
      pointsStyle={pointsStyle}
      raised={raised}
      style={style}
      tabIndex={tabIndex}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={onKeyUp}
    />
  );
};

export default Tile;
