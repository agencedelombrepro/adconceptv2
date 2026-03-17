import { useParams, Link } from 'react-router'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const articles = [
  {
    id: 1,
    title: 'Comment préparer un chantier de rénovation à Cannes ?',
    category: 'Rénovation',
    date: '12 janvier 2026',
    readTime: '5 min',
    excerpt: "La réussite d'un chantier de rénovation à Cannes repose en grande partie sur sa préparation. Qu'il s'agisse d'un appartement en centre-ville ou d'une villa, l'anticipation des contraintes techniques et budgétaires est essentielle.",
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&fit=crop',
    slug: 'preparer-chantier-renovation-cannes',
    content: `
      <p>La rénovation d'un bien immobilier à Cannes — qu'il s'agisse d'un appartement en centre-ville, d'une villa sur les hauteurs ou d'une résidence proche du bord de mer — nécessite une organisation rigoureuse en amont. Trop souvent, les propriétaires sous-estiment le temps et les ressources nécessaires à une bonne préparation.</p>

      <h2>1. Définir précisément le périmètre des travaux</h2>
      <p>Avant de contacter la moindre entreprise, il est indispensable de savoir ce que vous souhaitez réaliser. Une rénovation partielle (cuisine, salle de bains) ou complète ? Une simple remise au goût du jour ou une restructuration des espaces ? Ce périmètre conditionne directement le budget, le planning et les corps de métier à mobiliser.</p>

      <h2>2. Faire établir un relevé précis du bien</h2>
      <p>Un relevé côté et précis de votre bien permet d'établir des plans d'exécution fiables. Il révèle les contraintes techniques (murs porteurs, réseaux encastrés, hauteurs sous plafond) et évite les mauvaises surprises lors du chantier.</p>

      <h2>3. Constituer un dossier technique complet</h2>
      <p>Ce dossier regroupe les plans d'exécution, les coupes, les élévations, le descriptif des prestations et le DQE (Descriptif Quantitatif Estimatif). Il est indispensable pour obtenir des devis comparables et suivre l'avancement des travaux.</p>

      <h2>4. Anticiper les délais et les contraintes locales</h2>
      <p>À Cannes comme dans le reste des Alpes-Maritimes, certaines périodes de l'année sont plus chargées pour les artisans. Il est conseillé de planifier le chantier en dehors de la haute saison touristique (juillet-août) pour éviter les retards. Les copropriétés ont souvent des règlements intérieurs stricts sur les horaires de travaux.</p>

      <h2>5. Faire appel à un maître d'œuvre</h2>
      <p>La maîtrise d'œuvre vous garantit un interlocuteur unique qui coordonne l'ensemble des entreprises, vérifie la qualité des travaux et gère les imprévus. C'est une assurance précieuse pour respecter votre budget et vos délais.</p>
    `,
  },
  {
    id: 2,
    title: "Maîtrise d'œuvre : pourquoi est-elle essentielle pour votre projet ?",
    category: "Maîtrise d'œuvre",
    date: '3 février 2026',
    readTime: '7 min',
    excerpt: "La maîtrise d'œuvre est souvent méconnue des particuliers. Pourtant, elle représente la garantie d'un chantier bien coordonné, dans le respect du budget et des délais.",
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&fit=crop',
    slug: 'pourquoi-maitrise-oeuvre-essentielle',
    content: `
      <p>Vous avez un projet de rénovation ou de construction ? Vous vous demandez si la maîtrise d'œuvre est vraiment nécessaire ? Après 20 ans de projets dans les Alpes-Maritimes, voici mon point de vue.</p>

      <h2>Qu'est-ce que la maîtrise d'œuvre ?</h2>
      <p>Le maître d'œuvre est le professionnel qui assure la conception et le suivi technique d'un projet de construction ou de rénovation. Il est l'intermédiaire entre le maître d'ouvrage (vous, le client) et les entreprises qui réalisent les travaux.</p>

      <h2>Coordination des corps de métier</h2>
      <p>Un chantier implique de nombreux corps de métier : maçons, plombiers, électriciens, menuisiers, carreleurs, peintres... Chacun intervient à un moment précis, et le moindre décalage peut bloquer les autres. Le maître d'œuvre établit un planning d'intervention coordonné et s'assure que chaque corps de métier dispose des informations nécessaires.</p>

      <h2>Contrôle qualité permanent</h2>
      <p>Le maître d'œuvre assiste aux réunions de chantier, vérifie la conformité des travaux avec les plans et les documents techniques, et signale les non-conformités avant qu'elles ne deviennent des problèmes coûteux.</p>

      <h2>Maîtrise du budget</h2>
      <p>Grâce à un dossier technique complet et à une consultation rigoureuse des entreprises, le maître d'œuvre vous permet d'obtenir des devis comparables et d'éviter les avenants imprévus.</p>

      <h2>Réception des travaux</h2>
      <p>À la fin du chantier, le maître d'œuvre procède à la réception des travaux avec vous. Il dresse la liste des réserves (défauts à corriger) et s'assure que les entreprises les lèvent dans les délais prévus.</p>
    `,
  },
  {
    id: 3,
    title: "Budget rénovation villa Côte d'Azur : les éléments à anticiper",
    category: 'Conseils chantier',
    date: '18 février 2026',
    readTime: '6 min',
    excerpt: "Rénover une villa sur la Côte d'Azur implique une connaissance précise du marché local et des spécificités des biens de la région. Voici comment construire un budget réaliste.",
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80&fit=crop',
    slug: 'budget-renovation-villa-cote-azur',
    content: `
      <p>La Côte d'Azur est une région à part pour la rénovation. Les biens y sont souvent anciens, les contraintes réglementaires importantes et les artisans qualifiés très demandés. Voici les éléments clés pour construire un budget réaliste.</p>

      <h2>Les coûts spécifiques à la région</h2>
      <p>En raison de la forte demande et du coût de la vie élevé, les tarifs des artisans sur la Côte d'Azur sont généralement 20 à 30 % supérieurs à la moyenne nationale. Il faut en tenir compte dès l'établissement du budget prévisionnel.</p>

      <h2>Les postes budgétaires principaux</h2>
      <p>Pour une rénovation complète, les postes les plus importants sont généralement : le gros œuvre et la maçonnerie, la plomberie et l'électricité, le revêtement de sol, la menuiserie et les portes, la peinture et les finitions.</p>

      <h2>Prévoir une réserve pour les imprévus</h2>
      <p>Dans les villas anciennes, les surprises sont fréquentes : présence d'amiante, réseaux vétustes, problèmes d'étanchéité... Il est indispensable de prévoir une réserve de 10 à 15 % du budget total pour faire face à ces imprévus.</p>

      <h2>Le rôle du DQE</h2>
      <p>Le Descriptif Quantitatif Estimatif est un document technique qui détaille l'ensemble des prestations à réaliser avec les quantités et les prix unitaires estimés. Il permet d'obtenir des devis comparables et de suivre l'évolution du budget tout au long du chantier.</p>
    `,
  },
  {
    id: 4,
    title: 'Les erreurs fréquentes en rénovation et comment les éviter',
    category: 'Conseils chantier',
    date: '28 février 2026',
    readTime: '4 min',
    excerpt: "Après 20 ans de projets dans les Alpes-Maritimes, j'ai identifié les erreurs les plus courantes qui peuvent compromettre un chantier de rénovation — et comment les éviter.",
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&fit=crop',
    slug: 'erreurs-frequentes-renovation',
    content: `
      <p>Après 20 ans de projets dans les Alpes-Maritimes, j'ai vu beaucoup de chantiers bien ou mal préparés. Voici les erreurs les plus fréquentes — et comment les éviter.</p>

      <h2>1. Lancer le chantier sans dossier technique</h2>
      <p>La première erreur est de commencer les travaux sans plans d'exécution ni descriptif détaillé. Résultat : des entreprises qui interprètent les consignes à leur manière, des travaux qui ne correspondent pas aux attentes, et des surcoûts importants.</p>

      <h2>2. Choisir uniquement sur le prix</h2>
      <p>Le devis le moins cher n'est pas toujours le meilleur choix. Il faut analyser la qualité des matériaux proposés, les références de l'entreprise, ses garanties et sa disponibilité. Un artisan sérieux et légèrement plus cher vaut souvent mieux qu'un artisan low-cost qui disparaît en cours de chantier.</p>

      <h2>3. Sous-estimer les délais</h2>
      <p>Les chantiers de rénovation prennent toujours plus de temps que prévu. Les délais d'approvisionnement des matériaux, les imprévus techniques, les congés des artisans... Il vaut mieux planifier avec une marge et être agréablement surpris.</p>

      <h2>4. Négliger la coordination entre les corps de métier</h2>
      <p>C'est souvent là que les chantiers dérapent. Un plombier qui intervient après le carreleur, un électricien qui perce dans des murs déjà enduits... La coordination est indispensable pour éviter ces situations.</p>

      <h2>5. Oublier la phase de réception</h2>
      <p>La réception des travaux est une étape juridique importante. Elle marque le transfert de responsabilité de l'entreprise vers le maître d'ouvrage. Sans procès-verbal de réception avec réserves, vous perdez une partie de vos recours en cas de malfaçons.</p>
    `,
  },
]

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-2xl text-primary mb-4">Article introuvable</h1>
        <Link to="/blog" className="text-secondary underline">
          Retour au blog
        </Link>
      </div>
    )
  }

  const others = articles.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-[45vh] min-h-[340px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-6 lg:px-12">
          <span className="text-xs tracking-[0.4em] uppercase text-white/60 block mb-3">
            {article.category}
          </span>
          <h1
            className="text-white text-3xl lg:text-4xl max-w-3xl leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            {article.title}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 lg:px-12 py-12 max-w-3xl">
        {/* Meta */}
        <div className="flex items-center gap-6 text-xs text-muted-foreground mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {article.readTime} de lecture
          </span>
          <Link
            to="/blog"
            className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors ml-auto"
          >
            <ArrowLeft size={12} />
            Retour au blog
          </Link>
        </div>

        {/* Corps de l'article */}
        <div
          className="prose prose-sm prose-slate max-w-none
            [&_h2]:text-primary [&_h2]:font-normal [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4
            [&_p]:text-foreground/70 [&_p]:leading-relaxed [&_p]:mb-5
            [&_ul]:space-y-2 [&_li]:text-foreground/70"
          style={{ fontFamily: 'inherit' }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-14 p-8 bg-primary text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-3">Votre projet</p>
          <h3
            className="text-white text-2xl mb-3 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            Un projet de rénovation sur la Côte d'Azur ?
          </h3>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Christine Thémélidis vous accompagne de la conception au suivi de chantier.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
          >
            Discuter de mon projet
          </Link>
        </div>
      </div>

      {/* Autres articles */}
      {others.length > 0 && (
        <section className="py-12 bg-primary/3">
          <div className="container mx-auto px-6 lg:px-12">
            <AnimatedSection className="mb-8">
              <h2
                className="text-primary text-2xl"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Articles similaires
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((a) => (
                <Link
                  key={a.id}
                  to={`/blog/${a.slug}`}
                  className="group bg-background block hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className="overflow-hidden aspect-[16/9]">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-secondary tracking-wider uppercase mb-2">{a.category}</p>
                    <h3
                      className="text-primary text-base leading-snug group-hover:text-secondary transition-colors"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">{a.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
