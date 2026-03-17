import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <AnimatedSection>
          <p
            className="text-[8rem] leading-none text-primary/10 mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            404
          </p>
          <h1 className="text-primary mb-4 text-3xl">Page introuvable</h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300"
          >
            Retour à l'accueil
            <ArrowRight size={14} />
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
