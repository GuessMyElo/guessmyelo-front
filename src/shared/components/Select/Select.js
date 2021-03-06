import './Select.scss';

export default function Select({placeholder, size, disabled, options, backgroundcolor, textcolor, ...rest}) {
    return (
        <select style={{width: size || "100%", backgroundColor : backgroundcolor ?? "#6953C3", color : textcolor ?? "rgb(197, 197, 197)"}} disabled={disabled} {...rest}>
            <option value="" hidden>{placeholder}</option>
            {options.map((option, index) => {
                return <option key={index} value={option.value}>{option.text}</option>
            })}
        </select>
    )
}