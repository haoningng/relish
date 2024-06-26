import { motion, AnimatePresence } from "framer-motion";

// interface Props{
//   children:React.ReactNode,
//   direction:'top' | 'bottom' | 'left' | 'right',
//   moveRange?:number,
//   id:any
// }

export default function SlideAnimatioWrapper({ children, direction, moveRange, id }) {
  const x = () => {
    const mRange = moveRange ? moveRange : 20
    switch (direction) {
      case 'left':
        return -mRange
      case 'right':
        return mRange
      default:
        return 0
    }
  }
  const y = () => {
    const mRange = moveRange ? moveRange : 20
    switch (direction) {
      case 'top':
        return -mRange
      case 'bottom':
        return mRange
      default:
        return 0
    }
  }
  const variants = {
    hidden: { opacity: 0, x: x(), y: y() },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: x(), y: y() },
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AnimatePresence
        mode="wait"
        initial={true}
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 });
          }
        }}
      >
        <motion.div
          key={id}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, type: "easeInOut" }}
          style={{ position: "relative", width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
