import { Game, Locale } from '@scrabble-solver/types';

import { guessLocale } from 'lib';
import { AutoGroupTiles, InputMode } from 'types';

import localStorage from '../localStorage';

export interface SettingsState {
  autoGroupTiles: AutoGroupTiles;
  game: Game;
  inputMode: InputMode;
  locale: Locale;
}

const localStorageAutoGroupTiles = localStorage.getAutoGroupTiles();
const isTouchScreen = typeof globalThis.matchMedia !== 'undefined' && globalThis.matchMedia('(hover: none)').matches;

const settingsInitialState: SettingsState = {
  autoGroupTiles: typeof localStorageAutoGroupTiles === 'undefined' ? 'left' : localStorageAutoGroupTiles,
  game: localStorage.getGame() || Game.Scrabble,
  inputMode: localStorage.getInputMode() || (isTouchScreen ? 'touchscreen' : 'keyboard'),
  locale: localStorage.getLocale() || guessLocale(),
};

export default settingsInitialState;
