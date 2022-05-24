
import Picture from '../../atoms/Picture/Picture';
import './NamedAvatar.scss';

export default function NamedAvatar({username, size, src}) {

    let divsize = size+10;
    
    return (
        <div className={'NamedAvatar'} style={{width: divsize }}>
            <Picture src={src} size={size}/>
            <p>{username}</p>
        </div>
    )
}