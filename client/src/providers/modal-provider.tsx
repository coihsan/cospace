import { createContext, useContext, useEffect, useState } from "react";

interface ModalProviderProps {
    children: React.ReactNode;
}

type ModalContextType = {
    isOpen: boolean;
    setOpen: (modal: React.ReactNode) => void;
    setClose: () => void
};

export const ModalContext = createContext<ModalContextType>({
    isOpen: false,
    setOpen: () => { },
    setClose: () => { }
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const setOpen = async (
        modal: React.ReactNode,
    ) => {
        setShowingModal(modal);
        setIsOpen(true);
    };

    const setClose = () => {
        setIsOpen(false);
    }

    if (!isMounted) return null;

    return (
        <ModalContext.Provider value={{ setOpen, isOpen, setClose }}>
            {children}
            {showingModal}
        </ModalContext.Provider>
    );
}
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within the modal provider");
    }
    return context;
};

export default ModalProvider