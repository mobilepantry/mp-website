import { Mail } from "lucide-react";
import { Picture } from "@/components/Picture";
import partnerHero from "@/assets/partner-hero.jpg?w=640;1024;1920&format=avif;webp;jpg&as=picture";

const Partner = () => (
  <div>
    {/* Full-bleed Hero */}
    <section className="relative min-h-[50vh] flex items-center">
      <div className="absolute inset-0">
        <Picture
          data={partnerHero}
          alt="Farm produce field"
          className="w-full h-full object-cover"
          sizes="100vw"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-foreground/65" />
      </div>
      <div className="relative container mx-auto px-4 py-32 pt-40 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-background mb-4">
          Partner with MobilePantry
        </h1>
        <p className="text-lg text-background leading-relaxed max-w-xl">
          Whether you're a community organization, a produce supplier, or a business that wants to make an impact, there's a way to work with us to put fresh, healthy food on more tables.
        </p>
      </div>
    </section>

    {/* Community Organizations */}
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Community Partners</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">For Community Organizations</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
          We distribute free boxes of fresh produce through vetted community partners who work directly with families experiencing food insecurity. As a partner, you'll receive weekly promo codes to share with the people you serve. Recipients place their own orders through our online store and receive home delivery, the same box, the same experience, the same dignity as every paying customer. Because fresh, healthy food shouldn't feel different depending on how you access it.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-border p-8">
            <h3 className="font-bold text-foreground mb-3 text-lg">What we provide</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Weekly allocations of free box codes, a dedicated partner dashboard for submitting client delivery information, impact data for your own reporting, and co-branded materials for your community.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-8">
            <h3 className="font-bold text-foreground mb-3 text-lg">What we look for</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Organizations with an established presence in Columbus that serve food-insecure populations and can distribute codes to individuals and families who will benefit most.
            </p>
          </div>
        </div>
        <p className="text-foreground text-lg flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Interested? Reach out at{" "}
          <a href="mailto:info@mobilepantry.org" className="text-primary font-semibold hover:underline">info@mobilepantry.org</a>
        </p>
      </div>
    </section>

    {/* Suppliers */}
    <section className="bg-secondary py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Suppliers</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">For Suppliers and Farms</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
          Have surplus or cosmetically imperfect produce you need to move? We buy it. We pay fair prices, pick up or accept delivery on your schedule, and move product within 48 hours. Selling to MobilePantry is faster and better-paying than composting, donating, or landfilling, and your produce ends up feeding families instead of filling a dumpster. As a 501(c)(3) nonprofit, we can provide tax documentation where applicable.
        </p>
        <p className="text-foreground text-lg flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Get in touch at{" "}
          <a href="mailto:info@mobilepantry.org" className="text-primary font-semibold hover:underline">info@mobilepantry.org</a>
        </p>
      </div>
    </section>

  </div>
);

export default Partner;
