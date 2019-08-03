import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { changeLocale, Message } from 'i18n';
import { hideSplash } from 'splash/state';

import Credits from './credits';
import styles from './locale.module.scss';

const Locale = ({ className, definitions, dictionary, FlagComponent, locale, onChange }) => (
  <div className={classNames(styles.locale, className)}>
    <FlagComponent className={styles.flag} onClick={onChange} />

    <span className={styles.explanation}>
      <Message id="modules.splash.explanation" locale={locale} />
    </span>

    <div className={styles.credits}>
      <Credits locale={locale} messageId="modules.splash.dictionary" name={dictionary.name} url={dictionary.url} />

      <Credits locale={locale} messageId="modules.splash.definitions" name={definitions.name} url={definitions.url} />
    </div>
  </div>
);

Locale.propTypes = {
  className: PropTypes.string,
  definitions: PropTypes.object.isRequired,
  dictionary: PropTypes.object.isRequired,
  FlagComponent: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, { locale }) => ({
  onChange: () => {
    dispatch(changeLocale(locale));
    dispatch(hideSplash());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Locale);
