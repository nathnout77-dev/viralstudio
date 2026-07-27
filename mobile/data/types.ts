import type { WineColor } from '../theme/colors'

export type Wine = {
  id: string
  name: string          // nom de cuvée
  domaine?: string      // domaine / château
  region: string
  country: string
  grape?: string        // cépage principal
  color: WineColor
  score?: number        // note /100 (dégustation experte)
  rating?: number       // note utilisateur /5
  price?: number        // € indicatif
  year?: number         // millésime
  tags: string[]        // descripteurs de dégustation (« Complexe & Fruité »)
  inCellar?: number     // nb de bouteilles en cave
}

export type Tasting = {
  id: string
  wineName: string
  region: string
  date: string          // format court FR déjà mis en forme
  rating: number        // /5
  note?: string
}

export type Filter = {
  id: string
  label: string
  kind: 'region' | 'grape' | 'color' | 'price' | 'score'
}
