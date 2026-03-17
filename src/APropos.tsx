import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight, Award, MapPin, Quote } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const values = [
  {
    title: 'Écoute',
    description: 'Tout commence par l\'écoute. Je prends le temps de comprendre votre mode de vie, vos habitudes, vos aspirations avant de concevoir quoi que ce soit.',
  },
  {
    title: 'Adaptation',
    description: 'Je ne construis pas une vision pour me faire plaisir. Chaque projet se construit avec vous, à partir de ce que vous êtes et de ce que vous vivez.',
  },
  {
    title: 'Anticipation',
    description: 'Un dossier technique rigoureux en amont, c\'est la garantie d\'un chantier mieux maîtrisé — moins d\'imprévus, moins de stress, plus de sérénité.',
  },
  {
    title: 'Engagement',
    description: 'Le respect du budget et des délais n\'est pas une promesse, c\'est un engagement. Et si le chantier impose des ajustements, je suis là pour réagir vite.',
  },
]

const timeline = [
  { year: '2006', event: 'Création d\'AD Concept à Valbonne' },
  { year: '2008', event: 'Premiers projets de villas sur la Côte d\'Azur' },
  { year: '2009', event: 'Partenariat avec des marchands de biens' },
  { year: '2014', event: 'Première parution dans la presse spécialisée (Perspective)' },
  { year: '2019', event: 'Extension de la zone d\'intervention à 100 km' },
  { year: '2024', event: 'Plus de 200 projets réalisés — 20 ans d\'expertise' },
  { year: '2026', event: '20 années d\'accompagnement — nouvelle identité, même exigence' },
]

export function APropos() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="pt-28 pb-0 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <AnimatedSection>
              <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">À propos</span>
              <h1 className="text-primary-foreground mb-6">
                Christine<br />
                <em>Thémélidis</em>
              </h1>
              <p className="text-white/80 text-sm tracking-[0.2em] uppercase">
                Architecte d'intérieur & Maître d'œuvre · Valbonne
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" className="hidden lg:block">
              <div className="text-right">
                <p
                  className="text-primary-foreground/80 text-5xl lg:text-6xl leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
                >
                  20 années
                </p>
                <p
                  className="text-primary-foreground/60 text-xl tracking-[0.15em] uppercase mt-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
                >
                  d'expérience à vos côtés
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 80" className="w-full fill-background -mb-px" preserveAspectRatio="none">
          <path d="M0,80 L0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,80 Z" />
        </svg>
      </div>

      {/* Intro portrait */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Portrait — réduit de ~30% */}
            <AnimatedSection className="lg:col-span-2" direction="left">
              <div className="relative max-w-[70%]">
                <div className="img-zoom aspect-[3/4] overflow-hidden rounded-sm">
                  <img
                    src="/about/christine.jpg"
                    alt="Christine Thémélidis — AD Concept"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-secondary p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Award size={14} />
                    <span className="text-xs tracking-wider">Maître d'œuvre assurée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span className="text-xs tracking-wider">Valbonne, 06</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection className="lg:col-span-3" direction="right">
              <h2 className="text-primary mb-6">Depuis 2006, chaque projet est une aventure menée ensemble.</h2>

              <div className="space-y-4 text-foreground/70 leading-relaxed mb-8">
                <p>
                  Rénovation, réhabilitation, construction, maîtrise d'œuvre — depuis 2006, j'accompagne particuliers et professionnels dans des projets sur mesure dans les Alpes-Maritimes et au-delà.
                </p>
                <p>
                  Ce qui me distingue, c'est d'abord une relation client forte. Avant de concevoir quoi que ce soit, je prends le temps de comprendre ce que vous vivez, comment vous habitez, ce que vous projetez. Les attentes réelles, pas les attentes supposées.
                </p>
                <p>
                  Chaque chantier est anticipé en amont avec rigueur : un dossier technique solide, une sélection des entreprises exigeante, une planification réaliste. Cette préparation, c'est ce qui vous évite les mauvaises surprises et me permet d'être pleinement à vos côtés jusqu'à la réception.
                </p>
              </div>

              {/* Quote */}
              <div className="bg-primary/5 p-6 border-l-4 border-secondary mb-8">
                <Quote size={20} className="text-secondary mb-3" />
                <p className="text-primary text-lg italic leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  « Un projet de rénovation ou de construction, c'est avant tout une aventure commune. Mon engagement : comprendre, anticiper, et construire avec vous — pas pour vous. »
                </p>
                <p className="text-muted-foreground text-xs mt-3 tracking-wider">— Christine Thémélidis</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { number: '20+', label: 'Ans d\'expérience' },
                  { number: '200+', label: 'Projets réalisés' },
                  { number: '06 · 83', label: '& Monaco' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 border border-border">
                    <div className="text-2xl text-primary" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {stat.number}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-primary/5">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Mes valeurs</span>
            <h2 className="text-primary">L'excellence au service de votre espace</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  className="p-6 bg-background border border-border group hover:border-secondary transition-all duration-300 h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 border border-secondary/30 flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                    <span className="text-secondary text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                  <h3 className="text-primary mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 400 }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Parcours</span>
            <h2 className="text-primary">20 ans sur la Côte d'Azur</h2>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} direction="left">
                  <div className="flex gap-8 items-center pl-8 relative">
                    <div className="absolute -left-[5px] w-[11px] h-[11px] rounded-full border-2 border-secondary bg-background" />
                    <span className="text-2xl text-primary/30 shrink-0 w-16" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {item.year}
                    </span>
                    <p className="text-foreground/70">{item.event}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Presse mention */}
      <section className="py-12 bg-primary text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection>
            <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">Presse spécialisée</p>
            <p className="text-primary-foreground/70 text-sm max-w-xl mx-auto mb-8">
              Projets parus dans la presse spécialisée et plateformes professionnelles. Une reconnaissance de la qualité et de l'originalité des réalisations AD Concept.
            </p>
            <Link
              to="/realisations"
              className="inline-flex items-center gap-3 border border-secondary/50 text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-secondary/20 transition-colors duration-300"
            >
              Voir les réalisations
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
