import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import heroProduce from "@/assets/hero-produce.jpg";
import heroCommunity from "@/assets/hero-community.jpg";
import whyMobilePantryBox from "@/assets/why-mobilepantry-box.png";

const Index = () => {
  return (
    <div>
      {/* Full-bleed Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroProduce}
            alt="MobilePantry volunteers distributing fresh produce boxes"
            className="w-full h-full object-cover"
            width={1920}
            height={960}
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 py-32 pt-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-background mb-6">
              Fresh, healthy produce{" "}
              <span className="block">shouldn't be a luxury.</span>
            </h1>
            <p className="text-lg md:text-xl text-background leading-relaxed mb-8 max-w-xl">
              MobilePantry delivers weekly boxes of fresh, rescued produce at <strong className="text-mp-yellow">30% less than grocery prices</strong> straight to your door. Your support helps us bring fresh produce to Columbus families who need it most. Because fresh food is for everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/shop">
                  <Heart className="mr-2 h-5 w-5" /> Subscribe Now
                </Link>
              </Button>
              <Button variant="cta-white" size="lg" className="text-lg px-8 py-6" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Our Mission</span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground mb-6">
            We bridge the gap between food waste and food scarcity
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            In the United States, nearly <strong className="text-foreground">40% of produce</strong> is thrown away while one in seven people in Columbus faces food insecurity. <strong className="text-foreground">We believe food should be shared, not wasted.</strong>
          </p>
          <p className="text-lg font-bold text-primary mt-4 tracking-wide uppercase">
            Columbus and neighboring suburbs ONLY!
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block text-center">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            We make fresh produce accessible to everyone
          </h2>
          <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto">
            Our model rescues surplus produce, delivers it affordably, and funds free boxes for families in need.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Rescue",
                subtitle: "Good Produce Gets Thrown Away",
                body: "Every year, billions of pounds of perfectly fresh fruits and vegetables are rejected by grocery stores because they're the wrong shape, the wrong size, or have a few scars. We buy them at deep discounts before they go to waste.",
              },
              {
                step: "02",
                title: "Deliver",
                subtitle: "You Get It Fresh for 30% Less",
                body: "Choose a weekly box of curated seasonal produce, delivered to your door for $30/week. That's roughly 10 to 12 pounds of fresh, healthy food at a fraction of grocery prices, because affordable produce is the whole point.",
              },
              {
                step: "03",
                title: "Give",
                subtitle: "A Family Gets a Free Box, Too",
                body: "For every box purchased, we fund and deliver a free box to a food-insecure family in Columbus through our community partners. Same produce, same quality, same experience. Fresh food for all means all.",
              },
            ].map((col) => (
              <div key={col.title} className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-border">
                <span className="text-4xl font-extrabold text-primary block mb-4">{col.step}</span>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-primary">{col.title}</span>
                <h3 className="text-xl font-bold mt-1 mb-3 text-foreground">{col.subtitle}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MobilePantry */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block">Why MobilePantry</span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-8">
                Fresh produce for your table. And theirs.
              </h2>
              <div className="space-y-5">
                {[
                  "Save 30% on fresh, healthy produce every week.",
                  "Skip the grocery store. Seasonal produce delivered to your door.",
                  "Your purchase helps bring fresh produce to Columbus families facing food insecurity.",
                  "Reduce food waste. Each box rescues 10 to 12 pounds of produce that would otherwise hit a landfill.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
                    <p className="text-foreground">{text}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Your subscription may qualify as a partially tax-deductible contribution. We're a 501(c)(3) nonprofit.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={whyMobilePantryBox}
                alt="MobilePantry produce box"
                className="w-full max-w-md relative z-10"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Model */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 block text-center">Our Model</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-center">
            We're not a food bank. We're building a food system that works for everyone.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-3xl mx-auto">
            MobilePantry is a self-sustaining nonprofit. Revenue from paying subscribers covers all of our operating costs. Every dollar donated goes directly to funding free boxes of fresh produce, not salaries, not overhead, not marketing. We don't depend on generosity to survive. We built a model where buying affordable, healthy produce for yourself automatically funds the same for someone who can't.
          </p>
        </div>
      </section>

      {/* Full-bleed CTA */}
      <section className="relative py-28 md:py-36">
        <div className="absolute inset-0">
          <img src={heroCommunity} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-primary" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-background mb-4">
            Fresh produce for all starts with one box.
          </h2>
          <p className="text-background text-lg mb-8 max-w-xl mx-auto">
            Subscribe today. Feed your family and fund a free box for a neighbor.
          </p>
          <Button variant="cta-white" size="lg" className="text-lg px-8 py-6" asChild>
            <Link to="/shop">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
