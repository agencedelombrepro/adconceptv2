import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { LogoAD } from './LogoAD'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
      setIsHeroVisible(window.scrollY < window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/realisations', label: 'Réalisations' },
    { to: '/methode', label: 'Méthode' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/presse', label: 'Presse' },
    { to: '/blog', label: 'Blog' },
  ]

  const isHome = location.pathname === '/'
  // Texte blanc uniquement sur le hero de la Home (fond sombre)
  // Sur toutes les autres pages : header fond crème dès le départ
  const textLight = isHome && isHeroVisible && !isScrolled
  const headerBg = isScrolled
    ? 'bg-[#F5F0E8]/97 backdrop-blur-md shadow-sm py-2'
    : isHome
    ? 'bg-transparent py-4'
    : 'bg-[#F5F0E8]/97 backdrop-blur-sm py-3 shadow-sm'
  const logoColor = textLight ? '#FFFFFF' : '#364025'

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Logo SVG + texte */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
              >
                <LogoAD
                  color={logoColor}
                  size={isScrolled ? 38 : 44}
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.span
                  className={`text-lg lg:text-xl tracking-[0.22em] transition-colors duration-500 leading-none ${
                    textLight ? 'text-white' : 'text-[#364025]'
                  }`}
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
                >
                  AD CONCEPT
                </motion.span>
                <span className={`text-[9px] tracking-[0.35em] uppercase font-light transition-colors duration-500 mt-0.5 ${
                  textLight ? 'text-white/75' : 'text-[#5A4E38]/80'
                }`}>
                  Architecture d'intérieur
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative text-[11px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 group ${
                      isActive
                        ? textLight ? 'text-white' : 'text-[#364025]'
                        : textLight
                        ? 'text-white/85 hover:text-white'
                        : 'text-[#1C1C1C]/65 hover:text-[#364025]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    } ${textLight ? 'bg-white' : 'bg-[#364025]'}`} />
                  </Link>
                )
              })}

              {/* CTA Contact */}
              <Link
                to="/contact"
                className={`text-[11px] tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300 ${
                  isScrolled || !textLight
                    ? 'bg-[#364025] text-[#F5F0E8] hover:bg-[#4a5633]'
                    : 'border border-white/70 text-white hover:bg-white/15'
                }`}
              >
                Discuter de mon projet
              </Link>
            </nav>

            {/* Hamburger mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors z-[51] relative ${
                isMobileMenuOpen ? 'text-[#364025]' : textLight ? 'text-white' : 'text-[#364025]'
              }`}
              aria-label="Ouvrir le menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 48px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 48px) 32px)' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-[#F5F0E8] lg:hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#364025]/4" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#364025]/4" />
            </div>

            {/* Logo centré dans le menu mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-10"
            >
              <LogoAD color="#364025" size={56} />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center gap-4 w-full px-10">
              {[...navLinks, { to: '/contact', label: 'Contact' }].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full text-center"
                >
                  <Link
                    to={link.to}
                    className={`block text-3xl py-2 transition-colors ${
                      location.pathname === link.to
                        ? 'text-[#364025]'
                        : 'text-[#1C1C1C]/60 hover:text-[#364025]'
                    }`}
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                  <div className="w-8 h-px bg-[#364025]/12 mx-auto mt-2" />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-6"
              >
                <a
                  href="mailto:bonjour@adconceptdesign.fr"
                  className="text-[#364025]/60 text-xs tracking-wider hover:text-[#364025] transition-colors"
                >
                  bonjour@adconceptdesign.fr
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
