import './TextField.scss';

export default function TextField({placeholder, innerRef, readonly}) {
    return <input type="text" placeholder={placeholder} ref={innerRef || null} readOnly={readonly} />
}