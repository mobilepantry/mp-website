import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SlotCounter } from "@/components/SlotCounter";
import aboutHero from "@/assets/about-hero.jpg";
import heroCommunity from "@/assets/hero-community.jpg";
import visionDiagram from "@/assets/vision-diagram.png";

const About = () => (
  <div>
    {/* Full-bleed Hero */}
    <section className="relative min-h-[50vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <img src={aboutHero} alt="Fresh produce" className="w-full h-full object-cover" width={1920} height={960} />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative text-center px-4 py-32 pt-40">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-background">
          About Us
        </h1>
      </div>
    </section>

    {/* Our Vision — flow diagram */}
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Flow diagram with frame */}
          <div className="flex items-center justify-center">
            <img src={visionDiagram} alt="MobilePantry vision: Produce Markets, Farms, and Grocery Stores flow through MobilePantry to Paid Subscribers and Families in Need" className="w-full max-w-md object-contain" />
          </div>

          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Our Vision</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-6">
              A more equitable food system for Columbus.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe everyone deserves access to fresh, healthy food, especially when perfectly good produce is being thrown away by the billions of pounds. Food waste isn't just bad for the planet. It's a missed opportunity for our communities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That's why we built a model that turns surplus into access, making fresh produce affordable for paying customers and free for families who need it most.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* The Problem — flip counter style */}
    <section className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-background mb-8 block">The Problem</span>

        <SlotCounter />

        <h2 className="text-2xl md:text-3xl font-bold text-background mb-6">
          of produce is thrown away every year
        </h2>
        <p className="text-background text-lg max-w-2xl mx-auto leading-relaxed">
          All the while, <strong className="text-background">one in seven people</strong> in Columbus faces food insecurity. If we rescued even a fraction of what's wasted, we could close the gap between surplus and scarcity.
        </p>
      </div>
    </section>

    {/* Our Story */}
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-6">
              Built by Ohio State students on a mission
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MobilePantry started when a group of Ohio State University students noticed a disconnect: fresh produce going to waste while Columbus families went without. After winning The Ohio State University President's Buckeye Accelerator, they turned their vision into a real operation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The result: a self-sustaining nonprofit that buys surplus produce at deep discounts, sells it at 30% below retail, and uses that revenue to fund free boxes for families in need.
            </p>
          </div>
          {/* Image with layered frame */}
          <div className="relative p-4">
            <div className="absolute inset-0 rounded-3xl bg-primary" />
            <div className="absolute top-2 left-2 right-2 bottom-2 rounded-2xl bg-primary" />
            <img
              src={heroCommunity}
              alt="Fresh produce distribution"
              className="rounded-2xl w-full relative z-10"
              loading="lazy"
              width={1920}
              height={960}
            />
          </div>
        </div>
      </div>
    </section>

    {/* What Makes Us Different */}
    <section className="bg-secondary py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block text-center">What Makes Us Different</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center max-w-3xl mx-auto">
          We built a model where buying produce for yourself funds it for someone who can't.
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-3xl mx-auto mb-14">
          MobilePantry is fully self-sustaining. Subscriber revenue covers 100% of operating costs. That means every additional resource goes directly to sourcing, packing, and delivering free boxes of fresh produce to families across Columbus.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Sourcing",
              body: "We buy cosmetically imperfect and surplus produce from distributors and local farms at deep discounts. Perfectly fresh, perfectly nutritious. It just doesn't look like what grocery stores want on their shelves.",
            },
            {
              step: "02",
              title: "Packing",
              body: "Every box is hand-packed in Columbus. We inspect every piece for quality and pack 10 to 12 pounds of mixed fruits and vegetables. Paid boxes and free boxes come off the same line.",
            },
            {
              step: "03",
              title: "Delivery",
              body: "Boxes are delivered to your door through DoorDash's Project Dash program. Weekly schedule. Whether you're a subscriber or a free-box recipient, you get the same doorstep experience.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-background rounded-2xl p-8 shadow-sm border border-border">
              <span className="text-4xl font-extrabold text-primary block mb-3">{item.step}</span>
              <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="relative py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={aboutHero} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
          Ready to help make fresh produce accessible to every family in Columbus?
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/shop">Subscribe Now</Link>
          </Button>
          <Button variant="cta-white" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/partner">Partner With Us</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default About;
