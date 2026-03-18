import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowRight, CheckCircle2, Shield, Clock, Users, Ruler } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const steps = [
  {
    number: '01',
    title: 'Rencontre & cahier des charges',
    description: 'Premier échange pour cerner votre projet, votre budget, vos contraintes et vos attentes. On pose ensemble les bases du projet.',
    icon: Users,
  },
  {
    number: '02',
    title: 'Écoute et compréhension du projet',
    description: 'Je prends le temps de comprendre votre mode de vie, vos habitudes, vos aspirations. Le projet se construit à partir de vous, pas d\'une vision imposée.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Relevé précis du bien',
    description: 'Mesures précises, analyse des volumes, identification des contraintes techniques, structurelles et réglementaires. Rien ne doit être laissé au hasard.',
    icon: Ruler,
  },
  {
    number: '04',
    title: 'Avant-projet & validation',
    description: 'Plusieurs pistes de conception (APS) vous sont soumises. Chaque option est discutée jusqu\'à validation de la direction finale, avec vous, pas pour vous.',
    icon: Shield,
  },
  {
    number: '05',
    title: 'Sélection des matériaux, finitions & DQE',
    description: 'Choix des matériaux, des finitions et des équipements. Élaboration du descriptif quantitatif estimatif (DQE) pour chiffrer précisément chaque prestation.',
    icon: Shield,
  },
  {
    number: '06',
    title: 'Plans d\'exécution & plans de détails',
    description: 'Dossier technique complet : plans d\'exécution, coupes, élévations, plans de détails. Ce dossier est la colonne vertébrale du chantier, il prévient les mauvaises surprises.',
    icon: Ruler,
  },
  {
    number: '07',
    title: 'Consultation, analyse des devis & planification',
    description: 'Consultation des entreprises, analyse comparative des devis, sélection rigoureuse. Planification coordonnée des interventions pour un chantier maîtrisé.',
    icon: Clock,
  },
  {
    number: '08',
    title: 'Suivi de chantier, réception & levée de réserves',
    description: 'Présence terrain, réunions de chantier, contrôle qualité. Si une découverte impose un ajustement, je réagis vite. Réception avec PV et levée de réserves pour clôturer en bonne et due forme.',
    icon: CheckCircle2,
  },
]

const milestones = [
  { year: '2006', event: 'Création d\'AD Concept à Valbonne' },
  { year: '2008', event: 'Premiers projets de villas sur la Côte d\'Azur' },
  { year: '2009', event: 'Partenariat et collaboration durable avec des marchands de biens, toujours en cours' },
  { year: '2013', event: 'Première parution dans la presse spécialisée' },
  { year: '2019', event: 'Extension de la zone d\'intervention en Europe' },
  { year: '2024', event: 'Plus de 200 projets réalisés' },
  { year: '2026', event: '20 années d\'accompagnement : nouvelle identité, même exigence' },
]

const engagements = [
  { title: 'Assurance maîtrise d\'œuvre', desc: 'Couverture professionnelle pour chaque chantier' },
  { title: 'Respect du budget', desc: 'Estimation précise dès la phase de conception' },
  { title: 'Respect des délais', desc: 'Planning structuré et suivi régulier' },
  { title: 'Présence terrain', desc: 'Visites de chantier hebdomadaires minimum' },
]

