import './Button.scss';

export default function Button({children, size, reversed, ...rest}) {
    return <button className={reversed ? 'reversed' : 'classic'} style={{width: size || "100%"}} {...rest}>{children}</button>
}