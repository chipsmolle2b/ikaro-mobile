export type PersonaId =
  | "ara"
  | "iris"
  | "phoenix"
  | "itoko"
  | "lumiere"
  | "dedale";

export interface Persona {
  id: PersonaId;
  name: string;
  tagline: string;
  description: string;
  /** Couleur d'accent utilisee pour l'avatar et les elements mis en valeur de cette persona. */
  color: string;
}

export const PERSONAS: Persona[] = [
  {
    id: "ara",
    name: "Ara",
    tagline: "Chaleureuse et directe",
    description:
      "Ara va droit au but, avec une touche de chaleur humaine. Ideale pour du conseil rapide et des discussions du quotidien.",
    color: "#00d4ff",
  },
  {
    id: "iris",
    name: "Iris",
    tagline: "Precise et organisee",
    description:
      "Iris excelle dans l'organisation, la planification et les reponses structurees. Parfaite pour s'organiser ou clarifier une idee.",
    color: "#7a5cff",
  },
  {
    id: "phoenix",
    name: "Phoenix",
    tagline: "Energique et motivante",
    description:
      "Phoenix pousse a l'action avec enthousiasme. Ideale pour se motiver, avancer sur un projet ou sortir d'un blocage.",
    color: "#ff6b00",
  },
  {
    id: "itoko",
    name: "Itoko",
    tagline: "Douce et a l'ecoute",
    description:
      "Itoko privilegie l'ecoute et la douceur. Ideale pour parler calmement, reflechir a voix haute ou decompresser.",
    color: "#00ff88",
  },
  {
    id: "lumiere",
    name: "Lumière",
    tagline: "Creative et inspirante",
    description:
      "Lumiere apporte des idees originales et un regard createur. Ideale pour brainstormer ou explorer une idee sous un autre angle.",
    color: "#ffcc00",
  },
  {
    id: "dedale",
    name: "Dédale",
    tagline: "Analytique et rigoureux",
    description:
      "Dedale raisonne pas a pas avec rigueur. Ideal pour du code, des raisonnements complexes ou des explications techniques.",
    color: "#ff3366",
  },
];
