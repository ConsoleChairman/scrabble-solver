import { Locale } from '@scrabble-solver/types';

import { normalizeDefinition, unique } from '../lib';
import { ParseResult } from '../types';

import parseEnglish from './parseEnglish';
import parseFrench from './parseFrench';
import parseGerman from './parseGerman';
import parsePolish from './parsePolish';
import parseSpanish from './parseSpanish';

const parsePerLocale: Record<Locale, (html: string) => ParseResult> = {
  [Locale.DE_DE]: parseGerman,
  [Locale.EN_GB]: parseEnglish,
  [Locale.EN_US]: parseEnglish,
  [Locale.ES_ES]: parseSpanish,
  [Locale.FR_FR]: parseFrench,
  [Locale.PL_PL]: parsePolish,
};

const parse = (locale: Locale, html: string): ParseResult => {
  const { definitions, exists } = parsePerLocale[locale](html);

  return {
    definitions: unique(definitions.map(normalizeDefinition).filter(Boolean)),
    exists,
  };
};

export default parse;
