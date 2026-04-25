import { Picture } from "@/components/Picture";
import logoFull from "@/assets/logo-full.png?w=240;480&format=avif;webp;png&as=picture";
import fruitIcons from "@/assets/fruit-icons.png?w=480;960&format=avif;webp;png&as=picture";

export const Footer = () => (
  <footer className="bg-white border-t border-primary/10">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left side */}
        <div className="flex flex-col items-start gap-3">
          <Picture data={logoFull} alt="MobilePantry" className="h-14 w-auto" loading="lazy" />
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
          <Picture data={fruitIcons} alt="Fresh fruits and vegetables" className="h-20 md:h-24 w-auto" loading="lazy" />
        </div>
      </div>

      <div className="border-t border-primary/10 mt-8 pt-4 text-left text-xs text-primary/40">
        © {new Date().getFullYear()} MobilePantry. All rights reserved.
      </div>
    </div>
  </footer>
);
