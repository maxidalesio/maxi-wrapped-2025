
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Github, MessageSquare, Terminal, Heart, Camera, Briefcase, MapPin, Zap, Brain, Sparkles, Music, Ticket, Disc, Plane, Globe } from 'lucide-react';
import { DATA, COLORS } from './constants';
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
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientY);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientY;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchEnd - touchStart > 50) prevSlide();
    setTouchStart(null);
  };

  const maxClassesCount = Math.max(...DATA.classes.map(c => c.count));

  const getBubbleSize = (size: 'lg' | 'md' | 'sm') => {
    switch (size) {
      case 'lg': return 'w-40 h-40 md:w-60 md:h-60 text-lg md:text-2xl';
      case 'md': return 'w-32 h-32 md:w-48 md:h-48 text-base md:text-xl';
      case 'sm': return 'w-24 h-24 md:w-36 md:h-36 text-xs md:text-lg';
    }
  };

  return (
    <div 
      className="relative w-screen h-screen bg-[#0f172a] text-slate-200 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <motion.div 
          className="h-full bg-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative w-full h-full">
        {/* Slide 0: Intro */}
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

        {/* Slide 1: Time Distribution */}
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

        {/* Slide 2: Labor Stats */}
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

        {/* Slide 3: Job Funnel */}
        <Slide isActive={currentSlide === 3} direction={direction}>
          <h2 className="text-4xl font-serif mb-12">Buscar trabajo también es trabajo</h2>
          <div className="flex flex-col items-center space-y-4">
            {DATA.jobFunnel.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-md relative overflow-hidden group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-white/20">0{i+1}</div>
                  <div className="text-left">
                    <div className="text-sm opacity-50 uppercase tracking-tighter">Etapa</div>
                    <div className="text-xl font-bold">{item.stage}</div>
                  </div>
                </div>
                <div className="text-4xl font-black italic" style={{ color: item.color }}>
                  <CountUp value={item.count} />
                </div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 4: Classes & Constancia with Sub-metrics */}
        <Slide isActive={currentSlide === 4} direction={direction}>
          <div className="flex flex-col items-center w-full">
            <Zap size={48} className="text-sky-400 mb-6" />
            <h2 className="text-4xl font-serif mb-4 italic">Constancia invisible</h2>
            <p className="opacity-60 mb-12">Haciendo camino al andar</p>
            <div className="flex items-end gap-3 md:gap-8 h-80 w-full max-w-4xl justify-center overflow-visible">
              {DATA.classes.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <div className="relative flex flex-col items-center w-16 md:w-24">
                    <motion.div 
                      className="w-full rounded-t-3xl relative flex flex-col items-center justify-start pt-4"
                      initial={{ height: 0 }}
                      animate={{ height: `${(item.count / maxClassesCount) * 240}px` }}
                      transition={{ duration: 1, delay: i * 0.2, type: 'spring' }}
                      style={{ backgroundColor: item.color }}
                    >
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xl font-bold">
                        {item.count}
                      </span>
                      {/* Sub-metric badge */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + (i * 0.1) }}
                        className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 mt-2"
                      >
                         <span className="text-[10px] md:text-xs font-black whitespace-nowrap">
                           +{item.subValue}
                         </span>
                      </motion.div>
                    </motion.div>
                    <div className="mt-4 text-center">
                      <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.category}</div>
                      <div className="text-[9px] md:text-[11px] opacity-40 leading-tight mt-1 px-1">{item.subLabel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* Slide 5: Travel */}
        <Slide isActive={currentSlide === 5} direction={direction}>
          <div className="flex flex-col items-center w-full max-w-4xl px-4">
            <MapPin size={48} className="text-pink-400 mb-6" />
            <h2 className="text-4xl font-serif mb-10">Atrapando momentos</h2>
            
            {/* Travel Summary Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 w-full mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-3xl border border-white/10"
              >
                <Globe className="text-sky-400 mb-2" size={24} />
                <span className="text-3xl font-black">{DATA.travelSummary.viajes}</span>
                <span className="text-[10px] md:text-xs uppercase font-bold opacity-40">Viajes</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-3xl border border-white/10"
              >
                <MapPin className="text-emerald-500 mb-2" size={24} />
                <span className="text-3xl font-black">{DATA.travelSummary.ciudades}</span>
                <span className="text-[10px] md:text-xs uppercase font-bold opacity-40">Ciudades</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-3xl border border-white/10"
              >
                <Plane className="text-pink-500 mb-2" size={24} />
                <span className="text-3xl font-black">{DATA.travelSummary.aviones}</span>
                <span className="text-[10px] md:text-xs uppercase font-bold opacity-40">Aviones</span>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {DATA.travel.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="relative h-48 md:h-64 rounded-3xl overflow-hidden bg-slate-800 flex flex-col items-center justify-center border-4 border-white/10 group shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <div className="relative z-20 flex flex-col items-center">
                     <Camera size={32} className="mb-2 text-white/50 group-hover:scale-110 transition-transform" />
                     <span className="text-xl md:text-2xl font-bold">{item.destination}</span>
                     <span className="text-lg opacity-80" style={{ color: item.color }}>{item.photos} fotos</span>
                  </div>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, ${item.color} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </Slide>

        {/* Slide 6: Music */}
        <Slide isActive={currentSlide === 6} direction={direction}>
          <Music size={48} className="text-purple-400 mb-6" />
          <h2 className="text-4xl font-serif mb-2 italic">Ritmos del 2025</h2>
          <p className="opacity-60 mb-12">El soundtrack de un año intenso</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {DATA.music.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
              >
                <div className="mb-4" style={{ color: item.color }}>
                  {i === 0 ? <Zap size={40} /> : i === 1 ? <Ticket size={40} /> : <Disc size={40} />}
                </div>
                <div className="text-5xl font-black mb-2" style={{ color: item.color }}>
                  <CountUp value={item.count} />
                </div>
                <div className="text-sm font-bold opacity-60 uppercase tracking-widest">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 7: Therapy Extended */}
        <Slide isActive={currentSlide === 7} direction={direction}>
          <h2 className="text-3xl font-serif mb-4 italic">No fue un año fácil...</h2>
          <h3 className="text-5xl font-black mb-12 text-emerald-500 uppercase tracking-tighter italic">...fue trabajado</h3>
          <div className="space-y-4 w-full max-w-md">
            {DATA.therapyPlus.map((item, i) => (
              <motion.div 
                key={i}
                className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl"
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-lg font-medium text-left">{item.label}</span>
                <span className="text-3xl font-bold ml-4" style={{ color: item.color }}>
                  <CountUp value={item.count} />
                </span>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 8: Code Stats + Cursor Tokens */}
        <Slide isActive={currentSlide === 8} direction={direction}>
          <Terminal size={48} className="text-purple-400 mb-6" />
          <h2 className="text-4xl font-serif mb-8">El año en código</h2>
          
          {/* Big Cursor Tokens Display */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-gradient-to-br from-purple-900/40 to-black/60 p-8 rounded-[3rem] border-2 border-purple-500/30 mb-12 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Sparkles size={120} />
             </div>
             <div className="text-sm font-black uppercase tracking-[0.3em] text-purple-400 mb-2">Cursor tokens</div>
             <div className="text-5xl md:text-7xl font-black text-white mb-2 drop-shadow-2xl">
                {DATA.cursorTokens}
             </div>
             <div className="text-xl font-bold opacity-60">tokens de Cursor procesados</div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {DATA.codeStats.map((item, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-black/40 border border-purple-500/10 rounded-3xl">
                <div className="text-4xl font-black mb-2" style={{ color: item.color }}>
                  <CountUp value={item.count} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-center opacity-50">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 opacity-40">
            <Github size={20} />
            <span className="text-xs font-mono uppercase">git commit -m "growth-2025"</span>
          </div>
        </Slide>

        {/* Slide 9: Conversations (Bubbles Redesign) */}
        <Slide isActive={currentSlide === 9} direction={direction}>
          <MessageSquare size={48} className="text-sky-400 mb-6" />
          <h2 className="text-4xl font-serif mb-2">Mi año en conversaciones</h2>
          <p className="text-xl opacity-60 mb-12 italic">Pensé en voz alta</p>
          
          <div className="w-full flex flex-col gap-6 md:gap-12 items-center justify-center flex-1 max-w-4xl mx-auto overflow-visible">
            {/* Top Row: Large Bubbles */}
            <div className="flex gap-4 md:gap-12 justify-center items-center flex-wrap">
              {DATA.conversations.filter(c => c.size === 'lg').map((conv, i) => {
                const color = i === 0 ? COLORS.primary : COLORS.accent;
                return (
                  <motion.div 
                    key={`lg-${i}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-full border-2 flex items-center justify-center p-6 text-center font-bold shadow-2xl backdrop-blur-sm ${getBubbleSize('lg')}`}
                    style={{ 
                      borderColor: color,
                      backgroundColor: `${color}25`,
                      color: COLORS.text,
                    }}
                  >
                    <span className="leading-tight drop-shadow-md select-none">{conv.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Row: Medium and Small Bubbles */}
            <div className="flex gap-4 md:gap-8 justify-center items-center flex-wrap">
              {DATA.conversations.filter(c => c.size !== 'lg').map((conv, i) => {
                const color = conv.size === 'md' ? COLORS.secondary : COLORS.purple;
                return (
                  <motion.div 
                    key={`other-${i}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`rounded-full border-2 flex items-center justify-center p-4 text-center font-bold shadow-2xl backdrop-blur-sm ${getBubbleSize(conv.size)}`}
                    style={{ 
                      borderColor: color,
                      backgroundColor: `${color}25`,
                      color: COLORS.text,
                    }}
                  >
                    <span className="leading-tight drop-shadow-md select-none">{conv.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Slide>

        {/* Slide 10: Gacha */}
        <Slide isActive={currentSlide === 10} direction={direction}>
          <Sparkles size={48} className="text-yellow-400 mb-6" />
          <h2 className="text-4xl font-serif mb-12">Gachas, Waifus & Husbandos</h2>
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
            {DATA.gacha.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ rotate: [0, -2, 2, 0] }}
                className="bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[3rem] border border-white/10 min-w-[200px]"
              >
                <div className="text-5xl font-black mb-2" style={{ color: item.color }}>
                  <CountUp value={item.chars} />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-50">Personajes armados</div>
                <div className="text-xl font-bold bg-white/10 py-2 px-4 rounded-full">{item.game}</div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* Slide 11: Transformation */}
        <Slide isActive={currentSlide === 11} direction={direction}>
          <Brain size={48} className="text-pink-500 mb-6" />
          <h2 className="text-4xl font-serif mb-12">Lo que entendí de mí</h2>
          <div className="space-y-8 w-full max-w-2xl">
            {DATA.transformations.map((t, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex-1 p-6 bg-pink-500/20 rounded-3xl border border-pink-500/30">
                  <span className="text-xs uppercase font-bold opacity-50 block mb-1">Antes</span>
                  <span className="text-2xl font-black">{t.before}</span>
                </div>
                <div className="text-3xl">→</div>
                <motion.div 
                  className="flex-1 p-6 bg-emerald-500/20 rounded-3xl border border-emerald-500/30"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  <span className="text-xs uppercase font-bold opacity-50 block mb-1">Ahora</span>
                  <span className="text-2xl font-black">{t.after}</span>
                </motion.div>
              </div>
            ))}
          </div>
        </Slide>

        {/* Slide 12: AI Mirror */}
        <Slide isActive={currentSlide === 12} direction={direction}>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-9xl font-black text-pink-400 mb-8 opacity-20 absolute select-none">IA</div>
            <h2 className="text-5xl md:text-6xl font-serif mb-12 leading-tight relative z-10">
              No decidió por mí.<br/>Me ayudó a <span className="text-sky-400 underline decoration-sky-400/30">escucharme</span>.
            </h2>
            <div className="w-24 h-1 bg-white/20 rounded-full mb-8" />
            <p className="text-xl opacity-60 italic max-w-lg">
              La IA no como guía absoluta, sino como espacio de reflexión.
            </p>
          </motion.div>
        </Slide>

        {/* Slide 13: Radar Chart */}
        <Slide isActive={currentSlide === 13} direction={direction}>
          <h2 className="text-3xl md:text-4xl font-serif mb-8 italic">Mi build emocional 2025</h2>
          <div className="w-full max-w-3xl">
            <EmotionalRadar data={DATA.emotionalRadar} />
          </div>
          <p className="mt-8 opacity-50 text-sm max-w-sm italic">
            El equilibrio no es una meta, es una disciplina diaria.
          </p>
        </Slide>

        {/* Slide 14: Summary Text */}
        <Slide isActive={currentSlide === 14} direction={direction}>
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left max-w-2xl px-4"
          >
            <h2 className="text-4xl font-serif italic mb-8 border-l-4 border-emerald-500 pl-6">Balance de fin de ciclo</h2>
            <p className="text-xl md:text-2xl leading-relaxed opacity-80 mb-6">
              El 2025 no fue un tablero de control con luces verdes. Fue un espacio de <span className="text-pink-400 font-bold">negociación</span> entre lo que quería ser y lo que necesitaba aprender.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed opacity-80">
              Menos oráculo, más <span className="text-sky-400 font-bold">reflejo</span>.
            </p>
          </motion.div>
        </Slide>

        {/* Slide 15: Final message */}
        <Slide isActive={currentSlide === 15} direction={direction}>
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2 }}
             className="text-center"
          >
            <h2 className="text-5xl md:text-8xl font-serif italic mb-8">Gracias 2025.</h2>
            <p className="text-2xl md:text-3xl opacity-60 mb-16">Fuiste el año que necesitaba, no el que esperaba.</p>
            <div className="flex gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(0)}
                className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full text-lg shadow-xl shadow-emerald-500/20"
              >
                Volver a empezar
              </motion.button>
            </div>
          </motion.div>
        </Slide>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-4 rounded-full border-2 transition-all ${currentSlide === 0 ? 'opacity-20 border-white/10' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
        >
          <ChevronUp size={24} />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`p-4 rounded-full border-2 transition-all ${currentSlide === totalSlides - 1 ? 'opacity-20 border-white/10' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-8 z-50 text-xs font-bold uppercase tracking-[0.3em] opacity-40">
        Slide {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default App;
