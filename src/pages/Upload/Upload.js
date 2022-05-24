import { useEffect, useRef, useState } from "react";
import FloatingCard from "shared/components/FloatingCard/FloatingCard";
import InputField from "shared/components/InputField/InputField";
import ProgressBar from "shared/components/ProgressBar/ProgressBar";
import axios from "axiosConfig";
import "./Upload.scss";
import Button from "shared/components/Button/Button";
import VideoSection from "modules/Gameplay/atoms/VideoSection/VideoSection";
import Select from "shared/components/Select/Select";
import { Capitalize, gameList, isEmpty, objectIsEmpty } from "Utils";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuthState } from "context/Auth";

export default function Upload() {
  const { user } = useAuthState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [game, setGame] = useState("");
  const [files, setFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRequestIndex, setCurrentRequestIndex] = useState("");
  const [totalRequestIndex, setTotalRequestIndex] = useState("");
  const rankOptions = [
    "iron",
    "bronze",
    "silver",
    "gold",
    "platine",
    "diamant",
    "master",
    "grandmaster",
    "challenger",
  ];
  const videosRef = useRef([]);
  const inputRef = useRef();

  useEffect(() => {
    videosRef.current = videosRef.current.slice(0, videos.length);
  }, [videos]);

  const handleSubmit = async () => {
    if (!isEmpty(game)) {
      const folder =
        user.role === "admin" ? `videos/${game}` : `verify/videos/${game}`;
      const signResponse = await axios.post("/cloudinary/signature", {
        folder,
      });
      const signData = await signResponse.data;
      const url = `http://api.cloudinary.com/v1_1/${signData.cloudname}/video/upload`;

      const formData = new FormData();

      let filesNotUploaded = { videos: [], files: [] };
      setIsLoading(true);
      for (let i = 0; i < files.length; i++) {
        if (!isEmpty(videos[i].rank)) {
          formData.append("file", files[i]);
          formData.append("api_key", signData.apikey);
          formData.append("timestamp", signData.timestamp);
          formData.append("signature", signData.signature);
          formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
          formData.append("folder", folder);

          try {
            const cloudinaryRes = await axios.post(url, formData, {
              withCredentials: false,
              onUploadProgress: (ProgressEvent) =>
                handleProgressBar(
                  (ProgressEvent.loaded / ProgressEvent.total) * 100,
                  i + 1,
                  files.length
                ),
            });
            await axios.post("/video", {
              rank: videos[i].rank,
              url: cloudinaryRes.data["secure_url"],
              public_id: cloudinaryRes.data["public_id"],
              userId: user.id,
              status: user.role === "admin" ? "verified" : "not verified",
              game,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          toast.error("Veuillez ajouter le rang de chaque vidéo.");
          filesNotUploaded.videos.push(videos[i]);
          filesNotUploaded.files.push(files[i]);
        }
      }

      if (!objectIsEmpty(filesNotUploaded)) {
        resetFile();
        setIsLoading(false);
        setUploadPercentage(0);
        setGame("");
        toast.success("Les fichiers ont été importés.");
      } else {
        setFiles(filesNotUploaded.files);
        setVideos(filesNotUploaded.videos);
        setUploadPercentage(0);
        toast.warn("Certains fichiers n'ont pas été importés");
      }
    } else {
      toast.error("Veuillez sélectionner un jeu.");
    }
  };

  const handleProgressBar = (
    percentage,
    currentRequestIndex,
    totalRequestIndex
  ) => {
    setUploadPercentage(percentage);
    setCurrentRequestIndex(currentRequestIndex);
    setTotalRequestIndex(totalRequestIndex);
  };

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);

    const videos = Array.from(newFiles).map((e) => ({
      src: URL.createObjectURL(e),
      rank: "",
    }));
    setVideos(videos);
  };

  const handleFileRemove = (index) => {
    setVideos((old) => old.filter((element, idx) => idx !== index));
    setFiles((old) => old.filter((element, idx) => idx !== index));
  };

  const resetFile = () => {
    setFiles([]);
    setVideos([]);
    inputRef.current.value = "";
  };

  return (
    <div className="upload-container">
      <FloatingCard>
        <h1>Upload</h1>
        <Select
          placeholder="Jeu"
          size={"300px"}
          options={Object.entries(gameList).map(([key, value]) => ({
            value: key,
            text: value,
          }))}
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />
        <InputField
          size={"300px"}
          id="video-input"
          type="file"
          accept="video/*"
          multiple
          inputRef={inputRef}
          onChange={(e) => handleFileChange(Array.from(e.target.files))}
          onClick={(e) => (e.target.value = null)}
        />
        <label htmlFor="video-input" className="video-input-label">
          Choisir un fichier
        </label>
        {files &&
          videos &&
          videos.map((video, index) => {
            return (
              <div key={index} className="video-preview">
                <VideoSection
                  autoPlay
                  loop
                  source={video.src}
                  videoRef={(e) => (videosRef.current[index] = e)}
                />
                <Select
                  placeholder={"Rang de la video"}
                  size={"50%"}
                  options={rankOptions.map((value) => ({
                    text: Capitalize(value),
                    value,
                  }))}
                  value={video.rank}
                  onChange={(e) =>
                    setVideos((old) =>
                      old.map((element, idx) =>
                        idx === index
                          ? { ...element, rank: e.target.value }
                          : element
                      )
                    )
                  }
                />
                <button onClick={() => handleFileRemove(index)}>
                  <FaTimes size={20} />
                </button>
              </div>
            );
          })}
        <Button
          size={"300px"}
          onClick={handleSubmit}
          disabled={files.length <= 0}
        >
          Envoyer
        </Button>
        {uploadPercentage > 0 && <ProgressBar value={uploadPercentage} />}
        {isLoading && (
          <p>
            {currentRequestIndex}/{totalRequestIndex}
          </p>
        )}
      </FloatingCard>
    </div>
  );
}
