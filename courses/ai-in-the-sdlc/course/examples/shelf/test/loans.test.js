import { test } from "node:test";
import assert from "node:assert/strict";
import { borrow, returnLoan, activeLoans, resetLoans } from "../src/loans.js";

test("borrow records an active loan", () => {
  resetLoans();
  const result = borrow("b1", "Asha");
  assert.equal(result.ok, true);
  assert.deepEqual(activeLoans(), [
    { bookId: "b1", borrower: "Asha", returned: false },
  ]);
});

test("borrow rejects an unknown book", () => {
  resetLoans();
  assert.deepEqual(borrow("nope", "Asha"), { ok: false, error: "unknown-book" });
});

test("borrow rejects a blank borrower", () => {
  resetLoans();
  assert.deepEqual(borrow("b1", "  "), { ok: false, error: "borrower-required" });
});

test("borrow rejects a loan when no copies remain", () => {
  resetLoans();
  assert.equal(borrow("b2", "Asha").ok, true);
  assert.deepEqual(borrow("b2", "Ben"), { ok: false, error: "no-copies" });
});

test("returnLoan removes the loan from the active list", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.equal(returnLoan("b1", "Asha").ok, true);
  assert.deepEqual(activeLoans(), []);
});

test("returnLoan rejects an unknown active loan", () => {
  resetLoans();
  assert.deepEqual(returnLoan("b1", "Asha"), {
    ok: false,
    error: "no-active-loan",
  });
});
