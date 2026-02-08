interface ModalHeader {
    children: React.ReactNode;
    className?: string;
}

export const ModalHeader: React.FC<ModalHeader> = ({ children, className }) => {
    return (
        <div className={`w-max-[500px] mb-2 border-b ${className}`}>
            <h1 className="flex flex-wrap items-center justify-center gap-1 text-xl uppercase font-semibold pb-1">
                {children}
            </h1>
        </div>
    )
}