import brakes from "@/assets/brakepartsforbrowsebycat.jpg.asset.json";
import suspension from "@/assets/suspensionandsteering.jpg.asset.json";
import tools from "@/assets/macht-85-piece-cantilever-toolbox-tk85pc-1.jpg.asset.json";
import golf from "@/assets/suskitgolf5.jpg.asset.json";
import bmw from "@/assets/frontsuspensionkitbmwx5.jpg.asset.json";
import oils from "@/assets/oils.png.asset.json";
import batteries from "@/assets/batteries.png.asset.json";
import accessories from "@/assets/accessories.jpg.asset.json";
import care from "@/assets/car-care.png.asset.json";
import electrical from "@/assets/electrical.png.asset.json";
import mats from "@/assets/car-mats.jpg.asset.json";
import jump from "@/assets/jump-starters.png.asset.json";
import kiger from "@/assets/renault-kiger.png.asset.json";
import audiB8 from "@/assets/audi-a4-b8.jpg.asset.json";
import kwid from "@/assets/renault-kwid.jpg.asset.json";
import hyundai from "@/assets/hyundai-i20.jpg.asset.json";
import audiB6 from "@/assets/audi-a4-b6.jpg.asset.json";
import touran from "@/assets/vw-touran.jpg.asset.json";
import chery from "@/assets/chery-tiggo.png.asset.json";
import toyota from "@/assets/toyota-starlet.jpg.asset.json";

export const categories = [
  { name: "Brake Parts", image: brakes.url },
  { name: "Suspension & Steering", image: suspension.url },
  { name: "Oils & Fluids", image: oils.url },
  { name: "Car Batteries", image: batteries.url },
  { name: "Automotive & DIY Tools", image: tools.url },
  { name: "Car Accessories", image: accessories.url },
  { name: "Car Care & Additives", image: care.url },
  { name: "Custom DNA Car Mats", image: mats.url },
  { name: "Jump Starters & Chargers", image: jump.url },
  { name: "Starter & Alternator Components", image: electrical.url },
];

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}
const suspensionCategory = "Suspension & Steering";
export const products: Product[] = [
  {
    id: "VAS-100009",
    name: "VW Golf 5 / 6 & Audi A3 8P Front Suspension Kit",
    brand: "Volkswagen / Audi",
    model: "Golf / A3",
    price: 2095,
    image: golf.url,
    category: suspensionCategory,
    badge: "POPULAR",
  },
  {
    id: "VAS-100169",
    name: "BMW X5 E70 & X6 E71 Front Suspension Kit",
    brand: "BMW",
    model: "X5 / X6",
    price: 3982.33,
    image: bmw.url,
    category: suspensionCategory,
    badge: "BEST SELLER",
  },
  {
    id: "VAS-101000",
    name: "Renault Kiger & Triber 1.0 Front Suspension Kit",
    brand: "Renault",
    model: "Kiger / Triber",
    price: 2187.64,
    image: kiger.url,
    category: suspensionCategory,
    badge: "NEW ARRIVAL",
  },
  {
    id: "VAS-100049",
    name: "Audi A4 B8 / B9 Front Suspension Kit",
    brand: "Audi",
    model: "A4",
    price: 13898.92,
    image: audiB8.url,
    category: suspensionCategory,
  },
  {
    id: "VAS-100990",
    name: "Renault Kwid B4D Front Suspension Kit",
    brand: "Renault",
    model: "Kwid",
    price: 9479,
    image: kwid.url,
    category: suspensionCategory,
  },
  {
    id: "VAS-100971",
    name: "Hyundai i20 PB Front Suspension Kit",
    brand: "Hyundai",
    model: "i20",
    price: 2395,
    image: hyundai.url,
    category: suspensionCategory,
  },
  {
    id: "VAS-100051",
    name: "Audi A4 B6 / B7 Front Suspension Kit",
    brand: "Audi",
    model: "A4",
    price: 3498,
    image: audiB6.url,
    category: suspensionCategory,
  },
  {
    id: "VAS-100012",
    name: "VW Golf / Jetta / Touran Front Suspension Kit",
    brand: "Volkswagen",
    model: "Golf / Jetta / Touran",
    price: 8989,
    image: touran.url,
    category: suspensionCategory,
  },
  {
    id: "VAS-101001",
    name: "Chery Tiggo 4 Pro 1.5 Front Suspension Kit",
    brand: "Chery",
    model: "Tiggo",
    price: 1782.96,
    image: chery.url,
    category: suspensionCategory,
    badge: "NEW ARRIVAL",
  },
  {
    id: "VAS-100991",
    name: "Toyota Starlet & Suzuki Baleno Front Suspension Kit",
    brand: "Toyota / Suzuki",
    model: "Starlet / Baleno",
    price: 3030,
    image: toyota.url,
    category: suspensionCategory,
  },
];
// Explicit separators keep prices identical across browser and edge ICU locales.
export const money = (value: number) => {
  const [whole, fraction] = value.toFixed(2).split('.');
  return `R ${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${fraction}`;
};
const fitmentYears: Record<string, [number, number]> = {
  "VAS-100009": [2003, 2015],
  "VAS-100169": [2006, 2014],
  "VAS-101000": [2020, 2026],
  "VAS-100049": [2008, 2026],
  "VAS-100990": [2016, 2026],
  "VAS-100971": [2008, 2015],
  "VAS-100051": [2000, 2009],
  "VAS-100012": [2003, 2015],
  "VAS-101001": [2021, 2026],
  "VAS-100991": [2020, 2026],
};
export function filterProducts(
  query: string,
  category = "All categories",
  make = "",
  model = "",
  year = "",
) {
  const term = query.trim().toLowerCase();
  return products.filter((p) => {
    const years = fitmentYears[p.id];
    return (
      (!term || `${p.name} ${p.id} ${p.brand}`.toLowerCase().includes(term)) &&
      (category === "All categories" || p.category === category) &&
      (!make || p.brand.includes(make)) &&
      (!model || p.model.includes(model)) &&
      (!year || !years || (Number(year) >= years[0] && Number(year) <= years[1]))
    );
  });
}
export function basketTotal(basket: Record<string, number>) {
  return products.reduce((total, p) => total + p.price * (basket[p.id] ?? 0), 0);
}
