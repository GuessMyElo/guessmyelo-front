import './InputField.scss';

export default function InputField({placeholder, type, inputRef, ...rest}) {
    return <input type={type || "text"} placeholder={placeholder} ref={inputRef} {...rest}/>
}