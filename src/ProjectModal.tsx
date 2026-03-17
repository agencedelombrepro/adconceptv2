import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Calendar, Briefcase, Clock, ArrowUpRight, Download, BookOpen } from 'lucide-react'
import { Link } from 'react-router'

type Project = {
  id: number
  slug: string
  title: string
  category: string
  location: string
  surface: string
  year: string
  image: string
  tags: string[]
  description: string
  mission: string
  budget: string
  duration: string
  gallery: string[]
  pressArticle?: { media: string; issue: string; pdfUrl: string }
}

type Props = {
  project: Project | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Reset image index when project changes
  useEffect(() => {
    setActiveImg(0)
    setLightboxOpen(false)
  }, [project?.id])

  // Fermeture ESC + navigation clavier
  useEffect(() => {
    if (!project) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false)
        else onClose()
      }
      if (e.key === 'ArrowRight') {
        if (lightboxOpen && project.gallery) {
          setActiveImg(i => (i + 1) % project.gallery.length)
        } else if (hasNext) onNext?.()
      }
      if (e.key === 'ArrowLeft') {
        if (lightboxOpen && project.gallery) {
          setActiveImg(i => (i - 1 + project.gallery.length) % project.gallery.length)
        } else if (hasPrev) onPrev?.()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [project, lightboxOpen, hasPrev, hasNext, onClose, onNext, onPrev])

  // Blocage scroll body
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  if (!project) return null

  const gallery = project.gallery?.length ? project.gallery : [project.image]

  return (
    <>
      <AnimatePresence>
        {project && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <motion.div
                className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-none shadow-2xl pointer-events-auto flex flex-col md:flex-row"
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                onClick={e => e.stopPropagation()}
              >
                {/* ─── Colonne gauche : galerie ─── */}
                <div className="md:w-[55%] relative bg-black shrink-0 overflow-hidden" style={{ minHeight: '320px' }}>
                  {/* Image principale */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={gallery[activeImg]}
                      alt={project.title}
                      className="w-full h-full object-cover cursor-zoom-in"
                      style={{ maxHeight: '90vh' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setLightboxOpen(true)}
                    />
                  </AnimatePresence>

                  {/* Gradient bas + numérotation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
                    <div className="flex gap-2">
                      {gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          className={`transition-all duration-200 rounded-full ${
                            idx === activeImg
                              ? 'w-6 h-1.5 bg-white'
                              : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>

                  {/* Flèches galerie */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors rounded-full"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setActiveImg(i => (i + 1) % gallery.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition-colors rounded-full"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Miniatures */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-10 left-0 right-0 px-4 overflow-x-auto hidden md:flex gap-2 pb-1">
                      {/* les dots remplacent les miniatures pour garder le style épuré */}
                    </div>
                  )}
                </div>

                {/* ─── Colonne droite : infos ─── */}
                <div className="md:w-[45%] overflow-y-auto flex flex-col">
                  {/* Header infos */}
                  <div className="p-8 pb-0">
                    {/* Badge catégorie */}
                    <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-primary/70 bg-primary/8 px-3 py-1 mb-5">
                      {project.category}
                    </span>

                    <h2
                      className="text-2xl md:text-3xl leading-tight text-foreground mb-4"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
                    >
                      {project.title}
                    </h2>

                    {/* Méta-données */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={13} className="text-primary/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Lieu</p>
                          <p className="text-sm text-foreground">{project.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Maximize2 size={13} className="text-primary/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Surface</p>
                          <p className="text-sm text-foreground">{project.surface}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Calendar size={13} className="text-primary/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Année</p>
                          <p className="text-sm text-foreground">{project.year}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock size={13} className="text-primary/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Durée</p>
                          <p className="text-sm text-foreground">{project.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Séparateur */}
                    <div className="w-12 h-px bg-primary/30 mb-6" />

                    {/* Mission */}
                    <div className="flex items-start gap-2.5 mb-6">
                      <Briefcase size={13} className="text-primary/60 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">Mission</p>
                        <p className="text-sm text-foreground">{project.mission}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Badge presse si disponible */}
                    {(project as any).pressArticle && (
                      <div className="flex items-center justify-between bg-primary/5 border border-primary/15 px-4 py-3 mb-6">
                        <div className="flex items-center gap-3">
                          <img src="/presse/logo-perspective.png" alt="Perspective" className="h-5 object-contain" />
                          <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-primary/70">Vu dans la presse</p>
                            <p className="text-xs text-primary font-medium">{(project as any).pressArticle.issue}</p>
                          </div>
                        </div>
                        <a
                          href={(project as any).pressArticle.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-primary hover:text-secondary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={11} /> PDF
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-auto p-8 pt-0">
                    <div className="border-t border-border pt-6">
                      <Link
                        to="/contact"
                        onClick={onClose}
                        className="group flex items-center justify-between w-full bg-primary text-primary-foreground px-6 py-4 hover:bg-primary/90 transition-colors"
                      >
                        <span className="text-xs tracking-[0.3em] uppercase">Discuter d'un projet similaire</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bouton fermer */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors rounded-full"
                >
                  <X size={16} />
                </button>

                {/* Navigation entre projets */}
                {hasPrev && (
                  <button
                    onClick={onPrev}
                    className="absolute left-[-48px] top-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                {hasNext && (
                  <button
                    onClick={onNext}
                    className="absolute right-[-48px] top-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors rounded-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors z-10"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={16} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg]}
                alt={`${project.title} — photo ${activeImg + 1}`}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                onClick={e => e.stopPropagation()}
              />
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + gallery.length) % gallery.length) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % gallery.length) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
                  {activeImg + 1} / {gallery.length}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
