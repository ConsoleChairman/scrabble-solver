import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';

import { useTranslate } from 'state';

import PlainTiles from '../PlainTiles';

import styles from './Loading.module.scss';

interface Props {
  children?: never;
  className?: string;
  wave?: boolean;
}

const prepareContent = (message: string): string[][] => {
  const uppercased = message.toLocaleUpperCase();
  const parts = uppercased.split(' ');
  return [parts];
};

const Loading: FunctionComponent<Props> = ({ className, wave = true }) => {
  const translate = useTranslate();
  const content = useMemo(() => prepareContent(translate('common.loading')), [translate]);

  return (
    <div className={classNames(styles.loading, className)}>
      <div className={styles.dim} />
      <div className={styles.logo}>
        <PlainTiles className={classNames(styles.tiles)} content={content} dropShadow wave={wave} />
      </div>
    </div>
  );
};

export default Loading;
