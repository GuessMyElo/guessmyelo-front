import { useEffect } from 'react';
import './VideoSection.scss';

export default function VideoSection({source,videoRef, loop, autoPlay, controls, ...rest}) {

    useEffect(() => {
        videoRef.current?.load();
    }, [source]);

    return (
        <div {...rest} className="videosection-container">
            <video controls={controls} loop={loop} autoPlay={autoPlay} muted ref={videoRef}>
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}