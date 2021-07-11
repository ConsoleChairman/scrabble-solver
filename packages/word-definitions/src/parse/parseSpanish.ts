import cheerio from 'cheerio';

import { ParseResult } from '../types';

const parseSpanish = (html: string): ParseResult => {
  const $ = cheerio.load(html);
  $('.verdBold14 + .gris11 + .gris13').remove();
  $('font[class^="verd"]').remove();
  $('font.gris11').remove();
  $('font[class^="grisBold"]').remove();
  $('font[class^="grisItalic"]').remove();

  Array.from($('.gris13')).forEach((element) => {
    const children = $(element).find('.gris13');

    if (children && children.length > 0) {
      children.remove();
    }
  });

  const definitions = Array.from($('.dcom-search-result .gris13'));

  return {
    definitions: definitions
      .map((definition) => $(definition).text().trim())
      .filter(Boolean)
      .map((definition) => definition.replace(/\s+\.$/g, ''))
      .map((definition) => (definition.endsWith('.') ? definition : `${definition}.`)),
    isAllowed: definitions.length > 0,
  };
};

export default parseSpanish;
