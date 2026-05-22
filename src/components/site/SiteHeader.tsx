import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import sport24Logo from "@/assets/sport24-logo.webp";

const NAV = ["Kvinder", "Mænd", "Børn", "Aktiviteter", "Gode priser"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 py-4">
        <button aria-label="Menu" className="text-foreground">
          <Menu className="h-6 w-6" />
        </button>

        <nav className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
          {NAV.map((item) => (
            <a key={item} href="#" className="hover:text-brand-red">
              {item}
            </a>
          ))}
        </nav>

        <a href="/" className="mx-auto flex items-center" aria-label="SPORT 24">
          <img src={sport24Logo} alt="SPORT 24" className="h-10 w-auto" />
        </a>

        <div className="hidden flex-1 max-w-md md:block">
          <div className="flex items-center rounded-full bg-muted px-4 py-2.5">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Hvad leder du efter?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="Konto"><User className="h-6 w-6" /></button>
          <button aria-label="Ønskeliste"><Heart className="h-6 w-6" /></button>
          <button aria-label="Indkøbskurv"><ShoppingBag className="h-6 w-6" /></button>
        </div>
      </div>
    </header>
  );
}
