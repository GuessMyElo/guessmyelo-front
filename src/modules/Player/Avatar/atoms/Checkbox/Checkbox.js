import './Checkbox.scss';
import { FaCheck } from "react-icons/fa";
import Loader from 'shared/components/Loader/Loader';

export default function Checkbox({status, size}) {

    return (
        <div className={'checkbox'} style={{width: size + 'px', height: size + 'px', backgroundColor: status === "done" ? "#2ACE5B" : "#6953C3" }}>
            {status === "done" ? (
                <FaCheck/>
            )
            :(
                <Loader/>
            )
            }
        </div>
    )
}