import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import logoHeader from "@/assets/logo-header.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Partner With Us", to: "/partner" },
  { label: "Shop", to: "/shop" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 gap-3">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={logoHeader} alt="MobilePantry" className="h-7 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                location.pathname === item.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <CartDrawer />
          <Button variant="hero" size="lg" asChild>
            <Link to="/shop" onClick={() => { if (location.pathname === '/shop') window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Subscribe</Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <CartDrawer />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-4 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium py-2 uppercase tracking-wide hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop" onClick={() => setMobileOpen(false)}>Subscribe</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
