import { Result } from '@scrabble-solver/types';
import classNames from 'classnames';
import { FormEvent, FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useMeasure } from 'react-use';

import { useIsTouchDevice, useMediaQuery } from 'hooks';
import {
  BOARD_TILE_SIZE_MAX,
  BOARD_TILE_SIZE_MIN,
  BORDER_WIDTH,
  COMPONENTS_SPACING,
  COMPONENTS_SPACING_MOBILE,
  DICTIONARY_HEIGHT,
  RACK_TILE_SIZE_MAX,
} from 'parameters';
import {
  resultsSlice,
  selectAreResultsOutdated,
  selectConfig,
  selectResultCandidate,
  selectSolveError,
  selectSortedFilteredResults,
  selectSortedResults,
  solveSlice,
  useTranslate,
  useTypedSelector,
} from 'state';

import Board from '../Board';
import Dictionary from '../Dictionary';
import DictionaryInput from '../DictionaryInput';
import Rack from '../Rack';
import ResultCandidatePicker from '../ResultCandidatePicker';
import Results from '../Results';
import Sizer from '../Sizer';
import Well from '../Well';

import { ApplyButton, EmptyState, SolveButton } from './components';
import styles from './SolverMobile.module.scss';

interface Props {
  className?: string;
  onShowResults: () => void;
}

// eslint-disable-next-line max-statements
const SolverMobile: FunctionComponent<Props> = ({ className, onShowResults }) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const isTouchDevice = useIsTouchDevice();
  const [sizerRef, { width: sizerWidth }] = useMeasure<HTMLDivElement>();
  const [resultsContainerRef, { height: resultsContainerHeight, width: resultsContainerWidth }] =
    useMeasure<HTMLDivElement>();
  const isMobile = useMediaQuery('<xl');
  const componentsSpacing = isMobile ? COMPONENTS_SPACING_MOBILE : COMPONENTS_SPACING;
  const width = sizerWidth - resultsContainerWidth - componentsSpacing;
  const config = useTypedSelector(selectConfig);
  const resultCandidate = useTypedSelector(selectResultCandidate);
  const isOutdated = useTypedSelector(selectAreResultsOutdated);
  const allResults = useTypedSelector(selectSortedResults);
  const error = useTypedSelector(selectSolveError);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
  const results = useTypedSelector(selectSortedFilteredResults)!;
  const [bestResult] = results || [];
  const cellSize = (width - (config.boardWidth + 1)) / config.boardWidth;
  const cellSizeSafe = Math.min(Math.max(cellSize, BOARD_TILE_SIZE_MIN), BOARD_TILE_SIZE_MAX);
  const tileSize = Math.min((width - 2 * BORDER_WIDTH) / config.maximumCharactersCount, RACK_TILE_SIZE_MAX);
  const maxControlsWidth = tileSize * config.maximumCharactersCount + 2 * BORDER_WIDTH;
  const showApplyButton = allResults && allResults.length > 0 && !isOutdated;

  const callbacks = useMemo(() => {
    if (isTouchDevice) {
      return {
        onClick: (result: Result) => {
          const isSelected = result === resultCandidate;

          if (isSelected) {
            dispatch(resultsSlice.actions.applyResult(result));
          } else {
            dispatch(resultsSlice.actions.changeResultCandidate(result));
          }
        },
      };
    }

    return {
      onBlur: () => {
        dispatch(resultsSlice.actions.changeResultCandidate(null));
      },

      onClick: (result: Result) => {
        dispatch(resultsSlice.actions.applyResult(result));
      },
      onFocus: (result: Result) => {
        dispatch(resultsSlice.actions.changeResultCandidate(result));
      },
      onMouseEnter: (result: Result) => {
        dispatch(resultsSlice.actions.changeResultCandidate(result));
      },
      onMouseLeave: () => {
        dispatch(resultsSlice.actions.changeResultCandidate(null));
      },
    };
  }, [dispatch, resultCandidate, isTouchDevice]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onShowResults();
    dispatch(solveSlice.actions.submit());
  };

  useEffect(() => {
    if (bestResult) {
      dispatch(resultsSlice.actions.changeResultCandidate(bestResult));
    }
  }, [bestResult, dispatch]);

  return (
    <div className={classNames(styles.solverMobile, className)}>
      <div className={styles.container}>
        <Sizer ref={sizerRef} />

        <div className={styles.content}>
          <form className={styles.boardContainer} onSubmit={handleSubmit}>
            <Board cellSize={cellSizeSafe} className={styles.board} />
            <input className={styles.submitInput} tabIndex={-1} type="submit" />
          </form>

          <div className={styles.column}>
            <Well className={styles.resultsContainer} ref={resultsContainerRef}>
              {resultsContainerWidth > 0 && resultsContainerHeight > 0 && (
                <Results callbacks={callbacks} height={resultsContainerHeight} width={resultsContainerWidth} />
              )}
            </Well>

            <Well>
              <div className={styles.dictionary} style={{ height: DICTIONARY_HEIGHT }}>
                <Dictionary className={styles.dictionaryOutput} />
                <DictionaryInput className={styles.dictionaryInput} />
              </div>
            </Well>
          </div>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.bottomContent}>
          <form className={styles.rackContainer} onSubmit={handleSubmit}>
            <Rack className={styles.rack} tileSize={tileSize} />
            <input className={styles.submitInput} tabIndex={-1} type="submit" />
          </form>

          <div className={styles.controls} style={{ maxWidth: maxControlsWidth }}>
            {typeof error !== 'undefined' && (
              <EmptyState variant="error" onClick={onShowResults}>
                {error.message}
              </EmptyState>
            )}

            {typeof error === 'undefined' && typeof results === 'undefined' && (
              <EmptyState variant="info" onClick={onShowResults}>
                {translate('results.empty-state.uninitialized')}
              </EmptyState>
            )}

            {typeof error === 'undefined' && typeof results !== 'undefined' && typeof allResults !== 'undefined' && (
              <>
                {isOutdated && (
                  <EmptyState variant="info" onClick={onShowResults}>
                    {translate('results.empty-state.outdated')}
                  </EmptyState>
                )}

                {!isOutdated && (
                  <>
                    {allResults.length === 0 && (
                      <EmptyState variant="warning" onClick={onShowResults}>
                        {translate('results.empty-state.no-results')}
                      </EmptyState>
                    )}

                    {allResults.length > 0 && resultCandidate && (
                      <ResultCandidatePicker className={styles.resultCandidatePicker} onClick={onShowResults} />
                    )}
                  </>
                )}
              </>
            )}

            {showApplyButton && <ApplyButton className={classNames(styles.submit, styles.apply)} />}
          </div>
        </div>
      </div>

      {!showApplyButton && <SolveButton className={styles.solve} onClick={onShowResults} />}
    </div>
  );
};

export default SolverMobile;
