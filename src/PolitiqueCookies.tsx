import { AnimatedSection } from './AnimatedSection'

export function PolitiqueCookies() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-primary mb-12">Politique des cookies</h1>
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Qu'est-ce qu'un cookie ?</h2>
              <p>Un cookie est un petit fichier déposé sur votre terminal lors de la visite d'un site web. Il permet au site de mémoriser des informations sur votre visite.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Cookies utilisés</h2>
              <p><strong>Cookies analytiques :</strong> Ces cookies nous permettent de mesurer l'audience du site et d'améliorer son contenu. Ils ne collectent pas de données personnelles identifiantes.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Votre consentement</h2>
              <p>Conformément à la réglementation, votre consentement est requis avant le dépôt de cookies analytiques. Vous pouvez l'accepter ou le refuser via le bandeau de consentement.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Désactivation</h2>
              <p>Vous pouvez désactiver les cookies à tout moment dans les paramètres de votre navigateur. Cette action peut affecter votre expérience de navigation.</p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
