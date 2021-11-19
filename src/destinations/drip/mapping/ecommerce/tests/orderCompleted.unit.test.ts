import { mockOrderCompleted } from "../../../../../mocks/index";
import orderCompleted from "../orderCompleted";

it("creates parameters matching the snapshot", () => {
  const res = orderCompleted(mockOrderCompleted);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "Order Completed",
      "properties": Object {
        "value": 20000,
      },
    }
  `);
});
