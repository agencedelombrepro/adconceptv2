import { AnimatedSection } from './AnimatedSection'

export function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-primary mb-12">Politique de confidentialité</h1>
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Responsable du traitement</h2>
              <p>AD Concept – Christine Thémélidis – bonjour@adconceptdesign.fr</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Données collectées</h2>
              <p>Via le formulaire de contact : nom, email, téléphone, message.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Finalité</h2>
              <p>Les données sont collectées uniquement pour répondre à vos demandes et ne sont pas transmises à des tiers.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Conservation</h2>
              <p>Vos données sont conservées pendant 3 ans à compter de votre dernière interaction.</p>
            </section>
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Vos droits</h2>
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Contactez-nous à bonjour@adconceptdesign.fr pour exercer ces droits.</p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
