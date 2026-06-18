export const APP_NAME = "Flowmatic";
export const APP_TAGLINE = "Automate Everything, Effortlessly";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const navCTA = {
  label: "Get Started Free",
  href: "#pricing",
};