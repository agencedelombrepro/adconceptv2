import { AnimatedSection } from './AnimatedSection'

export function MentionsLegales() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-primary mb-12">Mentions légales</h1>

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Éditeur du site</h2>
              <p><strong>Raison sociale :</strong> AD Concept</p>
              <p><strong>Forme juridique :</strong> SASU</p>
              <p><strong>Siège social :</strong> LE SWING, 1475 chemin du Val Martin, 06560 Valbonne</p>
              <p><strong>SIRET :</strong> 51841763900029</p>
              <p><strong>TVA intracommunautaire :</strong> FR34518417639</p>
              <p><strong>Directrice de publication :</strong> Christine Thémélidis</p>
              <p><strong>Email :</strong> bonjour@adconceptdesign.fr</p>
              <p></p>
            </section>

            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Hébergement</h2>
              <p>Ce site est hébergé par Cloudflare Pages. Pour toute demande relative à l'hébergement, contacter l'éditeur.</p>
            </section>

            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Propriété intellectuelle</h2>
              <p>L'ensemble du contenu de ce site (textes, images, logo) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
            </section>

            <section>
              <h2 className="text-primary text-xl mb-4" style={{ fontFamily: 'Cormorant Garamond', fontWeight: 400 }}>Limitation de responsabilité</h2>
              <p>AD Concept ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur, lors de l'accès au site.</p>
            </section>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
