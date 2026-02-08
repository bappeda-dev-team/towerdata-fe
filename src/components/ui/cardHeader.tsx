interface CardHeader {
    children: React.ReactNode;
    className?: string;
}

const CardHeader: React.FC<CardHeader> = ({ children, className }) => {
    return (
        <div className={`flex flex-wrap items-center justify-between border-b-2 rounded-sm border-blue-700 p-2 mb-2 ${className}`}>
            {children}
        </div>
    )
}

export default CardHeader;