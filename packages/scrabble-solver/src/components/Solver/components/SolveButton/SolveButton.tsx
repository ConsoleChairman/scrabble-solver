import classNames from 'classnames';
import { FunctionComponent, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

import { Search } from 'icons';
import { noop } from 'lib';
import {
  selectAreResultsOutdated,
  selectIsLoading,
  selectRack,
  solveSlice,
  useTranslate,
  useTypedSelector,
} from 'state';

import Button from '../../../Button';

import styles from './SolveButton.module.scss';

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
}

const SolveButton: FunctionComponent<Props> = ({ className, onClick = noop }) => {
  const dispatch = useDispatch();
  const translate = useTranslate();
  const isLoading = useTypedSelector(selectIsLoading);
  const isOutdated = useTypedSelector(selectAreResultsOutdated);
  const rack = useTypedSelector(selectRack);
  const hasTiles = rack.some((tile) => tile !== null);

  const handleClick: MouseEventHandler = (event) => {
    dispatch(solveSlice.actions.submit());
    onClick(event);
  };

  return (
    <Button
      aria-label={translate('results.solve')}
      className={classNames(styles.solveButton, className)}
      disabled={isLoading || !isOutdated || !hasTiles}
      Icon={Search}
      iconClassName={styles.icon}
      tooltip={translate('results.solve')}
      type="submit"
      variant="primary"
      onClick={handleClick}
    />
  );
};

export default SolveButton;
