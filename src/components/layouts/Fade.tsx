import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent } from 'react';

interface LayoutProps {
  children: any;
  id: string;
  isVisible?: boolean;
  className?: string;
}

export const Fade: FunctionComponent<LayoutProps> = ({
  id,
  isVisible = true,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={id}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
