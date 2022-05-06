import './VideoSection.scss';

export default function VideoSection({source,videoRef, ...rest}) {
    return (
        <div {...rest} className="videosection-container">
            <video autoPlay loop muted ref={videoRef}>
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}