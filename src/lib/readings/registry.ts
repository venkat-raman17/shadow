import type { Book, Reading } from './types';

import * as foundations from './books/foundations';
import * as others from './books/others';
import * as steady from './books/steady';
import * as shame from './books/shame';
import * as figures from './books/figures';
import * as living_it from './books/living-it';
import * as going_deeper from './books/going-deeper';
import * as inner_cast from './books/inner-cast';
import * as dreams_alchemy from './books/dreams-alchemy';
import * as everyday_shadow from './books/everyday-shadow';
import * as family_relationships from './books/family-relationships';
import * as second_half from './books/second-half';
import * as ways_of_working from './books/ways-of-working';
import * as persona_and_world from './books/persona-and-world';
import * as feelings_one_by_one from './books/feelings-one-by-one';
import * as the_body from './books/the-body';
import * as spirit_and_meaning from './books/spirit-and-meaning';
import * as thresholds_change from './books/thresholds-change';
import * as belonging_loneliness from './books/belonging-loneliness';
import * as using from './books/using';

/** Every book module, in shelf order. Add a new book file and list it here. */
const MODULES = [
  foundations,
  others,
  steady,
  shame,
  figures,
  living_it,
  going_deeper,
  inner_cast,
  dreams_alchemy,
  everyday_shadow,
  family_relationships,
  second_half,
  ways_of_working,
  persona_and_world,
  feelings_one_by_one,
  the_body,
  spirit_and_meaning,
  thresholds_change,
  belonging_loneliness,
  using,
] as const;

/** Flat list of all books, in shelf order. */
export const BOOKS: Book[] = MODULES.map((m) => m.book);

/** Flat list of every chapter across all books. */
export const READINGS: Reading[] = MODULES.flatMap((m) => m.readings);

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}

export function getBook(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
