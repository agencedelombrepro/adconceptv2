import { Link } from 'react-router'
import { Instagram, Facebook, MapPin, Mail, Star } from 'lucide-react'
import { LogoAD } from './LogoAD'

export function Footer() {
  const cityLinks = [
    { to: '/architecte-interieur-valbonne',      label: 'Valbonne' },
    { to: '/architecte-interieur-cannes',         label: 'Cannes' },
    { to: '/architecte-interieur-mougins',        label: 'Mougins' },
    { to: '/architecte-interieur-antibes',        label: 'Antibes' },
    { to: '/architecte-interieur-nice',           label: 'Nice' },
    { to: '/architecte-interieur-monaco',         label: 'Monaco' },
    { to: '/architecte-interieur-saint-tropez',   label: 'Saint-Tropez' },
    { to: '/architecte-interieur-grasse',         label: 'Grasse' },
    { to: '/architecte-interieur-frejus',         label: 'Fréjus' },
    { to: '/architecte-interieur-hyeres',         label: 'Hyères' },
    { to: '/architecte-interieur-grimaud',        label: 'Grimaud' },
    { to: '/architecte-interieur-sainte-maxime',  label: 'Sainte-Maxime' },
    { to: '/architecte-interieur-sanary',         label: 'Sanary-sur-Mer' },
  ]

  return (
    <footer className="bg-[#364025] text-[#F5F0E8] relative overflow-hidden">
      {/* Décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F5F0E8]/10 to-transparent" />
        <div className="absolute -right-40 top-0 w-96 h-96 rounded-full bg-[#F5F0E8]/3" />
        <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full bg-[#F5F0E8]/3" />
      </div>

      {/* Grille footer */}
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand avec logo */}
          <div>
            <div className="mb-5 flex flex-col gap-2">
              <LogoAD variant="light" size={52} />
              <span className="text-[#F5F0E8] text-base"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, letterSpacing: '0.25em' }}>
                AD CONCEPT
              </span>
            </div>
            <p className="text-sm text-[#F5F0E8]/65 leading-relaxed mb-6 mt-2">
              Architecture d'intérieur et maîtrise d'oeuvre dans les Alpes-Maritimes depuis 2006.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/adconcept_design/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram AD Concept"
                className="w-9 h-9 border border-[#F5F0E8]/20 rounded-full flex items-center justify-center hover:border-[#F5F0E8]/60 hover:bg-[#F5F0E8]/10 transition-all duration-300"
              >
                <Instagram size={13} />
              </a>
              <a
                href="https://www.facebook.com/adconceptCT/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook AD Concept"
                className="w-9 h-9 border border-[#F5F0E8]/20 rounded-full flex items-center justify-center hover:border-[#F5F0E8]/60 hover:bg-[#F5F0E8]/10 transition-all duration-300"
              >
                <Facebook size={13} />
              </a>
              <a
                href="https://share.google/O08iqBTt9AIhj93b3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Avis Google AD Concept"
                className="w-9 h-9 border border-[#F5F0E8]/20 rounded-full flex items-center justify-center hover:border-[#F5F0E8]/60 hover:bg-[#F5F0E8]/10 transition-all duration-300"
              >
                <Star size={13} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#F5F0E8]/70 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { to: '/realisations', label: 'Réalisations' },
                { to: '/methode', label: 'Méthode' },
                { to: '/a-propos', label: 'À propos' },
                { to: '/presse', label: 'Presse' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Discuter de mon projet' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#F5F0E8]/65 hover:text-[#F5F0E8] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-[#F5F0E8]/30 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones — 2 colonnes */}
          <div className="lg:col-span-1">
            <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#F5F0E8]/70 mb-6">Zones d'intervention</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {cityLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors flex items-center gap-1.5 group"
                  >
                    <MapPin size={8} className="text-[#F5F0E8]/50 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — email uniquement */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] uppercase text-[#F5F0E8]/70 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-[#F5F0E8]/70 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=1475+Chemin+du+Val+Martin,+06560+Valbonne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#F5F0E8]/65 hover:text-[#F5F0E8] transition-colors"
                >
                  1475 chemin du Val Martin<br />
                  06560 Valbonne
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={13} className="text-[#F5F0E8]/70 shrink-0" />
                <a
                  href="mailto:bonjour@adconceptdesign.fr"
                  className="text-sm text-[#F5F0E8]/65 hover:text-[#F5F0E8] transition-colors"
                >
                  bonjour@adconceptdesign.fr
                </a>
              </li>
            </ul>

            {/* Zone */}
            <div className="mt-6 pt-5 border-t border-[#F5F0E8]/10">
              <p className="text-[10px] text-[#F5F0E8]/45 leading-relaxed">
                Intervient principalement sur la Côte d'Azur (06 · 83 · Monaco), et ponctuellement en Europe selon les projets, notamment Paris, Bruxelles et au-delà.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="border-t border-[#F5F0E8]/10 relative z-10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#F5F0E8]/40">
            <div className="flex flex-wrap gap-5 justify-center md:justify-start">
              <Link to="/mentions-legales" className="hover:text-[#F5F0E8]/80 transition-colors">
                Mentions légales
              </Link>
              <span>·</span>
              <Link to="/politique-confidentialite" className="hover:text-[#F5F0E8]/80 transition-colors">
                Politique de confidentialité
              </Link>
              <span>·</span>
              <Link to="/politique-cookies" className="hover:text-[#F5F0E8]/80 transition-colors">
                Cookies
              </Link>
            </div>
            <a
              href="https://site.agencedelombre.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F5F0E8]/80 transition-colors text-center"
            >
              Site créé en toute discrétion par l'Agence de L'Ombre
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
