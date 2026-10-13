import { ArrowUpRight, Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { money, type Product } from "@/lib/catalogue";

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
}) {
  return (
    <article className="product-card">
      {product.badge && (
        <span className={`product-badge ${product.badge === "BEST SELLER" ? "hot" : ""}`}>
          {product.badge}
        </span>
      )}
      <div
        className="product-open"
        role="button"
        tabIndex={0}
        aria-label={`View ${product.name}`}
        onClick={() => onOpen(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(product);
          }
        }}
      >
        <img className="product-photo" src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name product-open" onClick={() => onOpen(product)}>
          {product.name}
        </h3>
        <span className="product-stock">
          <Check size={12} /> Showcase item <ArrowUpRight size={10} />
        </span>
        <div className="product-bottom">
          <span className="product-price">{money(product.price)}</span>
          <Button
            size="icon"
            className="add-button"
            title="Add to basket"
            aria-label={`Add ${product.name} to basket`}
            onClick={() => onAdd(product)}
          >
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </article>
  );
}
