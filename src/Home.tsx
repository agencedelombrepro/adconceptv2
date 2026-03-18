import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router'
import { ArrowDown, ArrowRight, CheckCircle2, Star, ChevronRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { GoogleReviews } from './GoogleReviews'

// Unsplash images for interior design
const heroImages = [
  '/projects/villa-mougins-2.jpg',
  '/about-2.jpg',
  '/gallia-4.jpg',
]

const realisations = [
  {
    title: 'Résidence Gallia — Cannes',
    category: 'Architecture intérieure',
    surface: 'Appartement',
    image: '/projects/gallia/gallia-1.jpg',
  },
  {
    title: 'Résidence Saint-Michel Valetta — Cannes',
    category: 'Rénovation complète',
    surface: 'Résidence',
    image: '/presse/n38-photo-3.jpg',
  },
  {
    title: 'Villa en pierres — Mougins',
    category: 'Maîtrise d\'œuvre',
    surface: '350 m²',
    image: '/projects/villa-mougins-1.jpg',
  },
  {
    title: 'Villa contemporaine — Roquefort-les-Pins',
    category: 'Maîtrise d\'œuvre',
    surface: '300 m²',
    image: '/projects/roquefort/roquefort-2.jpg',
  },
]

const differentiators = [
  { label: 'Respect du budget défini', icon: '◆' },
  { label: 'Respect des délais annoncés', icon: '◆' },
  { label: 'Présence terrain réelle', icon: '◆' },
  { label: 'Coordination des entreprises', icon: '◆' },
  { label: 'Relation client durable', icon: '◆' },
  { label: '20 ans d\'expérience', icon: '◆' },
]

const stats = [
  { number: '20+', label: 'Années d\'expérience' },
  { number: '200+', label: 'Projets réalisés' },
  { number: '100%', label: 'Projets sur mesure' },
  { number: '06', label: 'Alpes-Maritimes' },
]

// Animated counter
function Counter({ target }: { target: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(target.replace(/\D/g, ''))
    if (isNaN(num)) {
      setDisplay(target)
      return
    }
    let start = 0
    const duration = 1800
    const step = duration / num
    const timer = setInterval(() => {
      start += Math.ceil(num / 60)
      if (start >= num) {
        setDisplay(target)
        clearInterval(timer)
      } else {
        setDisplay(start + (target.includes('+') ? '+' : target.includes('%') ? '%' : ''))
      }
    }, step)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{display}</span>
}

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(i => (i + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background images carousel */}
        {heroImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: activeImage === i ? 1 : 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
              <img
                src={img}
                alt="Interior design"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Dark gradient overlay — contraste renforcé */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-white/75 font-light">
              Depuis 2006 · Valbonne · Alpes-Maritimes
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-white text-2xl md:text-[2.1rem] lg:text-[2.8rem] mb-8 leading-none md:whitespace-nowrap"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300,
                textShadow: '0 4px 32px rgba(0,0,0,0.55), 0 1px 8px rgba(0,0,0,0.4)',
              }}
            >
              Architecte & <em>Maître d'œuvre</em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="text-white/90 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            Des espaces pensés avec exigence, des projets menés avec rigueur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contact"
              data-cursor="Parlons"
              className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-all duration-400"
            >
              Parlons de votre projet
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={14} />
              </motion.span>
            </Link>
            <Link
              to="/realisations"
              className="flex items-center gap-3 border border-white/40 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
            >
              Voir les réalisations
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Défiler</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-white/50" />
          </motion.div>
        </motion.div>

        {/* Image dots */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeImage === i ? 'bg-secondary w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-primary py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-4 text-primary-foreground/70 text-xs tracking-[0.3em] uppercase whitespace-nowrap">
              <span>Architecture d'intérieur</span>
              <span className="text-secondary">◆</span>
              <span>Maîtrise d'œuvre</span>
              <span className="text-secondary">◆</span>
              <span>Rénovation</span>
              <span className="text-secondary">◆</span>
              <span>Côte d'Azur</span>
              <span className="text-secondary">◆</span>
              <span>AD Concept</span>
              <span className="text-secondary">◆</span>
              <span>Valbonne · Cannes · Mougins</span>
              <span className="text-secondary">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <div className="text-5xl md:text-6xl text-primary mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                  <Counter target={stat.number} />
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTRO / POSITIONNEMENT ─── */}
      <section className="py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F0E8DC]" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 bg-gradient-to-l from-secondary/20 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <AnimatedSection direction="left">
              <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-6">
                Notre philosophie
              </span>
              <h2 className="mb-8 text-primary leading-tight">
                Un projet ne se dessine pas seulement.
                <em> Il se construit.</em>
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Un intérieur réussi ne repose pas uniquement sur une esthétique. Il repose sur une compréhension précise de vos attentes, de votre mode de vie et des contraintes techniques du lieu.
                </p>
                <p>
                  Chez AD Concept, chaque projet commence par une phase d'analyse approfondie : relevé du bien, étude des volumes, identification des contraintes structurelles et budgétaires.
                </p>
                <p className="text-primary font-medium italic" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>
                  « Je ne propose pas d'intérieur catalogue. Je conçois des espaces cohérents, fonctionnels et durables. »
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/a-propos"
                  className="inline-flex items-center gap-3 text-primary text-sm tracking-wide group"
                >
                  <span className="border-b border-primary pb-0.5 group-hover:border-secondary transition-colors">
                    Découvrir Christine Thémélidis
                  </span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Image grid */}
            <AnimatedSection direction="right" className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="img-zoom rounded-sm overflow-hidden aspect-[3/4]">
                  <img
                    src="/about/about-1.jpg"
                    alt="Réalisation AD Concept"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-zoom rounded-sm overflow-hidden aspect-square">
                  <img
                    src="/about/about-2.jpg"
                    alt="Réalisation AD Concept"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="img-zoom rounded-sm overflow-hidden aspect-square">
                  <img
                    src="/about/about-3.jpg"
                    alt="Réalisation AD Concept"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="img-zoom rounded-sm overflow-hidden aspect-[3/4]">
                  <img
                    src="/about/about-4.jpg"
                    alt="Réalisation AD Concept"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── RÉALISATIONS GRID ─── */}
      <section className="py-14 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Portfolio</span>
            <h2 className="text-primary">Réalisations en Alpes-Maritimes</h2>
            <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {realisations.map((project, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <Link
                  to="/realisations"
                  data-cursor="Voir"
                  className="group block relative overflow-hidden aspect-[3/4] rounded-sm"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-white/70 block mb-1">
                      {project.category} · {project.surface}
                    </span>
                    <h3 className="text-white text-base leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs tracking-wider text-white/80">Voir le projet</span>
                      <ArrowRight size={12} className="text-secondary" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/realisations"
              className="inline-flex items-center gap-3 border border-primary text-primary px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Voir toutes les réalisations
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── MISSIONS ─── */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-6">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-3">Prestations</span>
            <h2 className="text-primary whitespace-nowrap">Architecture d'intérieur & maîtrise d'œuvre</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Mission partielle */}
            <AnimatedSection delay={0.1} direction="left">
              <div className="border border-border p-5 h-full group hover:border-primary transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-secondary group-hover:h-full transition-all duration-500" />
                <span className="text-xs tracking-[0.3em] uppercase text-secondary block mb-3">Mission 01</span>
                <h3 className="text-primary mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.35rem' }}>
                  Mission de conception
                </h3>
                <ul className="space-y-1.5 mb-4">
                  {[
                    'Analyse du bien existant',
                    'Avant-projets (APS)',
                    'Plans détaillés',
                    'Sélection matériaux & finitions',
                    'Dossier technique',
                    'DQE (descriptif quantitatif estimatif)',
                    'Consultation des entreprises',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 size={12} className="text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground italic">
                  Idéal pour les clients souhaitant piloter eux-mêmes le chantier tout en bénéficiant d'une conception professionnelle.
                </p>
              </div>
            </AnimatedSection>

            {/* Mission complète */}
            <AnimatedSection delay={0.2} direction="right">
              <div className="bg-primary p-5 h-full group relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-secondary/10" />
                <span className="text-xs tracking-[0.3em] uppercase text-white/60 block mb-3 relative z-10">Mission 02</span>
                <h3 className="text-primary-foreground mb-4 relative z-10" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.35rem' }}>
                  Mission complète : conception & maîtrise d'œuvre
                </h3>
                <ul className="space-y-1.5 mb-4 relative z-10">
                  {[
                    'Conception intégrale',
                    'Dossier technique complet',
                    'Consultation des entreprises',
                    'Planification des travaux',
                    'Coordination des corps d\'état',
                    'Suivi de chantier',
                    'Réception des travaux',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <CheckCircle2 size={12} className="text-white/80 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-primary-foreground/60 italic relative z-10">
                  Maître d'œuvre assurée, responsable du bon déroulement du chantier et du respect des engagements.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-7">
            <Link
              to="/methode"
              className="inline-flex items-center gap-3 text-primary text-sm tracking-wide group"
            >
              <span className="border-b border-primary group-hover:border-secondary transition-colors pb-0.5">Découvrir notre méthode</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PROCESSUS ─── */}
      <section className="py-14 bg-primary/3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1800&q=60&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Notre méthode</span>
            <h2 className="text-primary">Une préparation rigoureuse pour un chantier maîtrisé</h2>
            <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          </AnimatedSection>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            {[
              'Rencontre & cahier des charges',
              'Écoute et compréhension du projet',
              'Relevé précis du bien',
              'Avant-projet & validation',
              'Sélection des matériaux, finitions & DQE',
              'Plans d\'exécution & plans de détails',
              'Consultation, analyse des devis & planification',
              'Suivi de chantier, réception & levée de réserves',
            ].map((step, i, arr) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
                }}
                className="group text-center cursor-default"
              >
                <div className="relative flex flex-col items-center">
                  {/* Demi-ligne gauche — pas en début de rangée */}
                  {i > 0 && i % 4 !== 0 && (
                    <div
                      className="hidden md:block absolute top-10 h-px bg-secondary/50"
                      style={{ left: 0, right: 'calc(50% + 42px)' }}
                    />
                  )}
                  {/* Demi-ligne droite — pas en fin de rangée */}
                  {i < arr.length - 1 && (i + 1) % 4 !== 0 && (
                    <div
                      className="hidden md:block absolute top-10 h-px bg-secondary/50"
                      style={{ left: 'calc(50% + 42px)', right: 0 }}
                    />
                  )}
                  {/* Circle */}
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 border-primary/20 bg-[#F5F0E8] flex items-center justify-center mb-4 relative z-10 group-hover:border-secondary transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <span
                      className="text-primary/50 group-hover:text-secondary transition-colors duration-300"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 300 }}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                  <p className="text-xs tracking-wide text-foreground/65 leading-snug text-center group-hover:text-foreground/90 transition-colors duration-300">{step}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── DIFFÉRENCIATEURS ─── */}
      <section className="py-14 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 top-0 w-96 h-96 rounded-full bg-secondary/10" />
          <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full bg-secondary/10" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs tracking-[0.4em] uppercase text-[#F5F0E8]/60 block mb-6">Pourquoi nous choisir</span>
              <h2 className="text-primary-foreground mb-8">
                Pourquoi choisir <em>AD Concept</em> ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 py-3 border-b border-primary-foreground/10"
                  >
                    <span className="text-[#F5F0E8]/50 text-xs">{item.icon}</span>
                    <span className="text-sm text-primary-foreground/80">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-[#F5F0E8] text-[#364025] px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#F5F0E8]/85 transition-colors duration-300"
                >
                  Démarrer votre projet
                  <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative">
                <div className="img-zoom aspect-[4/5] overflow-hidden rounded-sm">
                  <img
                    src="/accueil-pourquoi.jpg"
                    alt="Christine Thémélidis AD Concept"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-secondary p-6 max-w-xs">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="white" className="text-white" />
                    ))}
                  </div>
                  <p className="text-white text-sm italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    « Depuis plus de 10 ans Christine assure le rôle de maître d'œuvre pour mes projets — talentueuse, créative et très professionnelle. »
                  </p>
                  <p className="text-white/70 text-xs mt-2 tracking-wider">— Claire Fiszer Hannaux, cliente depuis 2010</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── AVIS GOOGLE ─── */}
      <GoogleReviews />

      {/* ─── ZONES INTERVENTION ─── */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Zone d'intervention</span>
              <h2 className="text-primary mb-4">Côte d'Azur, France & au-delà</h2>
              <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                Basée à Valbonne, AD Concept intervient principalement dans les <strong className="text-primary font-normal">Alpes-Maritimes (06)</strong>, le <strong className="text-primary font-normal">Var (83)</strong>, <strong className="text-primary font-normal">Monaco</strong> et l'arrière-pays.
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                Des projets à <strong className="text-primary font-normal">Paris</strong>, <strong className="text-primary font-normal">Bruxelles</strong> et dans d'autres villes européennes sont possibles, selon la nature du projet, le niveau d'implication souhaité et la relation établie avec le client.
              </p>
              <p className="text-foreground/60 text-xs italic mt-4">
                Les villes ci-contre sont indicatives, pas une liste fermée. Chaque projet se discute.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="flex flex-wrap gap-3">
                {[
                  { city: 'Valbonne',     to: '/architecte-interieur-valbonne' },
                  { city: 'Cannes',       to: '/architecte-interieur-cannes' },
                  { city: 'Mougins',      to: '/architecte-interieur-mougins' },
                  { city: 'Antibes',      to: '/architecte-interieur-antibes' },
                  { city: 'Nice',         to: '/architecte-interieur-nice' },
                  { city: 'Monaco',       to: '/architecte-interieur-monaco' },
                  { city: 'Saint-Tropez', to: '/architecte-interieur-saint-tropez' },
                  { city: 'Grasse',         to: '/architecte-interieur-grasse' },
                  { city: 'Fréjus',         to: '/architecte-interieur-frejus' },
                  { city: 'Hyères',         to: '/architecte-interieur-hyeres' },
                  { city: 'Grimaud',        to: '/architecte-interieur-grimaud' },
                  { city: 'Sainte-Maxime',  to: '/architecte-interieur-sainte-maxime' },
                  { city: 'Sanary-sur-Mer', to: '/architecte-interieur-sanary' },
                ].map((item) => (
                  <Link
                    key={item.city}
                    to={item.to}
                    className="px-5 py-2 border border-border text-foreground/70 hover:border-primary hover:text-primary transition-all duration-200 rounded-full text-xs tracking-wide"
                  >
                    {item.city}
                  </Link>
                ))}
                {['Paris', 'Bruxelles', 'Europe'].map((city) => (
                  <span
                    key={city}
                    className="px-5 py-2 border border-dashed border-border text-foreground/40 rounded-full text-xs tracking-wide italic"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  )
}
