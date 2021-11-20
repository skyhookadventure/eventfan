import { mockProductsSearched } from "../../../../../mocks/ecommerce";
import productsSearched from "../productsSearched";

it("creates parameters matching the snapshot", () => {
  const res = productsSearched(mockProductsSearched);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "Search",
      "properties": Object {
        "search_term": "Query string",
      },
    }
  `);
});
