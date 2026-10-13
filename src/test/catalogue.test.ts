import { describe, it, expect } from "vitest";
import { products, filterProducts, basketTotal, money } from "@/lib/catalogue";
describe("Showcase catalogue", () => {
  it("contains at least 10 products as requested", () =>
    expect(products.length).toBeGreaterThanOrEqual(10));
  it("finds a BMW suspension kit by search", () =>
    expect(filterProducts("BMW").map((p) => p.id)).toEqual(["VAS-100169"]));
  it("filters vehicle fitment by make and model", () =>
    expect(filterProducts("", "All categories", "Renault", "Kwid").map((p) => p.id)).toEqual([
      "VAS-100990",
    ]));
  it("adds concrete product quantities to the basket total", () =>
    expect(basketTotal({ "VAS-100009": 2, "VAS-100169": 1 })).toBe(8172.33));
  it('formats Rand amounts consistently regardless of server locale',()=>{
    expect(money(3982.33)).toBe('R 3,982.33');
    expect(money(0)).toBe('R 0.00');
  });
  it('excludes a BMW X5 kit outside its listed year range',()=>{
    expect(filterProducts('', 'All categories', 'BMW', 'X5', '2025')).toHaveLength(0);
    expect(filterProducts('', 'All categories', 'BMW', 'X5', '2010').map(p=>p.id)).toEqual(['VAS-100169']);
  });
});
