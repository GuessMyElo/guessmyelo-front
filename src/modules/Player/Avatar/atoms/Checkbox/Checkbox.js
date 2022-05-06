import './Checkbox.scss';
import { FaCheck } from "react-icons/fa";
import { useEffect } from 'react';
import Loader from 'shared/components/Loader/Loader';

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
            {status === "done" ? (
                //TODO Ajouté svg "V" : validated / checked
                <FaCheck/>
            )
            :(
                //TODO Ajouté "..." animé (gif ou style "est en train d ecrire")
                <Loader/>
            )
            }
        </div>
    )
}