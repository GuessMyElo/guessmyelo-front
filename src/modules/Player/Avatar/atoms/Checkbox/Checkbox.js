import './Checkbox.scss';
import { useEffect } from 'react';

export default function Checkbox({status, size}) {
    var test = false;
    const _playerStatus = () => {
        console.log("playerstatus");
        if (status === "done") {
            console.log("done");
            test=true
            return "#2ACE5B";
        } else {
            console.log("waiting");
            return "#6953C3";
        }
    }
    useEffect(()=>{

    },[status]);

    return (
        <div className={'checkbox'} style={{width: size + 'px', height: size + 'px', backgroundColor: status === "done" ? "#2ACE5B" : "#6953C3" }}>
            {test ? (
                //TODO Ajouté svg "V" : validated / checked
                <p></p>
            )
            :(
                //TODO Ajouté "..." animé (gif ou style "est en train d ecrire")
                <p></p>
            )
            }
        </div>
    )
}