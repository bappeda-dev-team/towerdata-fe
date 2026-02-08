interface TableComponent {
    children: React.ReactNode;
    className?: string;
}

const TableComponent: React.FC<TableComponent> = ({ children, className }) => {
    return(
        <div className={`overflow-auto rounded-t-lg border ${className}`}>
            {children}
        </div>
    )
}

export default TableComponent;