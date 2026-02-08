import { motion } from 'framer-motion';

interface modal {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

export const ModalComponent: React.FC<modal> = ({ isOpen, onClose, children }) => {

    if (!isOpen) {
        return null;
    } else {

        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        // delay: 0,
                        duration: 0.2,
                        ease: "backOut"
                    }}
                    className="bg-white rounded-lg px-8 py-5 z-10 w-4/5 max-h-[80%] overflow-y-auto"
                >
                    {children}
                </motion.div>
            </div>
        )
    }
}