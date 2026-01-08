
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Github, MessageSquare, Terminal, Heart, Camera, Briefcase, MapPin, Zap, Sparkles, Music, Ticket, Disc, Plane, Globe } from 'lucide-react';
import { DATA } from './constants';
import Slide from './components/Slide';
import { DonutChart, CountUp, EmotionalRadar } from './components/Charts';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = 16;

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  // Handle keyboard navigation for desktop users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handling for mobile scrolling experience
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchEnd - touchStart > 50) prevSlide();
    setTouchStart(null);
  };

  const getBubbleSize = (size: 'lg' | 'md' | 'sm') => {
    switch (size) {
      case 'lg': return 'w-40 h-40 md:w-56 md:h-56 text-lg md:text-2xl';
      case 'md': return 'w-32 h-32 md:w-44 md:h-44 text-base md:text-xl';
      case 'sm': return 'w-24 h-24 md:w-32 md:h-32 text-xs md:text-lg';
      default: return 'w-32 h-32 text-base';
    }
  };

  return (
    <div 
      className="relative w-screen h-screen bg-[#0f172a] text-slate-200 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Progress Indicator */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <motion.div 
          className="h-full bg-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative w-full h-full">
        {/* Slide 0: Welcome / Intro */}
        <Slide isActive={currentSlide === 0} direction={direction}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
              Maxi <span className="text-emerald-500">Wrapped</span> 2025
            </h1>
            <p className="text-xl md:text-2xl opacity-60 max-w-lg mx-auto italic">
              "La data como espejo, no como oráculo"
            </p>
          </motion.div>
          <motion.div 
            className="absolute bottom-12 flex flex-col items-center gap-2 opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-sm uppercase tracking-widest">Empezar scroll</span>
            <ChevronDown size={24} />
          </motion.div>
        </Slide>

        {/* Slide 1: General Time Distribution */}
        <Slide isActive={currentSlide === 1} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Así se repartió mi 2025</h2>
          <DonutChart data={DATA.timeDistribution} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
            {DATA.timeDistribution.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <div className="text-left">
                  <div className="text-xs opacity-50 font-bold">{item.label}</div>
                  <div className="text-lg font-bold">{item.value}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 2: Labor Stats Detail */}
        <Slide isActive={currentSlide === 2} direction={direction}>
          <div className="flex flex-col items-center w-full max-w-xl">
            <Briefcase size={48} className="text-emerald-500 mb-6" />
            <h2 className="text-3xl font-bold mb-10 text-center">La realidad laboral del año</h2>
            <div className="space-y-6 w-full">
              {DATA.laborStats.map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-xl font-bold"><CountUp value={item.value} /> días</span>
                  </div>
                  <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / 237) * 100}%` }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* Slide 3: Recruitment Funnel */}
        <Slide isActive={currentSlide === 3} direction={direction}>
          <h2 className="text-4xl font-serif mb-12">Buscar trabajo también es trabajo</h2>
          <div className="flex flex-col items-center space-y-4 w-full max-w-lg">
            {DATA.jobFunnel.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="w-full bg-white/5 p-6 rounded-2xl flex justify-between items-center border border-white/10"
                style={{ width: `${100 - i * 10}%` }}
              >
                <span className="text-xl font-semibold">{item.stage}</span>
                <span className="text-3xl font-bold" style={{ color: item.color }}>{item.count}</span>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 4: Skill Development & Classes */}
        <Slide isActive={currentSlide === 4} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Habilidades & Disciplina</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {DATA.classes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-start"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-2xl font-bold">{item.category}</span>
                </div>
                <div className="text-5xl font-black mb-2">{item.count}</div>
                <div className="text-emerald-500 font-medium">{item.subLabel}: {item.subValue}</div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 5: Global Mobility Summary */}
        <Slide isActive={currentSlide === 5} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Kilómetros recorridos</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col items-center">
              <Plane size={48} className="text-blue-400 mb-4" />
              <span className="text-6xl font-black">{DATA.travelSummary.aviones}</span>
              <span className="opacity-50 uppercase tracking-tighter text-xs">Aviones tomados</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe size={48} className="text-emerald-400 mb-4" />
              <span className="text-6xl font-black">{DATA.travelSummary.ciudades}</span>
              <span className="opacity-50 uppercase tracking-tighter text-xs">Ciudades visitadas</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin size={48} className="text-pink-400 mb-4" />
              <span className="text-6xl font-black">{DATA.travelSummary.viajes}</span>
              <span className="opacity-50 uppercase tracking-tighter text-xs">Viajes grandes</span>
            </div>
          </div>
        </Slide>

        {/* Slide 6: Photography & Travel Detail */}
        <Slide isActive={currentSlide === 6} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Memorias capturadas</h2>
          <div className="space-y-6 w-full max-w-xl">
            {DATA.travel.map((t, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="text-2xl font-bold w-32 text-right whitespace-nowrap">{t.destination}</span>
                <div className="flex-1 h-12 bg-white/5 rounded-full overflow-hidden flex items-center px-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(t.photos / 1784) * 100}%` }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                </div>
                <span className="text-xl font-bold w-24 text-left">{t.photos} <Camera size={16} className="inline opacity-50 mb-1" /></span>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 7: Music & Entertainment */}
        <Slide isActive={currentSlide === 7} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Cultura & Fans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {DATA.music.map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-full border border-white/10 flex flex-col items-center justify-center aspect-square"
              >
                {i === 0 && <Ticket className="mb-4 text-pink-400" />}
                {i === 1 && <Music className="mb-4 text-blue-400" />}
                {i === 2 && <Disc className="mb-4 text-purple-400" />}
                <span className="text-4xl font-black mb-2">{m.count}</span>
                <span className="text-sm opacity-60 text-center leading-tight">{m.label}</span>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 8: Mental Health & Self-care */}
        <Slide isActive={currentSlide === 8} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Autocuidado & Salud</h2>
          <div className="space-y-8 w-full max-w-2xl">
            {DATA.therapyPlus.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-xl opacity-80">{item.label}</span>
                <span className="text-4xl font-black" style={{ color: item.color }}>{item.count}</span>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 9: Coding & Commits */}
        <Slide isActive={currentSlide === 9} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Código & Productividad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {DATA.codeStats.map((stat, i) => (
              <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center">
                {i === 0 && <Github className="mb-4 text-emerald-400" />}
                {i === 1 && <MessageSquare className="mb-4 text-blue-400" />}
                {i === 2 && <Terminal className="mb-4 text-pink-400" />}
                <span className="text-5xl font-black mb-2">{stat.count}</span>
                <span className="opacity-50 text-sm uppercase text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 10: AI Interaction (Cursor) */}
        <Slide isActive={currentSlide === 10} direction={direction}>
          <Sparkles size={64} className="text-yellow-400 mb-8" />
          <h2 className="text-2xl opacity-60 mb-4">Tokens en Cursor AI</h2>
          <div className="text-5xl md:text-8xl font-black text-emerald-500 mb-6 tracking-tighter">
            {DATA.cursorTokens}
          </div>
          <p className="text-xl max-w-md mx-auto opacity-70">
            Expandiendo los límites de lo que puedo construir con ayuda de LLMs.
          </p>
        </Slide>

        {/* Slide 11: Conversation Topics */}
        <Slide isActive={currentSlide === 11} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Conversaciones del año</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {DATA.conversations.map((conv, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: i * 0.1 }}
                className={`rounded-full flex items-center justify-center p-6 border border-white/20 bg-emerald-500/10 ${getBubbleSize(conv.size)}`}
              >
                <span className="font-bold text-center leading-tight">{conv.text}</span>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 12: Gacha Games Stats */}
        <Slide isActive={currentSlide === 12} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Gacha & Coleccionismo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {DATA.gacha.map((g, i) => (
              <div key={i} className="relative group">
                <div 
                  className="absolute inset-0 blur-2xl opacity-20 transition-opacity group-hover:opacity-40 rounded-full" 
                  style={{ backgroundColor: g.color }} 
                />
                <div className="relative bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col items-center">
                  <span className="text-xl font-bold mb-4 opacity-70">{g.game}</span>
                  <span className="text-6xl font-black mb-2">{g.chars}</span>
                  <span className="text-xs uppercase tracking-widest opacity-40">Personajes 5★</span>
                </div>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 13: Internal Transformations */}
        <Slide isActive={currentSlide === 13} direction={direction}>
          <h2 className="text-3xl font-bold mb-12">Transformación Personal</h2>
          <div className="flex flex-col gap-8 w-full max-w-2xl">
            {DATA.transformations.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4 md:gap-8">
                <div className="flex-1 p-6 bg-red-500/10 rounded-2xl border border-red-500/20 line-through opacity-40 text-lg md:text-xl italic">
                  {t.before}
                </div>
                <Zap className="text-yellow-400 shrink-0" />
                <div className="flex-1 p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-xl md:text-2xl font-bold">
                  {t.after}
                </div>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 14: Emotional Growth Radar */}
        <Slide isActive={currentSlide === 14} direction={direction}>
          <h2 className="text-3xl font-bold mb-4">Radar de Evolución</h2>
          <p className="opacity-60 mb-8 italic">Midiendo el progreso subjetivo en distintas áreas</p>
          <EmotionalRadar data={DATA.emotionalRadar} />
        </Slide>

        {/* Slide 15: Goodbye / Outro */}
        <Slide isActive={currentSlide === 15} direction={direction}>
          <Heart size={64} className="text-red-500 mb-8" />
          <h2 className="text-5xl md:text-7xl font-serif mb-6">Gracias 2025.</h2>
          <p className="text-xl md:text-2xl opacity-60 max-w-lg mx-auto mb-12 italic">
            "Todo lo que medimos es susceptible de ser sanado"
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentSlide(0)}
            className="px-8 py-4 bg-emerald-500 rounded-full font-bold text-lg flex items-center gap-2 text-white"
          >
            Volver a empezar <ChevronUp size={20} />
          </motion.button>
        </Slide>
      </div>

      {/* Floating Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-20 transition-all text-white"
        >
          <ChevronUp size={24} />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-20 transition-all text-white"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

// Exporting the component as default to satisfy the import in index.tsx
export default App;
