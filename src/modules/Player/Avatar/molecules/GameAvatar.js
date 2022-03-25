import Checkbox from '../atoms/Checkbox/Checkbox';
import Picture from '../atoms/Picture/Picture';
import './GameAvatar.scss';

export default function GameAvatar({status, size, src}) {
    
    return (
        <div className={'GameAvatar'} style={{width: "calc(size+10)" + 'px', height: "calc(size+10)" + 'px'}}>
            <Picture src={src} size={size}/>
            <Checkbox status={status} size={size-(size*0.7)}/>
        </div>
    )
}