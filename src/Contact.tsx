import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Mail, Clock, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { LogoAD } from './LogoAD'

/* ── Types ── */
type FormData = {
  name: string
  email: string
  city: string
  projectType: string[]
  propertyType: string
  surface: string
  projectFor: string
  mission: string
  budget: string
  timeline: string
  projectStatus: string
  description: string
  howDidYouHear: string
  commitment: boolean
}

const INITIAL: FormData = {
  name: '', email: '', city: '',
  projectType: [], propertyType: '', surface: '',
  projectFor: '', mission: '', budget: '', timeline: '',
  projectStatus: '', description: '', howDidYouHear: '',
  commitment: false,
}

/* ── Options ── */
const PROJECT_TYPES = [
  { value: 'renovation-complete', label: 'Rénovation complète' },
  { value: 'renovation-partielle', label: 'Rénovation partielle' },
  { value: 'construction-extension', label: 'Construction / agrandissement' },
  { value: 'amenagement-interieur', label: 'Aménagement intérieur' },
  { value: 'local-professionnel', label: 'Local professionnel (bureau / restaurant / commerce)' },
]

const PROPERTY_TYPES = [
  { value: 'appartement', label: 'Appartement' },
  { value: 'villa', label: 'Villa / maison' },
  { value: 'loft', label: 'Loft' },
  { value: 'local', label: 'Local professionnel' },
  { value: 'autre', label: 'Autre' },
]

const SURFACES = [
  { value: 'moins-50', label: 'Moins de 50 m\u00b2' },
  { value: '50-100', label: '50 - 100 m\u00b2' },
  { value: '100-200', label: '100 - 200 m\u00b2' },
  { value: 'plus-200', label: 'Plus de 200 m\u00b2' },
]

const PROJECT_FOR = [
  { value: 'residence-principale', label: 'Résidence principale' },
  { value: 'residence-secondaire', label: 'Résidence secondaire' },
  { value: 'investissement', label: 'Investissement immobilier' },
  { value: 'professionnel', label: 'Projet professionnel' },
]

const MISSIONS = [
  { value: 'conception', label: 'Conception uniquement (plans + projet)' },
  { value: 'complete', label: 'Mission complète avec suivi de chantier (maîtrise d\'\u0153uvre)' },
  { value: 'sais-pas', label: 'Je ne sais pas encore' },
]

const BUDGETS = [
  { value: 'moins-50k', label: 'Moins de 50 000 \u20ac' },
  { value: '50k-150k', label: '50 000 - 150 000 \u20ac' },
  { value: '150k-300k', label: '150 000 - 300 000 \u20ac' },
  { value: 'plus-300k', label: '300 000 \u20ac et plus' },
]

const TIMELINES = [
  { value: 'asap', label: 'Dès que possible' },
  { value: '3-mois', label: 'Dans 3 mois' },
  { value: '6-mois', label: 'Dans 6 mois' },
  { value: 'plus-6-mois', label: 'Dans plus de 6 mois' },
]

const PROJECT_STATUS = [
  { value: 'reflexion', label: 'Simple réflexion' },
  { value: 'recherche', label: 'Recherche d\'architecte d\'intérieur' },
  { value: 'plans-ok', label: 'Plans déjà réalisés' },
  { value: 'entreprises', label: 'Entreprises déjà consultées' },
]

const HOW = [
  { value: 'recommandation', label: 'Recommandation' },
  { value: 'google', label: 'Google' },
  { value: 'presse', label: 'Presse / publication' },
  { value: 'reseaux', label: 'Réseaux sociaux' },
  { value: 'autre', label: 'Autre' },
]

/* ── Composants UI réutilisables ── */
function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.45em] uppercase text-[#5A4E38]/70 mb-3 font-medium">
      {children}
    </p>
  )
}

