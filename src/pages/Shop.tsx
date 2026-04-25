import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Picture } from "@/components/Picture";
import shopHero from "@/assets/shop-hero.jpg?w=640;1024;1280&format=avif;webp;jpg&as=picture";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubscribe = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    const items = useCartStore.getState().items;
    const alreadyInCart = items.some(i => i.variantId === variant.id);
    if (alreadyInCart) {
      toast.info("Already in your cart!", { description: "Open the cart to review or checkout." });
      return;
    }
    const sellingPlanId = product.node.sellingPlanGroups?.edges?.[0]?.node?.sellingPlans?.edges?.[0]?.node?.id;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
      sellingPlanId,
    });
    toast.success("Added to cart!", { description: "Open the cart to checkout." });
  };

  return (
    <div>
      {/* Shop Hero */}
      <section className="relative min-h-[45vh] flex items-center">
        <div className="absolute inset-0">
          <Picture
            data={shopHero}
            alt="Fresh produce market"
            className="w-full h-full object-cover"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 py-28 pt-36 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-background mb-4">Shop</h1>
          <p className="text-lg text-background max-w-2xl mx-auto">
            Fresh, affordable, healthy produce delivered to your door. Your purchase supports fresh food access for Columbus families.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No products yet</h2>
              <p className="text-muted-foreground">Products are coming soon!</p>
            </div>
          ) : (
            <div className="flex justify-center max-w-lg mx-auto">
              {products.map((product) => {
                const price = product.node.priceRange.minVariantPrice;
                const image = product.node.images.edges[0]?.node;
                return (
                  <div key={product.node.id} className="rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow group">
                    <Link to={`/product/${product.node.handle}`}>
                      {image ? (
                        <div className="overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-72 bg-secondary flex items-center justify-center">
                          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </Link>
                    <div className="p-8">
                      <Link to={`/product/${product.node.handle}`}>
                        <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{product.node.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">{product.node.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-extrabold text-primary">
                            ${parseFloat(price.amount).toFixed(0)}
                          </span>
                        </div>
                        <Button variant="hero" size="lg" onClick={() => handleSubscribe(product)} disabled={isLoading}>
                          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
