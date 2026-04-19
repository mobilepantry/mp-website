import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { storefrontApiRequest, STOREFRONT_PRODUCT_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_QUERY, { handle });
        setProduct(data?.data?.productByHandle);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 pt-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 pt-48 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
        <Button variant="hero-outline" asChild>
          <Link to="/shop"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const images = product.images.edges;

  const handleSubscribe = async () => {
    if (!selectedVariant) return;
    const items = useCartStore.getState().items;
    const alreadyInCart = items.some(i => i.variantId === selectedVariant.id);
    if (alreadyInCart) {
      toast.info("Already in your cart!", { description: "Open the cart to review or checkout." });
      return;
    }
    const sellingPlanId = product.sellingPlanGroups?.edges?.[0]?.node?.sellingPlans?.edges?.[0]?.node?.id;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
      sellingPlanId,
    });
    toast.success("Added to cart!", { description: "Open the cart to checkout." });
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-medium">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {images.length > 0 ? (
              <>
                <img
                  src={images[selectedImage]?.node.url}
                  alt={images[selectedImage]?.node.altText || product.title}
                  className="w-full rounded-2xl aspect-square object-cover"
                />
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((img: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`rounded-lg overflow-hidden border-2 transition-colors ${
                          i === selectedImage ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img src={img.node.url} alt="" className="w-full aspect-square object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-square bg-secondary rounded-2xl flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2 block">MobilePantry</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">{product.title}</h1>
            {selectedVariant && (
              <p className="text-3xl font-bold text-primary mb-2">
                ${parseFloat(selectedVariant.price.amount).toFixed(2)}
                <span className="text-sm text-muted-foreground font-normal ml-2">
                  {selectedVariant.title !== "Default Title" && selectedVariant.title}
                </span>
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-6">Save 30% vs. grocery store prices</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div className="mb-8">
                <label className="text-sm font-bold text-foreground mb-3 block uppercase tracking-wide">
                  {product.options?.[0]?.name || "Options"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: any, i: number) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIndex(i)}
                      className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all ${
                        i === selectedVariantIndex
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {v.node.title} · ${parseFloat(v.node.price.amount).toFixed(0)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Impact callout */}
            <div className="bg-secondary rounded-2xl p-6 mb-8 flex items-start gap-4">
              <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground text-sm leading-relaxed">
                <strong>When you subscribe,</strong> you're not just saving money on groceries. You're helping bring fresh, healthy produce to families across Columbus who need it most. Fresh produce for all starts here.
              </p>
            </div>

            <Button variant="hero" size="lg" className="w-full text-lg py-6" onClick={handleSubscribe} disabled={isLoading || !selectedVariant}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">Skip, pause, or cancel anytime</p>

            {/* What's in the Box */}
            <div className="mt-8 bg-secondary/50 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">What's in the Box</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Each box includes a seasonal mix of fruits and vegetables including apples, carrots, peppers, tomatoes, leafy greens, squash, citrus, and more. Contents vary weekly based on availability. Every box also includes a printed card with storage tips, a simple recipe, and our story.
              </p>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">Frequently Asked Questions</h3>
              <Accordion type="multiple">
                {[
                  { q: "What's in the box?", a: "A curated mix of 10 to 12 pounds of seasonal fruits and vegetables. Contents change weekly based on what's available from our suppliers. You might get apples, peppers, carrots, tomatoes, greens, squash, and more. Always fresh. Always healthy." },
                  { q: "Why is the produce \"imperfect\"?", a: "It's perfectly fresh and nutritious, just cosmetically different. Maybe a tomato has a scar, a pepper is an unusual shape, or an apple is undersized. Grocery stores reject this produce for how it looks, not how it tastes. We rescue it so it reaches your table instead of a landfill." },
                  { q: "Where do you deliver?", a: "We currently deliver within the Columbus, Ohio metro area via DoorDash's Project Dash program. Deliveries happen on a set weekly schedule." },
                  { q: "Can I skip or cancel?", a: "Yes. You can skip a week, pause your subscription, or cancel anytime through your account." },
                  { q: "How does MobilePantry support food access?", a: "A portion of every purchase goes toward sourcing, packing, and delivering free boxes of fresh produce to food-insecure families through our community partners. That's how we make fresh, affordable produce accessible to all." },
                  { q: "Is my subscription tax-deductible?", a: "MobilePantry is a 501(c)(3) nonprofit. A portion of your subscription may qualify as a tax-deductible contribution. Consult your tax advisor for specifics." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-foreground text-sm">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
