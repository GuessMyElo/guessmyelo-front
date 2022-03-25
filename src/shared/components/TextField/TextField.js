import './TextField.scss';

export default function TextField({placeholder, innerRef}) {
    return <input type="text" placeholder={placeholder} ref={innerRef || null} />
}