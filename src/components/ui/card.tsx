interface Card {
    children: React.ReactNode;
    className?: string;
}

const Card:React.FC<Card> = ({ children, className }) =>  {
    return(
        <div className={`my-3 p-2 rounded-xl border border-slate-100 bg-slate-100 ${className}`}>
            {children}
        </div>
    )
}

export default Card;