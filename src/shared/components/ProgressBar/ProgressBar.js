import './ProgressBar.scss';

export default function ProgressBar({value}) {
    return (
        <div className="progressbar">
            <div style={{width: value + '%'}}></div>
        </div>
    )
}