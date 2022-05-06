import { useRef, useState } from 'react';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import InputField from 'shared/components/InputField/InputField';
import ProgressBar from 'shared/components/ProgressBar/ProgressBar';
import axios from 'axiosConfig';
import './Upload.scss';
import Button from 'shared/components/Button/Button';
import VideoSection from 'modules/Gameplay/atoms/VideoSection/VideoSection';

export default function Upload() {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [file, setFile] = useState(null);
    const [videoSrc, setVideoSrc] = useState("");
    const videoRef = useRef();

    const handleSubmit = async () => {
        const signResponse = await axios.get("/signature");
        const signData = await signResponse.data;
        const url = `http://api.cloudinary.com/v1_1/${signData.cloudname}/video/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", signData.apikey);
        formData.append("timestamp", signData.timestamp);
        formData.append("signature", signData.signature);
        formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
        formData.append("folder", "videos");

        axios.post(url, formData, {
            onUploadProgress: ProgressEvent => setUploadPercentage((ProgressEvent.loaded / ProgressEvent.total) * 100)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleFileChange = (file) => {
        setFile(file);

        const url = URL.createObjectURL(file);
        setVideoSrc(url);
    }

    const handleRemoveFile = () => {
        setFile(null);
        setVideoSrc("");
    }

    return (
        <div className='upload-container'>
            <FloatingCard>
                <h1>Upload</h1>
                <InputField id="video-input" type="file" accept="video/*" onChange={(e) => handleFileChange(e.target.files[0])}/>
                <label htmlFor="video-input" className='video-input-label'>
                    Choisir un fichier
                </label>
                {file && <button onClick={() => handleRemoveFile()}>Enlever</button> }
                {file && videoSrc && <VideoSection source={videoSrc} videoRef={videoRef} /> }
                <Button size={"20%"} onClick={() => handleSubmit()} disabled={!file}>Envoyer la vidéo</Button>
                <ProgressBar value={uploadPercentage} />
            </FloatingCard>
        </div>
    )
}