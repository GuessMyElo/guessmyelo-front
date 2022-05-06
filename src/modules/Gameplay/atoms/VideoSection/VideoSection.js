import './VideoSection.scss';

export default function VideoSection({source}) {
    return (
        <div className="videosection-container">
            <video autoPlay loop muted>
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}