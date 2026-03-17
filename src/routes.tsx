import { createBrowserRouter } from 'react-router'
import { Layout } from './Layout'
import { Home } from './Home'
import { Realisations } from './Realisations'
import { Methode } from './Methode'
import { APropos } from './APropos'
import { Blog } from './Blog'
import { BlogDetail } from './BlogDetail'
import { Contact } from './Contact'
import { MentionsLegales } from './MentionsLegales'
import { PolitiqueConfidentialite } from './PolitiqueConfidentialite'
import { PolitiqueCookies } from './PolitiqueCookies'
import { CityPage } from './CityPage'
import { Presse } from './Presse'
import { NotFound } from './NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'realisations', Component: Realisations },
      { path: 'methode', Component: Methode },
      { path: 'a-propos', Component: APropos },
      { path: 'blog', Component: Blog },
      { path: 'blog/:slug', Component: BlogDetail },
      { path: 'presse', Component: Presse },
      { path: 'contact', Component: Contact },
      { path: 'mentions-legales', Component: MentionsLegales },
      { path: 'politique-confidentialite', Component: PolitiqueConfidentialite },
      { path: 'politique-cookies', Component: PolitiqueCookies },
      {
        path: 'architecte-interieur-valbonne',
        element: <CityPage cityName="Valbonne" slug="valbonne" />,
      },
      {
        path: 'architecte-interieur-cannes',
        element: <CityPage cityName="Cannes" slug="cannes" />,
      },
      {
        path: 'architecte-interieur-mougins',
        element: <CityPage cityName="Mougins" slug="mougins" />,
      },
      {
        path: 'architecte-interieur-antibes',
        element: <CityPage cityName="Antibes" slug="antibes" />,
      },
      {
        path: 'architecte-interieur-nice',
        element: <CityPage cityName="Nice" slug="nice" />,
      },
      {
        path: 'architecte-interieur-monaco',
        element: <CityPage cityName="Monaco" slug="monaco" />,
      },
      {
        path: 'architecte-interieur-saint-tropez',
        element: <CityPage cityName="Saint-Tropez" slug="saint-tropez" />,
      },
      {
        path: 'architecte-interieur-grasse',
        element: <CityPage cityName="Grasse" slug="grasse" />,
      },
      { path: '*', Component: NotFound },
    ],
  },
])
