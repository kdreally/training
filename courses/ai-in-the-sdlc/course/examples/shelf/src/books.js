export const books = [
  { id: "b1", title: "Plain Words", copies: 2 },
  { id: "b2", title: "The Shelf", copies: 1 },
];

export function findBook(id) {
  return books.find((book) => book.id === id) ?? null;
}