export function Methode() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div ref={heroRef} className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <img
            src="/methode-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
        </motion.div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection>
            <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">Notre approche</span>
            <h1 className="text-primary-foreground mb-6">
              Maîtrise d'œuvre &<br />
              <em>Suivi de chantier</em>
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl leading-relaxed text-lg">
              La réussite d'un chantier repose sur la qualité de sa préparation. Plus un projet est structuré en amont, plus sa réalisation est fluide.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Intro */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <h2 className="text-primary mb-6">Une méthode éprouvée en 20 ans d'exercice</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Chaque projet est unique, qu'il s'agisse de rénovation, de réhabilitation ou de construction. Pourtant, la méthode qui garantit sa réussite obéit à une logique constante : écoute, analyse, conception, préparation, exécution.
                </p>
                <p>
                  En tant que maître d'œuvre assurée, je suis le fil directeur de votre projet, de la première réunion jusqu'à la remise des clés. Mon rôle est de vous protéger des risques et de vous offrir une expérience sereine et un univers qui correspond à vos attentes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {engagements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-primary/5 p-5 border-l-2 border-secondary"
                  >
                    <h4 className="text-primary text-sm font-medium mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Missions — affiché avant le processus */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="mb-10 text-center">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Nos missions</span>
            <h2 className="text-primary">Rénovation, construction & maîtrise d'œuvre</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="p-8 border border-border h-full">
                <span className="text-xs tracking-[0.3em] uppercase text-secondary block mb-4">Mission partielle</span>
                <h3 className="text-primary text-2xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Mission de conception
                </h3>
                <p className="text-foreground/70 text-sm mb-6 leading-relaxed">
                  Idéal pour les clients souhaitant piloter eux-mêmes le chantier tout en bénéficiant d'une conception professionnelle et d'un dossier technique rigoureux.
                </p>
                <ul className="space-y-2">
                  {['Analyse du bien existant', 'Avant-projets (APS)', 'Plans détaillés', 'Sélection matériaux & finitions', 'Dossier technique', 'DQE estimatif', 'Consultation des entreprises'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="w-1 h-1 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="p-8 bg-primary text-white h-full relative overflow-hidden">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-white/5" />
                <span className="text-xs tracking-[0.3em] uppercase text-white/60 block mb-4 relative z-10">Mission complète</span>
                <h3 className="text-white text-2xl mb-4 relative z-10" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Mission complète : conception & maîtrise d'œuvre
                </h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed relative z-10">
                  En tant que maître d'œuvre assurée, je suis responsable du bon déroulement du chantier et du respect des engagements définis en amont.
                </p>
                <ul className="space-y-2 relative z-10">
                  {['Conception intégrale', 'Dossier technique complet', 'Consultation des entreprises', 'Planification des travaux', 'Coordination des corps d\'état', 'Suivi de chantier régulier', 'Réception des travaux'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/85">
                      <CheckCircle2 size={12} className="text-white/90 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Steps — processus détaillé après les missions */}
      <section className="py-14 bg-primary/3">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Processus</span>
            <h2 className="text-primary">Les 8 étapes d'un projet réussi</h2>
            <div className="w-16 h-px bg-secondary mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-x-12">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <motion.div
                  className="group flex gap-8 items-start py-8 border-b border-border hover:bg-background/50 px-4 -mx-4 rounded-sm transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="shrink-0">
                    <span
                      className="text-5xl text-primary/35 group-hover:text-secondary/60 transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-primary mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem' }}>
                      {step.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Frise chronologique */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Histoire</span>
            <h2 className="text-primary">20 ans sur la Côte d'Azur</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {milestones.map((m, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className={`p-6 h-full group transition-colors duration-300 ${
                  m.year === '2026' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-primary/5'
                }`}>
                  <span
                    className={`block text-4xl mb-4 ${m.year === '2026' ? 'text-white/30' : 'text-secondary/25'}`}
                    style={{ fontFamily: 'Cormorant Garamond, serif', lineHeight: 1 }}
                  >
                    {m.year}
                  </span>
                  <div className={`w-6 h-px mb-3 transition-all duration-300 group-hover:w-10 ${
                    m.year === '2026' ? 'bg-white/40' : 'bg-secondary/50'
                  }`} />
                  <p className={`text-sm leading-relaxed ${m.year === '2026' ? 'text-white/80' : 'text-foreground/70'}`}>
                    {m.event}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-secondary/10 text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-primary mb-4">Parlons de votre projet</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Chaque projet débute par une rencontre. Décrivez-nous votre besoin et nous vous proposons la mission adaptée.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300"
            >
              Discuter de mon projet
              <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}