
import Picture from '../../atoms/Picture/Picture';
import './NamedAvatar.scss';
import { FaCrown } from "react-icons/fa";

export default function NamedAvatar({username, size, src, owner}) {

    let divsize = size+10;
    
    return (
        <div className={'NamedAvatar'} style={{width: divsize }}>
            <Picture src={src} size={size}/>
            <p>{owner &&(<FaCrown color='yellow'/>)}{username}</p>
        </div>
    )
}