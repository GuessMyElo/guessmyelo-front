import './ProgressBar.scss';

export default function ProgressBar({width, value}) {
    return (
        <div className="progressbar" style={{width : width || "100%"}}>
            <div style={{width: value + '%'}}></div>
        </div>
    )
}