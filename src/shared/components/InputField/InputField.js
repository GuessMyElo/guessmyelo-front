import './InputField.scss';

export default function InputField({placeholder, type, inputRef,backgroundcolor,textcolor, ...rest}) {
    return <input type={type || "text"} placeholder={placeholder} ref={inputRef} style={{ backgroundColor : backgroundcolor ?? "#1A213F", color : textcolor ?? "#7D8091"}}  {...rest}/>
}