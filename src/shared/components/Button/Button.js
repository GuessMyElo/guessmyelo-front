import './Button.scss';

export default function Button({children, size, reversed}) {
    return <button className={reversed ? 'isReversed' : ''} style={{width: size || "100%"}}>{children}</button>
}