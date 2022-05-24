import './Button.scss';

export default function Button({children, size, reversed, disabled, backgroundcolor, ...rest}) {
    return <button className={reversed ? 'reversed' : 'classic'} style={{width: size || "100%", backgroundColor : backgroundcolor}} disabled={disabled} {...rest}>{children}</button>
}