import './VideoSection.scss';

export default function VideoSection() {
    return (
        <div className="videosection-container">
            <video autoPlay loop muted>
                <source src='/videos/leagues.mp4' type="video/mp4" />
            </video>
        </div>
    )
}