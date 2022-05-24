import './InputField.scss';

export default function InputField({placeholder, type, ...rest}) {
    return <input type={type || "text"} placeholder={placeholder} {...rest}/>
}