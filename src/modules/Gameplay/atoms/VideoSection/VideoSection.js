import { useEffect } from 'react';
import './VideoSection.scss';

export default function VideoSection({source,videoRef, ...rest}) {

    useEffect(() => {
        videoRef.current?.load();
    }, [source]);

    return (
        <div {...rest} className="videosection-container">
<<<<<<< HEAD
            <video autoPlay muted ref={videoRef}>
=======
            <video autoPlay loop muted ref={videoRef}>
>>>>>>> 2c16183fe97297c8d8b19a211ccc6847a04dfb2b
                <source src={source} type="video/mp4" />
            </video>
        </div>
    )
}