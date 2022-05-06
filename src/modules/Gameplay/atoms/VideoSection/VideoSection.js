import { useEffect } from 'react';
import './VideoSection.scss';

export default function VideoSection({source,videoRef, ...rest}) {

    useEffect(() => {
        videoRef.current?.load();
    }, [source]);

    return (
        <div {...rest} className="videosection-container">
            <video autoPlay loop muted ref={videoRef}>
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}