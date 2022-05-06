import './VideoSection.scss';

export default function VideoSection({source,videoRef}) {
    return (
        <div className="videosection-container">
            <video autoPlay loop muted ref={videoRef}>
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}