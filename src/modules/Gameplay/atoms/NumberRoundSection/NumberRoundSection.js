import './NumberRoundSection.scss';

export default function NumberRoundSection({children}) {
    return (
        <div className="numberroundsection-container">
            <img className='filter-light' src='/images/medal-solid.svg'></img>
            {children}
        </div>
    )
}