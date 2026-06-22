/**
 * The Library content module. Public surface for the rest of the app — import
 * everything from `@/lib/readings`.
 *
 * Structure:
 *   types.ts          — Reading, Book, Block, BookSpine, signal/shelf types
 *   parse.ts          — parseBody / readTimeOf (the body-markup grammar)
 *   rank.ts           — rankBooks (shelf curation)
 *   registry.ts       — aggregates every book module into BOOKS + READINGS
 *   books/<id>.ts     — one file per book: its `book` meta + its `readings`
 *
 * To add a book: create books/<id>.ts (export `book` and `readings`) and list it
 * in registry.ts. To add a page: add a Reading to that book's `readings` and its
 * id to the book's `chapters`.
 */
export * from './types';
export { parseBody, readTimeOf } from './parse';
export { rankBooks } from './rank';
export { READINGS, BOOKS, getReading, getBook } from './registry';
