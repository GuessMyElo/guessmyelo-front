import Button from 'shared/components/Button/Button';
import FloatingCard from 'shared/components/FloatingCard/FloatingCard';
import ProgressBar from 'shared/components/ProgressBar/ProgressBar';
import './Upload.scss';

export default function Upload() {
    return (
        <div className='upload-container'>
            <FloatingCard>
                <h1>Upload</h1>
                <Button size="50%">Choisir un fichier</Button>
                <p>filename.mp4</p>
                <ProgressBar value={73} />
            </FloatingCard>
        </div>
    )
}