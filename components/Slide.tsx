
import React, { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface SlideProps {
  children: ReactNode;
  isActive: boolean;
  direction: number;
}

const Slide: React.FC<SlideProps> = ({ children, isActive, direction }) => {
  // Using the Variants type explicitly allows framer-motion to correctly identify 
  // the [number, number, number, number] array as a cubic-bezier Easing.
  const variants: Variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // expoOut
      }
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      {isActive && (
        <motion.div
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center p-8 md:p-16 text-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Slide;
