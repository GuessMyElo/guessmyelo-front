import './Button.scss';

export default function Button({children, size, reversed, disabled, ...rest}) {
    return <button className={reversed ? 'reversed' : 'classic'} style={{width: size || "100%"}} disabled={disabled} {...rest}>{children}</button>
}