function InputField({
  label, name, type = 'text', value, onChange, placeholder, required = false
}: {
  label: string; name: string; type?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; required?: boolean
}) {
  return (
    <div className="group">
      <label className="text-[10px] tracking-[0.35em] uppercase text-[#5A4E38]/70 block mb-2">
        {label}{required && ' *'}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border-b-2 border-[#364025]/20 bg-transparent py-3 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#364025] transition-colors duration-300 placeholder:text-[#1C1C1C]/30"
        />
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#364025]"
          initial={{ width: 0 }}
          whileFocus={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

function ChoiceCard({
  label, selected, onClick
}: {
  label: string; value?: string; selected: boolean; onClick: () => void; multi?: boolean
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left px-5 py-3.5 border transition-all duration-200 text-sm flex items-center gap-3 ${
        selected
          ? 'border-[#364025] bg-[#364025] text-[#F5F0E8]'
          : 'border-[#364025]/20 bg-white text-[#1C1C1C]/80 hover:border-[#364025]/50 hover:bg-[#364025]/4'
      }`}
    >
      <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
        selected
          ? 'border-[#F5F0E8] bg-[#F5F0E8]/20'
          : 'border-[#364025]/30'
      }`}>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="block w-2 h-2 bg-[#F5F0E8]"
          />
        )}
      </span>
      {label}
    </motion.button>
  )
}

/* ── Barre de progression ── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#5A4E38]/60">
          Quelques questions rapides
        </span>
        <span className="text-[10px] text-[#364025]/60">{Math.round((current / total) * 100)}%</span>
      </div>
      <div className="h-0.5 bg-[#364025]/10 w-full">
        <motion.div
          className="h-full bg-[#364025]"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  )
}

/* ── Page Contact ── */
export function Contact() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const TOTAL_STEPS = 11

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const toggleMulti = (key: keyof FormData, value: string) => {
    const arr = form[key] as string[]
    set(key, arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
  }

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  const canNext = () => {
    if (step === 1) return form.name.trim() !== '' && form.email.trim() !== ''
    if (step === 2) return form.projectType.length > 0
    if (step === 3) return form.propertyType !== ''
    if (step === 4) return form.surface !== ''
    if (step === 5) return form.projectFor !== ''
    if (step === 6) return form.mission !== ''
    if (step === 7) return form.budget !== ''
    if (step === 8) return form.timeline !== ''
    if (step === 9) return form.projectStatus !== ''
    if (step === 10) return form.description.trim().length > 10
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.commitment) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }
  const [direction, setDirection] = useState(1)
  const goNext = () => { setDirection(1); next() }
  const goPrev = () => { setDirection(-1); prev() }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">

      {/* ── Hero ── */}
      <div className="pt-28 pb-0 bg-[#364025] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#F5F0E8]/4" />
          <div className="absolute -left-20 bottom-0 w-64 h-64 rounded-full bg-[#F5F0E8]/3" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-16">
          <AnimatedSection>
            <span className="text-[10px] tracking-[0.55em] uppercase text-[#F5F0E8]/60 block mb-5">
              Prise de contact
            </span>
            <h1 className="text-[#F5F0E8] mb-5"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}>
              Discuter de<br /><em>votre projet</em>
            </h1>
            <p className="text-[#F5F0E8]/65 max-w-xl leading-relaxed text-sm">
              Chaque projet est étudié personnellement.
              Nous revenons vers vous sous 4 jours ouvrés.
            </p>
          </AnimatedSection>
        </div>
        <svg viewBox="0 0 1440 50" className="w-full fill-[#F5F0E8] -mb-px block" preserveAspectRatio="none">
          <path d="M0,50 L0,25 Q360,0 720,25 Q1080,50 1440,25 L1440,50 Z" />
        </svg>
      </div>

      {/* ── Corps ── */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-14 items-start">

            {/* Colonne gauche — infos */}
            <AnimatedSection className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="space-y-8">

                {/* Logo */}
                <div>
                  <LogoAD variant="dark" size={52} />
                </div>

                <div className="h-px bg-[#364025]/12" />

                {/* Email */}
                <div>
                  <h3 className="text-[#364025] mb-5"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.5rem' }}>
                    Nous contacter
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-[#364025]/8 flex items-center justify-center shrink-0">
                        <MapPin size={14} className="text-[#364025]" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider text-[#5A4E38]/60 uppercase mb-1">Adresse</p>
                        <a
                          href="https://www.google.com/maps/dir/?api=1&destination=1475+Chemin+du+Val+Martin,+06560+Valbonne"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#1C1C1C]/75 hover:text-[#364025] transition-colors group/addr"
                        >
                          1475 chemin du Val Martin<br />06560 Valbonne
                          <span className="block text-[10px] text-[#364025]/50 group-hover/addr:text-[#364025] mt-0.5 tracking-wider">
                            → Ouvrir l'itinéraire
                          </span>
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-[#364025]/8 flex items-center justify-center shrink-0">
                        <Mail size={14} className="text-[#364025]" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider text-[#5A4E38]/60 uppercase mb-1">Email</p>
                        <a href="mailto:bonjour@adconceptdesign.fr"
                          className="text-sm text-[#1C1C1C]/75 hover:text-[#364025] transition-colors">
                          bonjour@adconceptdesign.fr
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-[#364025]/8 flex items-center justify-center shrink-0">
                        <Clock size={14} className="text-[#364025]" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider text-[#5A4E38]/60 uppercase mb-1">Horaires</p>
                        <p className="text-sm text-[#1C1C1C]/75">Lun-Ven : 8h – 18h</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Zone */}
                <div className="bg-[#364025]/6 p-5 border-l-2 border-[#364025]/30">
                  <h4 className="text-[#364025] font-medium mb-2 text-sm">Zone d'intervention</h4>
                  <p className="text-xs text-[#1C1C1C]/60 leading-relaxed">
                    AD Concept intervient dans un rayon de 100 km autour de Valbonne : Cannes, Mougins, Antibes, Nice, Monaco, Saint-Tropez...
                  </p>
                </div>

                {/* Suite du processus */}
                <div>
                  <h4 className="text-[#364025] font-medium mb-4 text-sm">Après votre message</h4>
                  <div className="space-y-3">
                    {[
                      'Étude personnelle de votre projet',
                      'Réponse sous 4 jours ouvrés',
                      'Premier échange de découverte',
                      'Visite sur site',
                      'Proposition de mission sur mesure',
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[#1C1C1C]/65">
                        <span className="w-6 h-6 bg-[#364025]/10 text-[#364025] text-[10px] flex items-center justify-center shrink-0 font-medium">
                          {i + 1}
                        </span>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Colonne droite — formulaire */}
            <AnimatedSection className="lg:col-span-3" delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#364025]/10 p-14 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle2 size={52} className="text-[#364025] mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-[#364025] mb-4"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '2rem' }}>
                    Demande envoyée !
                  </h2>
                  <p className="text-[#1C1C1C]/60 max-w-sm mx-auto text-sm leading-relaxed mb-6">
                    Merci pour votre message. Christine Thémélidis étudie personnellement chaque projet et vous répondra sous 4 jours ouvrés.
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#5A4E38]/50">
                    AD Concept — Architecture d’intérieur depuis 2006
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-[#364025]/10">

                  {/* Progression */}
                  <div className="px-8 pt-8 pb-6 border-b border-[#364025]/8">
                    <ProgressBar current={step} total={TOTAL_STEPS} />
                  </div>

                  {/* Etapes */}
                  <div className="px-8 py-8 min-h-[360px] flex flex-col">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="flex-1"
                      >

                        {/* ─ Etape 1 : Identite ─ */}
                        {step === 1 && (
                          <div className="space-y-6">
                            <StepLabel>Vos informations</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Qui êtes-vous ?
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-5">
                              <InputField label="Nom et prénom" name="name" value={form.name}
                                onChange={e => set('name', e.target.value)} placeholder="Marie Dupont" required />
                              <InputField label="Email" name="email" type="email" value={form.email}
                                onChange={e => set('email', e.target.value)} placeholder="marie@exemple.fr" required />
                            </div>
                            <InputField label="Ville du projet" name="city" value={form.city}
                              onChange={e => set('city', e.target.value)} placeholder="Cannes, Mougins, Antibes..." />
                          </div>
                        )}

                        {/* ─ Etape 2 : Type de projet ─ */}
                        {step === 2 && (
                          <div className="space-y-5">
                            <StepLabel>Nature du projet</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Quel type de projet ?
                            </h3>
                            <p className="text-xs text-[#5A4E38]/60 mb-2">Plusieurs choix possibles</p>
                            <div className="space-y-2">
                              {PROJECT_TYPES.map(opt => (
                                <ChoiceCard
                                  key={opt.value}
                                  label={opt.label}
                                  value={opt.value}
                                  selected={form.projectType.includes(opt.value)}
                                  onClick={() => toggleMulti('projectType', opt.value)}
                                  multi
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 3 : Type de bien ─ */}
                        {step === 3 && (
                          <div className="space-y-5">
                            <StepLabel>Nature du bien</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Quel type de bien ?
                            </h3>
                            <div className="space-y-2">
                              {PROPERTY_TYPES.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.propertyType === opt.value}
                                  onClick={() => set('propertyType', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 4 : Surface ─ */}
                        {step === 4 && (
                          <div className="space-y-5">
                            <StepLabel>Surface</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Surface approximative ?
                            </h3>
                            <div className="space-y-2">
                              {SURFACES.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.surface === opt.value}
                                  onClick={() => set('surface', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 5 : Usage du bien ─ */}
                        {step === 5 && (
                          <div className="space-y-5">
                            <StepLabel>Usage</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Ce projet concerne...
                            </h3>
                            <div className="space-y-2">
                              {PROJECT_FOR.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.projectFor === opt.value}
                                  onClick={() => set('projectFor', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 6 : Mission ─ */}
                        {step === 6 && (
                          <div className="space-y-5">
                            <StepLabel>Mission souhaitée</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Quel accompagnement ?
                            </h3>
                            <div className="space-y-2">
                              {MISSIONS.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.mission === opt.value}
                                  onClick={() => set('mission', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 7 : Budget ─ */}
                        {step === 7 && (
                          <div className="space-y-5">
                            <StepLabel>Budget travaux</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Votre budget estimé ?
                            </h3>
                            <p className="text-xs text-[#5A4E38]/55 leading-relaxed -mt-2">
                              Cette information nous aide à adapter notre proposition de mission.
                            </p>
                            <div className="space-y-2">
                              {BUDGETS.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.budget === opt.value}
                                  onClick={() => set('budget', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 8 : Calendrier ─ */}
                        {step === 8 && (
                          <div className="space-y-5">
                            <StepLabel>Calendrier</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Quand souhaitez-vous démarrer ?
                            </h3>
                            <div className="space-y-2">
                              {TIMELINES.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.timeline === opt.value}
                                  onClick={() => set('timeline', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 9 : Avancement ─ */}
                        {step === 9 && (
                          <div className="space-y-5">
                            <StepLabel>Avancement</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Où en êtes-vous ?
                            </h3>
                            <div className="space-y-2">
                              {PROJECT_STATUS.map(opt => (
                                <ChoiceCard key={opt.value} label={opt.label} value={opt.value}
                                  selected={form.projectStatus === opt.value}
                                  onClick={() => set('projectStatus', opt.value)} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 10 : Description ─ */}
                        {step === 10 && (
                          <div className="space-y-5">
                            <StepLabel>Description libre</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Décrivez votre projet
                            </h3>
                            <div>
                              <label className="text-[10px] tracking-[0.3em] uppercase text-[#5A4E38]/60 block mb-3">
                                Contraintes, attentes, contexte *
                              </label>
                              <textarea
                                value={form.description}
                                onChange={e => set('description', e.target.value)}
                                required
                                rows={6}
                                placeholder="Décrivez votre vision, vos contraintes, ce qui est important pour vous..."
                                className="w-full border border-[#364025]/18 bg-[#F5F0E8]/60 p-4 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#364025] transition-colors resize-none placeholder:text-[#1C1C1C]/30 leading-relaxed"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] tracking-[0.3em] uppercase text-[#5A4E38]/60 block mb-3">
                                Comment avez-vous connu AD Concept ?
                              </label>
                              <div className="relative">
                                <select
                                  value={form.howDidYouHear}
                                  onChange={e => set('howDidYouHear', e.target.value)}
                                  className="w-full border border-[#364025]/18 bg-[#F5F0E8]/60 px-4 py-3 text-sm text-[#1C1C1C]/80 focus:outline-none focus:border-[#364025] transition-colors appearance-none"
                                >
                                  <option value="">Sélectionner...</option>
                                  {HOW.map(o => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                  ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#364025]/50 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ─ Etape 11 : Engagement + envoi ─ */}
                        {step === 11 && (
                          <div className="space-y-7">
                            <StepLabel>Validation</StepLabel>
                            <h3 className="text-[#364025] text-2xl"
                              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                              Récapitulatif &amp; envoi
                            </h3>

                            {/* Recap */}
                            <div className="bg-[#364025]/5 border border-[#364025]/10 p-5 space-y-2">
                              {[
                                { label: 'Contact', value: `${form.name} — ${form.email}` },
                                { label: 'Ville', value: form.city || 'Non renseignée' },
                                { label: 'Type de projet', value: form.projectType.join(', ') || '-' },
                                { label: 'Surface', value: form.surface || '-' },
                                { label: 'Budget', value: form.budget || '-' },
                                { label: 'Mission', value: form.mission || '-' },
                              ].map(item => (
                                <div key={item.label} className="flex justify-between text-xs gap-4">
                                  <span className="text-[#5A4E38]/60 uppercase tracking-wider shrink-0">{item.label}</span>
                                  <span className="text-[#1C1C1C]/80 text-right">{item.value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Engagement strategique */}
                            <motion.label
                              htmlFor="commitment"
                              whileHover={{ scale: 1.01 }}
                              className={`flex items-start gap-4 cursor-pointer p-5 border-2 transition-all duration-300 ${
                                form.commitment
                                  ? 'border-[#364025] bg-[#364025]/5'
                                  : 'border-[#364025]/20 hover:border-[#364025]/40'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                <input
                                  type="checkbox"
                                  id="commitment"
                                  checked={form.commitment}
                                  onChange={e => set('commitment', e.target.checked)}
                                  required
                                  className="sr-only"
                                />
                                <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                                  form.commitment ? 'border-[#364025] bg-[#364025]' : 'border-[#364025]/40'
                                }`}>
                                  {form.commitment && (
                                    <motion.svg
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      width="10" height="8" viewBox="0 0 10 8" fill="none"
                                    >
                                      <path d="M1 4L3.5 6.5L9 1" stroke="#F5F0E8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </motion.svg>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-[#1C1C1C]/75 leading-relaxed">
                                Je comprends qu’un projet d’architecture intérieure nécessite une phase de préparation approfondie afin de garantir le respect du budget et des délais.
                              </p>
                            </motion.label>

                            {/* RGPD */}
                            <p className="text-[10px] text-[#5A4E38]/50 leading-relaxed">
                              Vos données sont utilisées uniquement pour traiter votre demande. Conformément au RGPD, vous disposez d’un droit d’accès et de suppression en écrivant à bonjour@adconceptdesign.fr.
                            </p>
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation bas du formulaire */}
                  <div className="px-8 pb-8 flex items-center justify-between border-t border-[#364025]/8 pt-6">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={step === 1}
                      className={`flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                        step === 1
                          ? 'text-[#364025]/25 cursor-not-allowed'
                          : 'text-[#364025]/60 hover:text-[#364025]'
                      }`}
                    >
                      <ArrowLeft size={13} /> Précédent
                    </button>

                    {step < TOTAL_STEPS ? (
                      <motion.button
                        type="button"
                        onClick={goNext}
                        disabled={!canNext()}
                        whileHover={canNext() ? { scale: 1.02 } : {}}
                        whileTap={canNext() ? { scale: 0.98 } : {}}
                        className={`flex items-center gap-2 px-7 py-3 text-xs tracking-[0.22em] uppercase transition-all duration-300 ${
                          canNext()
                            ? 'bg-[#364025] text-[#F5F0E8] hover:bg-[#4a5633]'
                            : 'bg-[#364025]/20 text-[#364025]/40 cursor-not-allowed'
                        }`}
                      >
                        Suivant <ArrowRight size={13} />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={loading || !form.commitment}
                        whileHover={form.commitment ? { scale: 1.02 } : {}}
                        whileTap={form.commitment ? { scale: 0.98 } : {}}
                        className={`flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.22em] uppercase transition-all duration-300 ${
                          form.commitment
                            ? 'bg-[#364025] text-[#F5F0E8] hover:bg-[#4a5633]'
                            : 'bg-[#364025]/20 text-[#364025]/40 cursor-not-allowed'
                        }`}
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-[#F5F0E8]/30 border-t-[#F5F0E8] rounded-full"
                          />
                        ) : (
                          <> Envoyer ma demande de projet <ArrowRight size={13} /> </>
                        )}
                      </motion.button>
                    )}
                  </div>

                </form>
              )}
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Carte Google Maps — Valbonne */}
      <section className="h-80 relative overflow-hidden">
        <iframe
          title="AD Concept — Valbonne"
          src="https://maps.google.com/maps?q=1475+Chemin+du+Val+Martin+06560+Valbonne+France&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Overlay léger pour harmoniser avec la palette */}
        <div className="absolute inset-0 pointer-events-none bg-[#364025]/8" />
      </section>
    </div>
  )
}
