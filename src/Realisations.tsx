import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Filter, ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { ProjectModal } from './ProjectModal'
import { projects } from './projects'

const filters = ['Tous', 'Villa', 'Appartement', 'Rénovation', 'Conception']

export function Realisations() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = activeFilter === 'Tous'
    ? projects
    : projects.filter(p =>
        p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
      )

  const selectedIndex = filtered.findIndex(p => p.id === selectedId)
  const selectedProject = selectedIndex >= 0 ? filtered[selectedIndex] : null

  const openProject = (id: number) => setSelectedId(id)
  const closeProject = () => setSelectedId(null)
  const prevProject = () => {
    if (selectedIndex > 0) setSelectedId(filtered[selectedIndex - 1].id)
  }
  const nextProject = () => {
    if (selectedIndex < filtered.length - 1) setSelectedId(filtered[selectedIndex + 1].id)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/projects/villa-mougins-1.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection>
            <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">Portfolio</span>
            <h1 className="text-white mb-6">
              Réalisations en<br />
              <em>Alpes-Maritimes</em>
            </h1>
            <p className="text-white/75 max-w-2xl leading-relaxed">
              Depuis 2006, AD Concept intervient sur des projets de rénovation de villas, d'appartements et d'espaces professionnels à Valbonne, Cannes, Mougins, Antibes et dans l'ensemble du département 06.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[60px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-200 pb-1 ${
                  activeFilter === filter
                    ? 'text-primary border-b border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 lg:px-12 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative cursor-pointer overflow-hidden"
                style={{ aspectRatio: '4/3' }}
                onClick={() => openProject(project.id)}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
                />

                {/* Overlay permanent léger */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Overlay hover complet */}
                <motion.div
                  className="absolute inset-0 bg-[#364025]/80"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />

                {/* Infos permanentes en bas */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-1">
                    {project.category} · {project.location}
                  </p>
                  <h3
                    className="text-white text-xl leading-snug"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Infos hover — surface + année + icône */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 pointer-events-none">
                  <div className="flex items-center gap-6 text-white/80 text-xs tracking-[0.3em] uppercase mb-4">
                    <span>{project.surface}</span>
                    <span className="w-px h-4 bg-white/30" />
                    <span>{project.year}</span>
                  </div>
                  <div className="w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                  <p className="text-white/60 text-[10px] tracking-[0.3em] uppercase mt-3">Voir le projet</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
        onPrev={prevProject}
        onNext={nextProject}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex < filtered.length - 1}
      />
    </div>
  )
}
