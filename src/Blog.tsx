import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const articles = [
  {
    id: 1,
    title: 'Comment préparer un chantier de rénovation à Cannes ?',
    category: 'Rénovation',
    date: '12 janvier 2026',
    readTime: '5 min',
    excerpt: 'La réussite d\'un chantier de rénovation à Cannes repose en grande partie sur sa préparation. Qu\'il s\'agisse d\'un appartement en centre-ville ou d\'une villa, l\'anticipation des contraintes techniques et budgétaires est essentielle.',
    image: '/gallia-3.jpg',
    slug: 'preparer-chantier-renovation-cannes',
    featured: true,
  },
  {
    id: 2,
    title: 'Maîtrise d\'œuvre : pourquoi est-elle essentielle pour votre projet ?',
    category: 'Maîtrise d\'œuvre',
    date: '3 février 2026',
    readTime: '7 min',
    excerpt: 'La maîtrise d\'œuvre est souvent méconnue des particuliers. Pourtant, elle représente la garantie d\'un chantier bien coordonné, dans le respect du budget et des délais.',
    image: '/projects/roquefort/roquefort-2.jpg',
    slug: 'pourquoi-maitrise-oeuvre-essentielle',
    featured: false,
  },
  {
    id: 3,
    title: 'Budget rénovation villa Côte d\'Azur : les éléments à anticiper',
    category: 'Conseils chantier',
    date: '18 février 2026',
    readTime: '6 min',
    excerpt: 'Rénover une villa sur la Côte d\'Azur implique une connaissance précise du marché local et des spécificités des biens de la région. Voici comment construire un budget réaliste.',
    image: '/projects/villa-opio/opio-1.jpg',
    slug: 'budget-renovation-villa-cote-azur',
    featured: false,
  },
  {
    id: 4,
    title: 'Les erreurs fréquentes en rénovation et comment les éviter',
    category: 'Conseils chantier',
    date: '28 février 2026',
    readTime: '4 min',
    excerpt: 'Après 20 ans de projets dans les Alpes-Maritimes, j\'ai identifié les erreurs les plus courantes qui peuvent compromettre un chantier de rénovation, et comment les éviter.',
    image: '/projects/art-deco/art-deco-3.jpg',
    slug: 'erreurs-frequentes-renovation',
    featured: false,
  },
]

const categories = ['Tous', 'Rénovation', 'Maîtrise d\'œuvre', 'Conseils chantier', 'Architecture d\'intérieur']

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const featured = articles.find(a => a.featured)!
  const allOthers = articles.filter(a => !a.featured)

  const filteredOthers = activeCategory === 'Tous'
    ? allOthers
    : allOthers.filter(a => a.category === activeCategory)

  const featuredVisible = activeCategory === 'Tous' || featured.category === activeCategory

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <AnimatedSection>
            <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-4">Expertise</span>
            <h1 className="text-primary-foreground mb-6">Blog architecture<br /><em>&amp; rénovation</em></h1>
            <p className="text-primary-foreground/70 max-w-xl leading-relaxed">
              Conseils, méthodes et retours d'expérience sur l'architecture d'intérieur et la rénovation sur la Côte d'Azur.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-border bg-background sticky top-[60px] z-30">
        <div className="container mx-auto px-6 lg:px-12 py-4 flex gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-colors pb-1 border-b-2 ${
                activeCategory === cat
                  ? 'text-primary border-primary font-medium'
                  : 'text-muted-foreground border-transparent hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      {featuredVisible && (
        <section className="py-10 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection>
              <Link
                to={`/blog/${featured.slug}`}
                className="grid lg:grid-cols-2 gap-8 group cursor-pointer block"
              >
                <div className="img-zoom overflow-hidden aspect-[16/10] rounded-sm">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-secondary/20 text-secondary text-xs px-3 py-1 tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-xs text-muted-foreground">À la une</span>
                  </div>
                  <h2 className="text-primary mb-4 group-hover:text-secondary transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400 }}>
                    {featured.title}
                  </h2>
                  <p className="text-foreground/70 leading-relaxed mb-6 text-sm">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {featured.readTime} de lecture
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-3 text-primary text-sm tracking-wide group/link">
                    <span className="border-b border-primary group-hover:border-secondary transition-colors pb-0.5">
                      Lire l'article
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Other articles */}
      {filteredOthers.length > 0 && (
        <section className="py-10 bg-primary/3">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection className="mb-10">
              <h2 className="text-primary text-2xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                Articles récents
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {filteredOthers.map((article, i) => (
                <AnimatedSection key={article.id} delay={i * 0.1}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="group cursor-pointer bg-background block"
                  >
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="img-zoom overflow-hidden aspect-[16/9] mb-4">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <button
                          type="button"
                          onClick={e => { e.preventDefault(); setActiveCategory(article.category) }}
                          className="text-xs text-secondary tracking-wider uppercase block mb-2 hover:text-primary transition-colors"
                        >
                          {article.category}
                        </button>
                        <h3
                          className="text-primary mb-3 group-hover:text-secondary transition-colors leading-snug"
                          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: '1.2rem' }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-xs text-foreground/60 leading-relaxed mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
                          <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Message si aucun article dans cette catégorie */}
      {!featuredVisible && filteredOthers.length === 0 && (
        <section className="py-14 bg-background text-center">
          <div className="container mx-auto px-6">
            <p className="text-muted-foreground text-sm">Aucun article dans cette catégorie pour le moment.</p>
          </div>
        </section>
      )}
    </div>
  )
}
