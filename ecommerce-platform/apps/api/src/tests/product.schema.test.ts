import assert from "node:assert/strict";
import test from "node:test";

import { createProductSchema, updateProductSchema } from "../modules/products/product.schema";

const validProduct = {
  name: "T-Shirt",
  slug: "t-shirt",
  description: "A plain t-shirt",
  price: 19.99,
  categoryId: "cat-1",
  brandId: "brand-1",
};

test("createProductSchema accepts a valid product", () => {
  const result = createProductSchema.safeParse(validProduct);
  assert.equal(result.success, true);
});

test("createProductSchema rejects a non-positive price", () => {
  const result = createProductSchema.safeParse({ ...validProduct, price: 0 });
  assert.equal(result.success, false);
});

test("createProductSchema rejects a malformed slug", () => {
  const result = createProductSchema.safeParse({ ...validProduct, slug: "Not A Slug!" });
  assert.equal(result.success, false);
});

test("updateProductSchema allows a partial payload", () => {
  const result = updateProductSchema.safeParse({ price: 24.99, isActive: false });
  assert.equal(result.success, true);
});
