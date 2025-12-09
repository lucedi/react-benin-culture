import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    explorer: [
      { label: "Histoire", href: "#" },
      { label: "Cuisine", href: "#" },
      { label: "Musique", href: "#" },
      { label: "Traditions", href: "#" },
      { label: "Artisanat", href: "#" },
    ],
    ressources: [
      { label: "Blog", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Vidéos", href: "#" },
    ],
    legal: [
      { label: "Conditions d'utilisation", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-earth-dark text-cream">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-earth-dark font-display font-bold text-xl">B</span>
              </div>
              <span className="font-display text-2xl font-bold">
                Bénin<span className="text-accent">Culture</span>
              </span>
            </a>
            <p className="text-cream/70 mb-6">
              Votre portail vers la richesse culturelle du Bénin. Découvrez, apprenez et partagez.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-accent hover:text-earth-dark flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explorer */}
          <div>
            <h4 className="font-bold text-lg mb-6">Explorer</h4>
            <ul className="space-y-3">
              {footerLinks.explorer.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/70 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span className="text-cream/70">Cotonou, Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-cream/70">+229 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-cream/70">contact@beninculture.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} BéninCulture. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-cream/50 hover:text-cream text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
