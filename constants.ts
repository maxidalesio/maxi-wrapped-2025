
import { WrappedData } from './types';

export const COLORS = {
  bg: "#0f172a",
  text: "#e5e7eb",
  primary: "#22c55e",
  secondary: "#38bdf8",
  accent: "#f472b6",
  muted: "#64748b",
  purple: "#a78bfa",
  yellow: "#facc15"
};

export const DATA: WrappedData = {
  timeDistribution: [
    { label: "Trabajo", value: 40, color: COLORS.primary },
    { label: "Clases & Actividad", value: 20, color: COLORS.secondary },
    { label: "Software / Data", value: 15, color: COLORS.accent },
    { label: "Terapia", value: 10, color: COLORS.muted },
    { label: "Viajes", value: 10, color: COLORS.purple },
    { label: "Ocio", value: 5, color: COLORS.yellow },
  ],
  laborStats: [
    { label: "Días trabajados", value: 237, color: COLORS.primary },
    { label: "Días desempleado", value: 23, color: COLORS.secondary },
    { label: "Vacaciones", value: 19, color: COLORS.accent },
    { label: "Feriados", value: 8, color: COLORS.purple },
  ],
  jobFunnel: [
    { stage: "Entrevistas", count: 21, color: COLORS.primary },
    { stage: "Ofertas", count: 3, color: COLORS.secondary },
    { stage: "Aceptadas", count: 2, color: COLORS.accent },
  ],
  classes: [
    { category: "Gimnasio", count: 78, subValue: 78, subLabel: "días de disciplina", color: COLORS.primary },
    { category: "Baile", count: 33, subValue: 21, subLabel: "coreos aprendidas", color: COLORS.secondary },
    { category: "Costura", count: 21, subValue: 2, subLabel: "proyectos terminados", color: COLORS.accent },
    { category: "Data", count: 20, subValue: 4, subLabel: "proyectos propios", color: COLORS.purple },
  ],
  travelSummary: {
    viajes: 3,
    ciudades: 7,
    aviones: 12
  },
  travel: [
    { destination: "Japón", photos: 1784, color: COLORS.primary },
    { destination: "Los Ángeles", photos: 629, color: COLORS.secondary },
    { destination: "Salta", photos: 84, color: COLORS.accent },
  ],
  music: [
    { label: "Lightsticks adquiridos", count: 3, color: COLORS.accent },
    { label: "Conciertos asistidos", count: 4, color: COLORS.secondary },
    { label: "Albumes físicos / singles", count: 17, color: COLORS.purple },
  ],
  therapyPlus: [
    { label: "Sesiones de terapia", count: 16, color: COLORS.primary },
    { label: "Alplax consumidos", count: 22, color: COLORS.secondary },
    { label: "veces que pedí que me curen el ojeo", count: 28, color: COLORS.accent },
  ],
  codeStats: [
    { label: "Commits", count: 128, color: COLORS.primary },
    { label: "Chats", count: 78, color: COLORS.secondary },
    { label: "Días usando Cursor", count: 68, color: COLORS.accent },
  ],
  cursorTokens: "93.793.250",
  conversations: [
    { text: "Procesar finales", size: 'lg' },
    { text: "Preparar entrevistas", size: 'sm' },
    { text: "Ordenar ansiedad", size: 'lg' },
    { text: "Decisiones laborales", size: 'md' }
  ],
  gacha: [
    { game: "Genshin", chars: 12, color: COLORS.primary },
    { game: "Wuthering Waves", chars: 15, color: COLORS.secondary },
    { game: "Star Rail", chars: 10, color: COLORS.accent },
  ],
  transformations: [
    { before: "Exigencia", after: "Claridad" },
    { before: "Apuro", after: "Paciencia" }
  ],
  emotionalRadar: [
    { trait: "Disciplina", score: 8 },
    { trait: "Claridad emocional", score: 7 },
    { trait: "Creatividad", score: 8 },
    { trait: "Constancia", score: 7 },
    { trait: "Curiosidad", score: 9 },
    { trait: "Autocuidado", score: 6 }
  ]
};
