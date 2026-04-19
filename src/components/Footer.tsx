import logoFull from "@/assets/logo-full.png";
import fruitIcons from "@/assets/fruit-icons.png";

export const Footer = () => (
  <footer className="bg-white border-t border-primary/10">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left side */}
        <div className="flex flex-col items-start gap-3">
          <img src={logoFull} alt="MobilePantry" className="h-14" />
          <p className="text-primary font-semibold text-lg">
            A Market on a Mission!
          </p>
          <a href="mailto:info@mobilepantry.org" className="text-primary hover:underline text-sm transition-colors">
            info@mobilepantry.org
          </a>
          <p className="text-primary/70 text-xs">
            501(c)(3), nonprofit organization. EIN: 39-2242376
          </p>
        </div>

        {/* Right side - fruit icons */}
        <div className="flex-shrink-0">
          <img src={fruitIcons} alt="Fresh fruits and vegetables" className="h-20 md:h-24" />
        </div>
      </div>

      <div className="border-t border-primary/10 mt-8 pt-4 text-left text-xs text-primary/40">
        © {new Date().getFullYear()} MobilePantry. All rights reserved.
      </div>
    </div>
  </footer>
);
