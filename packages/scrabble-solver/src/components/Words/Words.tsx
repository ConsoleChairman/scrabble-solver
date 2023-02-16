import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { Check, Cross } from 'icons';
import { selectLocale, selectVerify, useTranslate, useTypedSelector } from 'state';

import Badge from '../Badge';
import Modal from '../Modal';

import styles from './Words.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Words: FunctionComponent<Props> = ({ className, isOpen, onClose }) => {
  const translate = useTranslate();
  const locale = useTypedSelector(selectLocale);
  const { invalidWords, validWords } = useTypedSelector(selectVerify);

  return (
    <Modal className={className} isOpen={isOpen} title={translate('words')} onClose={onClose}>
      <Modal.Section
        title={
          <span className={styles.title}>
            <span>{translate('words.invalid')}</span>
            <Badge className={styles.badge}>{invalidWords.length.toLocaleString(locale)}</Badge>
          </span>
        }
      >
        {invalidWords.map((word, index) => (
          <div className={styles.word} key={index}>
            <Cross className={classNames(styles.icon, styles.invalid)} /> {word}
          </div>
        ))}
      </Modal.Section>

      <Modal.Section
        title={
          <span className={styles.title}>
            <span>{translate('words.valid')}</span>
            <Badge className={styles.badge}>{validWords.length.toLocaleString(locale)}</Badge>
          </span>
        }
      >
        {validWords.map((word, index) => (
          <div className={styles.word} key={index}>
            <Check className={classNames(styles.icon, styles.valid)} /> {word}
          </div>
        ))}
      </Modal.Section>
    </Modal>
  );
};

export default Words;
