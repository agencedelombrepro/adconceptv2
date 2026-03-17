import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const reviews = [
  {
    name: 'Doris Bürki',
    rating: 5,
    date: 'décembre 2025',
    text: 'Un chantier au top ! Livraison dans le temps. Sérieux, confiance et un résultat vraiment extra pour les salles de bain. L\'architecte d\'intérieur a été exceptionnelle, avec des idées et un suivi remarquable.',
    initials: 'DB',
  },
  {
    name: 'Anne Marie Ille',
    rating: 5,
    date: 'mars 2026',
    text: 'AD CONCEPT m\'a accompagné dans la rénovation de mon appartement. Cette expérience a été particulièrement positive. Cela fait six ans et je suis très heureuse dans mon logement grâce à la qualité de travail de l\'architecte.',
    initials: 'AI',
  },
  {
    name: 'Claire Fiszer Hannaux',
    rating: 5,
    date: 'mars 2026',
    text: 'Depuis plus de 10 ans Christine assure le rôle de maître d\'œuvre pour mes projets immobiliers d\'habitation et je ne peux que la recommander vivement. Elle est très talentueuse, créative et très professionnelle.',
    initials: 'CF',
  },
  {
    name: 'Dany Kassir',
    rating: 5,
    date: 'mars 2026',
    text: 'Travailler avec AD Concept a été une excellente expérience durant tout notre projet et même après.',
    initials: 'DK',
  },
  {
    name: 'Annick William Maréchal',
    rating: 5,
    date: 'mars 2026',
    text: 'Pro, efficace, sérieux sont les règles de cette entreprise qui mérite six étoiles sur cinq.',
    initials: 'AW',
  },
  {
    name: 'Marjory MacGregor',
    rating: 5,
    date: 'mars 2026',
    text: 'Christine, de la société AD Concept, travaille pour nous depuis plusieurs années et a géré la rénovation de notre appartement à Antibes. Nous sommes ravis de son travail. Elle apporte un soutien qui dépasse le cadre de sa profession.',
    initials: 'MM',
  },
  {
    name: 'Niloufar Molavi',
    rating: 5,
    date: 'mars 2026',
    text: 'J\'ai adoré travailler avec Christine d\'AD Concept. Ce fut ma meilleure expérience de rénovation. Christine est extrêmement professionnelle, talentueuse et méticuleuse. Elle collabore avec d\'excellents sous-traitants.',
    initials: 'NM',
  },
]

const PER_PAGE = 4
const TOTAL = reviews.length

function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className={i < n ? 'fill-[#FBBC04] text-[#FBBC04]' : 'fill-border text-border'} />
      ))}
    </div>
  )
}

const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export function GoogleReviews() {
  const [startIdx, setStartIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = (d: number) => {
    setDir(d)
    setStartIdx(i => (i + d + TOTAL) % TOTAL)
  }

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => go(1), 5000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [startIdx])

  const visible = Array.from({ length: PER_PAGE }, (_, i) => ({
    review: reviews[(startIdx + i) % TOTAL],
    uid: (startIdx + i) % TOTAL,
  }))

  return (
    <section className="py-14 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] uppercase text-secondary block mb-4">Avis clients</span>
          <h2 className="text-primary mb-4">Ce que disent nos clients</h2>
          <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full px-5 py-2.5 shadow-sm mt-2">
            <GoogleG size={18} />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light text-primary" style={{ fontFamily: 'Cormorant Garamond, serif' }}>5,0</span>
              <Stars size={13} />
            </div>
            <span className="text-xs text-muted-foreground border-l border-border pl-3">Google · Avis vérifiés</span>
          </div>
        </AnimatedSection>

        {/* Carousel — AnimatePresence mode="wait" pour fluidité */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={startIdx}
              custom={dir}
              variants={{
                enter:  (d: number) => ({ opacity: 0, x: d * 80 }),
                center: { opacity: 1, x: 0 },
                exit:   (d: number) => ({ opacity: 0, x: d * -80 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {visible.map(({ review, uid }) => (
                <div
                  key={uid}
                  className="bg-background border border-border p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <Quote size={16} className="text-secondary/40 shrink-0" />
                  <p className="text-sm text-foreground/70 leading-relaxed flex-1 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <Stars size={12} n={review.rating} />
                    <span className="text-[10px] text-muted-foreground tracking-wide">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground text-[10px] font-medium tracking-wider">{review.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary leading-none mb-1">{review.name}</p>
                      <div className="flex items-center gap-1.5">
                        <GoogleG size={9} />
                        <span className="text-[9px] text-muted-foreground tracking-wide">Avis vérifié</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Précédent"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > startIdx ? 1 : -1); setStartIdx(i) }}
                className={`h-1 rounded-full transition-all duration-300 ${i === startIdx ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-primary/40'}`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="w-9 h-9 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Suivant"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <AnimatedSection className="text-center mt-10">
          <a
            href="https://share.google/mmajOpfM4IJhhp0QC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary border-b border-transparent hover:border-primary transition-all duration-200 pb-0.5"
          >
            Voir tous les avis sur Google
            <ChevronRight size={12} />
          </a>
        </AnimatedSection>

      </div>
    </section>
  )
}
