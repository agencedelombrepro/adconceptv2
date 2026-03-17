import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react'
import { Quote, BookOpen, Download, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import { AnimatedSection } from './AnimatedSection'

/* ── Logo Perspective composant ── */
function PerspectiveBadge({ dark = false, small = false }: { dark?: boolean; small?: boolean }) {
  return (
    <span
      className={`tracking-[0.35em] uppercase font-light ${small ? 'text-[9px]' : 'text-[11px]'} ${dark ? 'text-[#364025]' : 'text-[#F5F0E8]'}`}
      style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.35em' }}
    >
      Perspective
    </span>
  )
}

/* ── Données de presse ── */
const pressArticles = [
  {
    id: 4,
    media: 'Perspective',
    issue: 'N° 49',
    year: '2022',
    category: 'Architecture & Design',
    headline: 'Chantier titanesque avec vue mer',
    subheadline: 'Un appartement traversant d\'exception — Résidence Gallia, Cannes',
    excerpt:
      "Christine Thémélidis signe la rénovation complète d'un appartement traversant de 160 m² au cœur de Cannes. Terrasses nord et sud, volumes repensés, finitions haut de gamme. Un projet d'exception au sein de la Résidence Gallia, publié dans le magazine Perspective N°49.",
    image: '/projects/gallia/gallia-1.jpg',
    color: '#364025',
    featured: true,
    stats: { surface: '160 m²', location: 'Cannes', mission: 'Rénovation complète' },
    pdfUrl: '/presse/perspective-n49.pdf',
    readUrl: 'https://www.magazine-perspective.com',
    gallery: [
      '/projects/gallia/gallia-1.jpg',
      '/projects/gallia/gallia-2.jpg',
      '/projects/gallia/gallia-3.jpg',
      '/projects/gallia/gallia-4.jpg',
      '/projects/gallia/gallia-5.jpg',
      '/projects/gallia/gallia-6.jpg',
      '/projects/gallia/gallia-plan.jpg',
    ],
  },
  {
    id: 2,
    media: 'Perspective',
    issue: 'N° 38',
    year: '2018',
    category: 'Résidence de prestige',
    headline: 'Magnifier le patrimoine azuréen',
    subheadline: 'Résidence Saint-Michel Valetta — La Californie, Cannes',
    excerpt:
      "Dans le prestigieux quartier de la Californie des hauts de Cannes, Christine Thémélidis signe la rénovation complète de la Résidence Saint-Michel Valetta. Sols en marbre Calacatta, boiseries sur mesure, luminaires dorés et vues panoramiques sur la Méditerranée : un projet d'exception mené avec rigueur, élégance et soin du détail.",
    image: '/presse/n38-photo-3.jpg',
    color: '#5A4E38',
    featured: false,
    stats: { surface: 'Résidence', location: 'La Californie, Cannes', mission: 'Rénovation complète' },
    pdfUrl: '/presse/perspective-n38.pdf',
    readUrl: 'https://www.magazine-perspective.com',
    gallery: [
      '/presse/n38-photo-1.jpg',
      '/presse/n38-photo-2.jpg',
      '/presse/n38-photo-3.jpg',
      '/presse/n38-photo-4.jpg',
      '/presse/n38-photo-5.jpg',
      '/presse/n38-photo-6.jpg',
      '/presse/n38-photo-7.jpg',
    ],
  },
  {
    id: 3,
    media: 'Perspective',
    issue: 'N° 31',
    year: '2014',
    category: 'Villa & Maîtrise d\'œuvre',
    headline: 'Rencontre édifiante',
    subheadline: 'Villa contemporaine — Roquefort-les-Pins',
    excerpt:
      "Christine Thémélidis et un architecte DPLG forment un tandem constructif autour d'une villa des années 70 à Roquefort-les-Pins. Structure imposante avec débord en porte-à-faux, toiture monopente, grandes baies vitrées et terrasse avec piscine. Une rénovation complète incarnant leur concept : Écoute – Adaptation – Détails.",
    image: '/projects/roquefort/roquefort-2.jpg',
    color: '#5A4E38',
    featured: false,
    stats: { surface: '300 m²', location: 'Roquefort-les-Pins', mission: 'Maîtrise d\'œuvre' },
    pdfUrl: '/presse/perspective-n31.pdf',
    readUrl: 'https://www.magazine-perspective.com',
    gallery: [
      '/projects/roquefort/roquefort-1.jpg',
      '/projects/roquefort/roquefort-2.jpg',
      '/projects/roquefort/roquefort-3.jpg',
      '/projects/roquefort/roquefort-4.jpg',
      '/projects/roquefort/roquefort-5.jpg',
    ],
  },
  {
    id: 5,
    media: 'Supplément Côte d\'Azur',
    issue: '',
    year: '2023',
    category: 'Art de vivre & Design',
    headline: 'L\'art de transformer les espaces',
    subheadline: 'Christine Thémélidis — Architecture-Design-Concept',
    excerpt:
      'Parisienne d\'origine, Christine Thémélidis rejoint la Côte d\'Azur en 1994 et intègre un bureau d\'architecture intérieure. Le temps d\'acquérir une solide expérience, et elle ouvre sa propre société douze ans plus tard. En 2010, désireuse d\'offrir à sa clientèle un service complet clé en main, elle s\'associe à Tobias Muller et lance Architecture-Design-Concept — un pôle architecture intérieure, consulting en décoration, suivi de chantier, création de mobilier et procédures administratives.',
    image: '/presse/supplement-cote-azur.jpg',
    color: '#5A4E38',
    featured: false,
    stats: { surface: 'Côte d\'Azur', location: 'Valbonne', mission: 'Portrait & réalisations' },
    pdfUrl: '/presse/supplement-cote-azur.pdf',
    readUrl: null,
    gallery: [
      '/presse/supplement-cote-azur.jpg',
    ],
  },
]

/* ── Logos médias partenaires ── */
const mediaLogos = [
  { name: 'Perspective', tagline: 'Magazine architecture & design', issues: '3 parutions' },
  { name: 'Supplément Côte d\'Azur', tagline: 'Art de vivre sur la Riviera', issues: '1 parution' },
  { name: 'Nice-Matin', tagline: 'Presse régionale', issues: 'À venir' },
  { name: 'Architectures PACA', tagline: 'Revue professionnelle', issues: 'À venir' },
]

/* ── Citations clés ── */
const keyQuotes = [
  {
    text: "Dans le prestigieux quartier de la Californie, Christine Thémélidis signe une rénovation d'exception où chaque détail — du marbre aux boiseries — témoigne d'un savoir-faire rare.",
    source: 'Rédaction Perspective',
    media: 'Perspective N°38',
  },
  {
    text: "Notre concept repose sur trois piliers fondamentaux : Écoute – Adaptation – Détails. Chaque projet est unique, chaque espace raconte une histoire.",
    source: 'Christine Thémélidis',
    media: 'Perspective N°31',
  },
  {
    text: "Au cœur de Cannes, la résidence Gallia incarne l'alliance parfaite entre élégance contemporaine et caractère d'exception.",
    source: 'Rédaction Perspective',
    media: 'Perspective N°49',
  },
]

/* ── Composant lettre animée ── */
function AnimatedLetter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 40, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{ display: 'inline-block', transformOrigin: 'bottom' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

/* ── Modal article avec carrousel ── */
function ArticleModal({ article, onClose }: { article: typeof pressArticles[0]; onClose: () => void }) {
  const [current, setCurrent] = useState(0)
  const gallery = article.gallery ?? []

  const prev = () => setCurrent(i => (i - 1 + gallery.length) % gallery.length)
  const next = () => setCurrent(i => (i + 1) % gallery.length)

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#F5F0E8] flex flex-col lg:flex-row"
          onClick={e => e.stopPropagation()}
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#364025] text-[#F5F0E8] flex items-center justify-center hover:bg-[#4a5633] transition-colors"
          >
            <X size={16} />
          </button>

          {/* Carrousel photos */}
          {gallery.length > 0 && (
            <div className="relative lg:w-1/2 shrink-0 bg-black">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={gallery[current]}
                    alt={`Photo ${current + 1}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation carrousel */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors backdrop-blur-sm"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition-colors backdrop-blur-sm"
                    >
                      <ChevronRight size={18} />
                    </button>
                    {/* Indicateurs */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                    {/* Compteur */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] tracking-wider px-2 py-1">
                      {current + 1} / {gallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Vignettes */}
              <div className="flex gap-1 p-2 bg-black/90 overflow-x-auto">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`shrink-0 w-14 h-10 overflow-hidden border-2 transition-all ${i === current ? 'border-[#F5F0E8]' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contenu texte */}
          <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Badge média */}
              <div className="flex items-center gap-3 mb-6">
                <PerspectiveBadge dark />
                <span className="text-[#5A4E38]/60 text-[10px] tracking-[0.4em] uppercase">{article.issue} · {article.year}</span>
              </div>

              <p className="text-[10px] tracking-[0.5em] uppercase text-[#5A4E38] mb-3">{article.category}</p>

              <h2 className="text-3xl text-[#364025] mb-2 leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                {article.headline}
              </h2>

              <p className="text-[#5A4E38] text-sm italic mb-5">{article.subheadline}</p>

              <div className="w-10 h-px bg-[#364025] mb-5" />

              <p className="text-[#1C1C1C]/70 text-sm leading-relaxed mb-8">{article.excerpt}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-[#364025]/5 border border-[#364025]/10 mb-8">
                {Object.entries(article.stats).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <p className="text-[#364025] font-medium text-sm">{val}</p>
                    <p className="text-[#5A4E38]/70 text-[10px] uppercase tracking-wider mt-0.5 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {article.pdfUrl && (
                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-[#364025] text-[#F5F0E8] px-5 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#4a5633] transition-colors"
                >
                  <Download size={12} />
                  Télécharger PDF
                </a>
              )}
              {article.readUrl && (
                <a
                  href={article.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#364025] text-[#364025] px-5 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#364025] hover:text-[#F5F0E8] transition-colors"
                >
                  <ExternalLink size={12} />
                  Voir le magazine
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Carte article vedette ── */
function FeaturedArticle({ article, onOpen }: { article: typeof pressArticles[0]; onOpen: () => void }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      onClick={onOpen}
      className="relative grid lg:grid-cols-2 gap-0 overflow-hidden border border-[#364025]/12 group cursor-pointer"
    >
      {/* Image avec parallax */}
      <div className="relative h-[400px] lg:h-[520px] overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.headline}
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        {/* Badge média */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-6 left-6 bg-[#364025]/85 backdrop-blur-sm px-4 py-2 flex items-center gap-2"
        >
          <PerspectiveBadge />
          <span className="text-[#F5F0E8]/70 text-[10px] tracking-widest">{article.issue}</span>
        </motion.div>
        {/* Indication "cliquer pour voir" */}
        <div className="absolute bottom-6 right-6 bg-white/15 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Voir les photos →
        </div>
      </div>

      {/* Contenu */}
      <div className="bg-[#F5F0E8] p-10 lg:p-14 flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[10px] tracking-[0.5em] uppercase text-[#5A4E38] mb-4 block"
        >
          {article.category} · {article.year}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl lg:text-4xl text-[#364025] mb-3 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          {article.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-[#5A4E38] text-sm mb-1 italic"
        >
          {article.subheadline}
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-px bg-[#364025] mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#1C1C1C]/75 text-sm leading-relaxed mb-8"
        >
          {article.excerpt}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-3 gap-4 mb-8 p-4 bg-[#364025]/5 border border-[#364025]/10"
        >
          {Object.entries(article.stats).map(([key, val]) => (
            <div key={key} className="text-center">
              <p className="text-[#364025] font-medium text-sm">{val}</p>
              <p className="text-[#5A4E38]/70 text-[10px] uppercase tracking-wider mt-0.5 capitalize">{key}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#364025]/60 group-hover:text-[#364025] transition-colors"
        >
          <BookOpen size={12} />
          <span>Cliquer pour voir la galerie complète</span>
        </motion.div>
      </div>
    </motion.article>
  )
}

/* ── Carte article secondaire ── */
function ArticleCard({ article, index, onOpen }: { article: typeof pressArticles[0]; index: number; onOpen: () => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const gallery = (article as any).gallery as string[] | undefined

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      onClick={onOpen}
      className="group overflow-hidden border border-[#364025]/10 bg-white cursor-pointer"
    >
      {/* Image principale */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.headline}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <PerspectiveBadge />
          <span className="text-white/80 text-[10px] tracking-wider">{article.year}</span>
        </div>
        {/* Overlay "voir galerie" */}
        <div className="absolute inset-0 bg-[#364025]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xs tracking-[0.3em] uppercase">Voir la galerie</span>
        </div>
      </div>

      {/* Galerie vignettes */}
      {gallery && gallery.length > 0 && (
        <div className="flex gap-1 px-2 pt-2 overflow-x-auto">
          {gallery.slice(0, 5).map((src, i) => (
            <div key={i} className="shrink-0 w-14 h-10 overflow-hidden rounded-sm">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {gallery.length > 5 && (
            <div className="shrink-0 w-14 h-10 bg-[#364025]/10 flex items-center justify-center rounded-sm">
              <span className="text-[#364025] text-[10px] font-medium">+{gallery.length - 5}</span>
            </div>
          )}
        </div>
      )}

      {/* Texte */}
      <div className="p-6">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#5A4E38] mb-3">{article.category}</p>
        <h3 className="text-xl text-[#364025] mb-2 leading-snug group-hover:text-[#5A4E38] transition-colors"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
          {article.headline}
        </h3>
        <p className="text-sm text-[#1C1C1C]/60 leading-relaxed line-clamp-3">{article.excerpt}</p>

        <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#364025]/10">
          <span className="text-[10px] tracking-wider text-[#5A4E38] uppercase">{article.issue}</span>
          <div className="flex items-center gap-3">
            {(article as any).readUrl && (
              <a
                href={(article as any).readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-[#364025] flex items-center gap-1 hover:text-[#5A4E38] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                Voir le mag <BookOpen size={10} />
              </a>
            )}
            {(article as any).pdfUrl && (
              <a
                href={(article as any).pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-[10px] tracking-[0.2em] uppercase text-[#364025] flex items-center gap-1 hover:text-[#5A4E38] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                PDF <Download size={10} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Logo média animé ── */
function MediaLogoCard({ logo, index }: { logo: typeof mediaLogos[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.04, borderColor: 'rgba(54,64,37,0.5)' }}
      className="relative group border border-[#364025]/15 bg-white p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-default overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-[#364025]"
        initial={{ y: '100%' }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />
      <div className="relative z-10">
        <motion.p
          className="text-2xl font-light tracking-[0.2em] text-[#364025] group-hover:text-[#F5F0E8] transition-colors duration-300"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {logo.name}
        </motion.p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#5A4E38] group-hover:text-[#889063] transition-colors duration-300 mt-2">
          {logo.tagline}
        </p>
        <div className="mt-3 px-3 py-1 border border-[#364025]/20 group-hover:border-[#889063]/40 inline-block transition-colors duration-300">
          <span className="text-[10px] text-[#364025]/60 group-hover:text-[#889063]/80 transition-colors duration-300">
            {logo.issues}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Page principale ── */
export function Presse() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [selectedArticle, setSelectedArticle] = useState<typeof pressArticles[0] | null>(null)

  const title = 'La presse en parle'

  return (
    <div className="overflow-hidden">

      {/* Modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-[70vh] min-h-[520px] flex items-end pb-20 overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="/presse-hero.jpg"
            alt="Presse AD Concept"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 container mx-auto px-6 lg:px-12"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[10px] tracking-[0.6em] uppercase text-[#F5F0E8]/60 mb-6"
          >
            Médias & publications · AD Concept
          </motion.p>

          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl mb-4 overflow-hidden"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
            {title.split('').map((char, i) => (
              <AnimatedLetter key={i} char={char} delay={0.4 + i * 0.03} />
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-white/70 text-base max-w-xl leading-relaxed"
          >
            Christine Thémélidis et les projets AD Concept à l'honneur dans la presse spécialisée.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'left' }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#F5F0E8]/30 via-[#F5F0E8]/30 to-transparent"
        />
      </section>

      {/* ── COMPTEURS ── */}
      <section className="bg-[#364025] py-12 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '4', label: 'Articles publiés' },
              { n: '2', label: 'Magazines différents' },
              { n: '20+', label: 'Années d\'expertise' },
              { n: '100%', label: 'Projets sur mesure' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl text-[#F5F0E8] mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                  {item.n}
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#F5F0E8]/70">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE VEDETTE ── */}
      <section className="py-12 lg:py-14 bg-[#F5F0E8]">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-10">
            <h2 className="text-4xl lg:text-5xl text-[#364025]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Parutions récentes
            </h2>
          </AnimatedSection>

          <FeaturedArticle article={pressArticles[0]} onOpen={() => setSelectedArticle(pressArticles[0])} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-8 bg-[#364025] overflow-hidden border-y border-[#F5F0E8]/10">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12">
              {mediaLogos.map((m) => (
                <span key={m.name} className="text-[#F5F0E8]/50 text-xs tracking-[0.5em] uppercase whitespace-nowrap">
                  {m.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── TOUS LES ARTICLES ── */}
      <section className="py-12 lg:py-14 bg-[#F5F0E8]">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-10">
            <h2 className="text-3xl lg:text-4xl text-[#364025]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Toutes les publications
            </h2>
            <p className="text-[#5A4E38]/70 text-sm mt-3 max-w-lg leading-relaxed">
              Cliquez sur un article pour découvrir la galerie complète et télécharger la publication.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} onOpen={() => setSelectedArticle(article)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CITATIONS PRESSE ── */}
      <section className="py-12 lg:py-14 bg-[#364025] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-[#F5F0E8]/5" />
          <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-[#F5F0E8]/5" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection className="text-center mb-10">
            <Quote size={32} className="text-[#F5F0E8]/30 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl text-[#F5F0E8]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              La presse parle de notre travail
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {keyQuotes.map((quote, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative border-l-2 border-[#F5F0E8]/30 pl-8 py-2"
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                  style={{ transformOrigin: 'top' }}
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#F5F0E8]/40"
                />
                <Quote size={20} className="text-[#F5F0E8]/25 mb-4" />
                <p className="text-[#F5F0E8]/85 text-lg leading-relaxed italic mb-6"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                  « {quote.text} »
                </p>
                <footer>
                  <p className="text-[#F5F0E8]/70 text-xs tracking-[0.3em] uppercase font-medium">{quote.source}</p>
                  <p className="text-[#F5F0E8]/40 text-[10px] tracking-wider mt-1">{quote.media}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS MÉDIAS ── */}
      <section className="py-12 lg:py-14 bg-[#F5F0E8]">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-10">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#5A4E38] mb-4">Ils nous font confiance</p>
            <h2 className="text-3xl lg:text-4xl text-[#364025]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Médias & publications
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaLogos.map((logo, i) => (
              <MediaLogoCard key={logo.name} logo={logo} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <AnimatedSection>
        <section className="py-12 bg-[#F5F0E8] border-t border-[#364025]/10">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#5A4E38] mb-6">Votre projet</p>
              <h2 className="text-3xl lg:text-4xl text-[#364025] mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
                Un savoir-faire reconnu,<br /><em>au service de votre projet</em>
              </h2>
              <p className="text-[#5A4E38]/70 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
                Ces publications témoignent d'une exigence constante et d'une vision affirmée de l'architecture d'intérieur. Confiez-nous votre projet — nous vous apportons la même rigueur, la même attention au détail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 bg-[#364025] text-[#F5F0E8] hover:bg-[#4a5633] transition-all duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                >
                  Discuter de mon projet
                </Link>
                <Link
                  to="/realisations"
                  className="inline-flex items-center justify-center gap-3 border border-[#364025] text-[#364025] hover:bg-[#364025] hover:text-[#F5F0E8] transition-all duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                >
                  Voir les réalisations
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  )
}
