import axios from "axiosConfig";
import { useAuthState } from "context/Auth";
import VideoSection from "modules/Gameplay/atoms/VideoSection/VideoSection";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "shared/components/Button/Button";
import FloatingCard from "shared/components/FloatingCard/FloatingCard";
import ProgressBar from "shared/components/ProgressBar/ProgressBar";
import { Capitalize, gameList } from "Utils";
import "./Verify.scss";

const Verify = () => {
  const { user } = useAuthState();
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(0);
  const videosRef = useRef([]);

  useEffect(() => {
    if (user.role === "admin") {
      videosRef.current = videosRef.current.slice(0, videos.length);
      axios.get("/video/notverified").then((res) => {
        setVideos(res.data);
      });
    }
  }, []);

  const handleAccept = async (video) => {
    const cloudinaryRes = await axios.put("/cloudinary/validate", video, {
      onUploadProgress: (ProgressEvent) =>
        setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100),
    });
    if (cloudinaryRes.data.error) {
      toast.error(cloudinaryRes.data.message);
    } else {
      toast.success(cloudinaryRes.data.message);
      setVideos((old) => old.filter((e) => e.id !== video.id));
    }
  };

  const handleDelete = async ({ public_id, id }) => {
    const cloudinaryRes = await axios.delete(`/cloudinary/${public_id}`, {
      onUploadProgress: (ProgressEvent) =>
        setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100),
    });

    if (cloudinaryRes.data.error) {
      toast.error(cloudinaryRes.data.message);
    } else {
      await axios.delete(`/video/${id}`);
      toast.success(cloudinaryRes.data.message);
      setVideos((old) => old.filter((e) => e.id !== id));
    }
  };

  if (user.role === "admin") {
    return (
      <div className="verify-container">
        <FloatingCard>
          <h1>Vérifier</h1>
          <div className="videos">
            {videos.length > 0 &&
              videos.map((video, index) => {
                return (
                  <div className="video">
                    <VideoSection
                      controls
                      key={index}
                      source={video.url}
                      videoRef={(e) => (videosRef.current[index] = e)}
                    />
                    <p>Jeu : {gameList[video.game]}</p>
                    <p>Rang : {Capitalize(video.rank)}</p>
                    <div className="buttons">
                      <Button size={"45%"} onClick={() => handleAccept(video)}>
                        Accepter
                      </Button>
                      <Button
                        backgroundcolor="#800404"
                        size={"45%"}
                        onClick={() => handleDelete(video)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
          {progress > 0 && <ProgressBar value={progress} />}
        </FloatingCard>
      </div>
    );
  } else {
    return (
      <div className="verify-container">
        <p>ACCÈS REFUSÉ</p>
        <a href="/">Retourner à la page d'accueil</a>
      </div>
    );
  }
};

export default Verify;
