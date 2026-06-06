import { Link, useLocation } from "react-router-dom";
import { Home, Plane, Package, Moon, User } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

type NavItem = {
  path: string;
  icon: typeof Home;
  labelEn: string;
  labelBn: string;
  external?: boolean;
};

const MobileBottomNav = () => {
  const location = useLocation();
  const { lang } = useLang();

  const items: NavItem[] = [
    { path: "/packages", icon: Package, labelEn: "Package", labelBn: "প্যাকেজ" },
    { path: "/services/air-ticket", icon: Plane, labelEn: "Air Ticket", labelBn: "এয়ার টিকেট" },
    { path: "/", icon: Home, labelEn: "Home", labelBn: "হোম" },
    { path: "/services/hajj-umrah", icon: Moon, labelEn: "Hajj-Umrah", labelBn: "হজ-উমরাহ" },
    { path: "https://primeskyint.net/", icon: User, labelEn: "Profile", labelBn: "প্রোফাইল", external: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
      <ul className="grid grid-cols-5 h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const active = !item.external && location.pathname === item.path;
          const isHome = item.path === "/";
          const className = `flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
            active ? "text-gold" : "text-foreground/70 hover:text-primary"
          }`;
          const inner = (
            <>
              <span
                className={`flex items-center justify-center ${
                  isHome ? "w-12 h-12 -mt-6 rounded-full bg-gold text-primary shadow-lg" : ""
                }`}
              >
                <Icon className={isHome ? "w-6 h-6" : "w-5 h-5"} />
              </span>
              <span className="leading-tight">
                {lang === "bn" ? item.labelBn : item.labelEn}
              </span>
            </>
          );
          return (
            <li key={item.path} className="flex">
              {item.external ? (
                <a href={item.path} target="_blank" rel="noopener noreferrer" className={className}>
                  {inner}
                </a>
              ) : (
                <Link to={item.path} className={className}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
