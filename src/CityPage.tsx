import { Link } from 'react-router'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { projects } from './projects'

interface CityPageProps {
  cityName: string
  slug: string
}

const cityImages: Record<string, string> = {
  valbonne:     '/valbonne-ville.jpg',
  cannes:       '/cannes-ville.jpg',
  mougins:      '/mougins-ville.jpg',
  antibes:      '/antibes-ville.jpg',
  nice:         '/nice-ville.jpg',
  monaco:       '/monaco-ville.jpg',
  'saint-tropez': '/saint-tropez-ville.jpg',
  grasse:       '/grasse-ville.jpg',
}

export function CityPage({ cityName, slug }: CityPageProps) {
  const image = cityImages[slug] || cityImages.valbonne

  // Projets réels correspondant à cette ville
  const cityProjects = projects.filter(p =>
    p.location.toLowerCase().includes(slug === 'saint-tropez' ? 'saint' : slug)
  )

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src={image} alt={cityName} className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection>
            <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">
              Zone d'intervention
            </span>
            <h1 className="text-primary-foreground mb-4">
              Architecte d'intérieur<br />
              <em>à {cityName}</em>
            </h1>
            <p className="text-white/70 text-sm tracking-wider">
              Rénovation & Maîtrise d'œuvre – AD Concept
            </p>
          </AnimatedSection>
        </div>
        <svg viewBox="0 0 1440 60" className="w-full fill-background -mb-px" preserveAspectRatio="none">
          <path d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z" />
        </svg>
      </div>

      {/* Intro SEO */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-primary mb-6">
                Rénovation & architecture d'intérieur à {cityName}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Vous recherchez un architecte d'intérieur à {cityName} pour un projet de rénovation, de transformation ou d'aménagement complet ?
                </p>
                <p>
                  Depuis 2006, AD Concept accompagne particuliers et professionnels dans la conception et la réalisation de projets sur mesure dans les Alpes-Maritimes. Basée à Valbonne, j'interviens régulièrement à {cityName}, que ce soit pour des rénovations d'appartements, des transformations de villas ou des projets professionnels.
                </p>
                <p>
                  Chaque projet est conçu avec rigueur, dans le respect du budget défini et des délais annoncés.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="img-zoom aspect-[4/3] overflow-hidden rounded-sm">
                <img src={image} alt={`Architecte d'intérieur ${cityName}`} className="w-full h-full object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Réalisations réelles pour cette ville */}
      {cityProjects.length > 0 && (
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection className="mb-10">
              <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-3">Réalisations</span>
              <h2 className="text-primary">Nos projets à {cityName}</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityProjects.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <Link to={`/realisations/${project.slug}`} className="group block overflow-hidden border border-border bg-background hover:border-primary/30 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1">
                          {project.category}
                        </span>
                      </div>
                      {(project as any).pressArticle && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] tracking-wider uppercase text-white bg-[#364025]/80 backdrop-blur-sm px-2 py-1">
                            Perspective {(project as any).pressArticle.issue}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-primary text-lg mb-1 group-hover:text-secondary transition-colors"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{project.surface}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Missions */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-10">
            <h2 className="text-primary">Nos missions à {cityName}</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="p-6 bg-background border border-border">
                <h3 className="text-primary mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400, fontSize: '1.4rem' }}>
                  Types de projets
                </h3>
                <ul className="space-y-2">
                  {[
                    'Rénovation complète d\'appartements',
                    'Restructuration de villas',
                    'Optimisation des volumes',
                    'Mise en valeur de la lumière naturelle',
                    'Coordination des corps d\'état',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                      <CheckCircle2 size={14} className="text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="p-6 bg-primary text-primary-foreground">
                <h3 className="text-primary-foreground mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400, fontSize: '1.4rem' }}>
                  Maîtrise d'œuvre à {cityName}
                </h3>
                <ul className="space-y-2">
                  {[
                    'Consultation des entreprises',
                    'Analyse des devis',
                    'Planification des travaux',
                    'Coordination des intervenants',
                    'Contrôle qualité & réception',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <CheckCircle2 size={14} className="text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-primary">Une approche rigoureuse et personnalisée</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Plus de 20 ans d\'expérience',
              'Présence terrain réelle',
              'Respect du budget',
              'Respect des délais',
              'Relation de confiance',
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center p-4 border border-border bg-background">
                <p className="text-xs text-foreground/70 leading-relaxed">{item}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-primary-foreground mb-4">Un projet à {cityName} ?</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto text-sm">
              Décrivez votre projet et obtenez une réponse personnalisée sous 4 jours ouvrés.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-secondary hover:text-primary-foreground transition-colors duration-300"
            >
              Discuter de mon projet
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* SEO links */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-xs text-muted-foreground mb-4 tracking-wider uppercase">Zones proches</p>
          <div className="flex flex-wrap gap-3">
            {[
              { city: 'Valbonne',     to: '/architecte-interieur-valbonne' },
              { city: 'Cannes',       to: '/architecte-interieur-cannes' },
              { city: 'Mougins',      to: '/architecte-interieur-mougins' },
              { city: 'Antibes',      to: '/architecte-interieur-antibes' },
              { city: 'Nice',         to: '/architecte-interieur-nice' },
              { city: 'Monaco',       to: '/architecte-interieur-monaco' },
              { city: 'Saint-Tropez', to: '/architecte-interieur-saint-tropez' },
              { city: 'Grasse',       to: '/architecte-interieur-grasse' },
            ].filter(l => !l.to.includes(slug)).map(link => (
              <Link
                key={link.city}
                to={link.to}
                className="text-xs text-muted-foreground hover:text-primary transition-colors border border-border px-4 py-2 rounded-full hover:border-primary"
              >
                Architecte d'intérieur {link.city}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
