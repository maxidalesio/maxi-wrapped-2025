
export interface WrappedData {
  timeDistribution: { label: string; value: number; color: string }[];
  laborStats: { label: string; value: number; color: string }[];
  jobFunnel: { stage: string; count: number; color: string }[];
  classes: { 
    category: string; 
    count: number; 
    subValue: number; 
    subLabel: string; 
    color: string 
  }[];
  travelSummary: {
    viajes: number;
    ciudades: number;
    aviones: number;
  };
  travel: { destination: string; photos: number; color: string }[];
  music: { label: string; count: number; color: string }[];
  therapyPlus: { label: string; count: number; color: string }[];
  codeStats: { label: string; count: number; color: string }[];
  cursorTokens: string;
  conversations: { text: string; size: 'lg' | 'md' | 'sm' }[];
  gacha: { game: string; chars: number; color: string }[];
  transformations: { before: string; after: string }[];
  emotionalRadar: { trait: string; score: number }[];
}

export type SlideId = number;
