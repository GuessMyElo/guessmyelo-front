import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Homepage.scss";
import FloatingCard from "@/shared/components/FloatingCard/FloatingCard";
import Picture from "@/modules/Player/Avatar/atoms/Picture/Picture";
import Button from "@/shared/components/Button/Button";
import InputField from "@/shared/components/InputField/InputField";
import ImageUploader from "shared/components/ImageUploader/ImageUploader";
import axios from "axiosConfig";
import { useAuthState } from "context/Auth";
import ProgressBar from "shared/components/ProgressBar/ProgressBar";
import Logout from "@/shared/components/Logout/Logout";

export default function Homepage() {
  const { user } = useAuthState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate =  useNavigate();

  const handleSendImage = (file) => {
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("folder", "profilepics");
    formData.append("file", file);
    axios
      .post("/cloudinary/image", formData, {
        onUploadProgress: (ProgressEvent) =>
          setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100),
      })
      .then((res) => {
        setFile(res.data.url);
        setProgress(0);
      });
  };

  const createRoom = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'/rooms/create', {user_id: user.id})
        .then((res) => {
            navigate(`lobby/${res.data.room_id}`)
        })
        .catch((err) => console.log(err))
  }

  useEffect(() => {
    setFile(user.imageUrl);
  }, [user.imageUrl]);

  return (
    <div className="homepage-container">
      <Logout />
      <FloatingCard>
        <h1>Jouer</h1>
        <div className="avatar-container">
          <div className="user-profile">
            <Picture src={file || "images/player.jpg"} size="130" />
          </div>
          <div className="avatar-select">
            <ImageUploader
              onInput={(e) => handleSendImage(e.target.files[0])}
            />
            <div className="default-avatar">
              <Picture src="images/player.jpg" size="50" />
              <Picture src="images/player.jpg" size="50" />
              <Picture src="images/player.jpg" size="50" />
            </div>
          </div>
        </div>
        <form>
          <InputField placeholder="Pseudo" value={user.username} disabled />
          <div className="form-row">
            <InputField placeholder="Code de la partie" />
            <Button>Rejoindre la partie</Button>
          </div>
          <Button onClick={createRoom}>Créer une partie</Button>
          <Link to="/upload">
            <Button reversed>Uploader une video</Button>
          </Link>
          {user.role === "admin" && (
            <Link to="/verify">
              <Button reversed>Vérifier les vidéos</Button>
            </Link>
          )}
        </form>
        {progress > 0 && <ProgressBar value={progress} />}
      </FloatingCard>
    </div>
  );
}
