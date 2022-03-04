import './FloatingCard.scss';

export default function FloatingCard({children}) {
    return (
        <div className="floatingcard">
            {children}
        </div>
    )
}