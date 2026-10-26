import { findBook } from "./books.js";

const loans = [];

export function activeLoans() {
  return loans.filter((loan) => loan.returned === false);
}

export function borrow(bookId, borrower) {
  const book = findBook(bookId);
  if (!book) {
    return { ok: false, error: "unknown-book" };
  }
  if (!borrower || borrower.trim() === "") {
    return { ok: false, error: "borrower-required" };
  }
  const out = activeLoans().filter((loan) => loan.bookId === bookId).length;
  if (out >= book.copies) {
    return { ok: false, error: "no-copies" };
  }
  const loan = { bookId, borrower: borrower.trim(), returned: false };
  loans.push(loan);
  return { ok: true, loan };
}

export function returnLoan(bookId, borrower) {
  const loan = activeLoans().find(
    (item) => item.bookId === bookId && item.borrower === borrower,
  );
  if (!loan) {
    return { ok: false, error: "no-active-loan" };
  }
  loan.returned = true;
  return { ok: true, loan };
}

export function resetLoans() {
  loans.length = 0;
}
