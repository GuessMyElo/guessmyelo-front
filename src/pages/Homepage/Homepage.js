import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";
import FloatingCard from "@/shared/components/FloatingCard/FloatingCard";
import Picture from "@/modules/Player/Avatar/atoms/Picture/Picture";
import Button from "@/shared/components/Button/Button";
import InputField from "@/shared/components/InputField/InputField";
import ImageUpload from "shared/components/ImageUpload/ImageUpload";
import axios from "axiosConfig";
import { toast } from "react-toastify";
import "./Homepage.scss";
import { useAuthState } from "context/Auth";
import FloatingCard from "@/shared/components/FloatingCard/FloatingCard";
import Picture from "@/modules/Player/Avatar/atoms/Picture/Picture";
import Button from "@/shared/components/Button/Button";
import InputField from "@/shared/components/InputField/InputField";

export default function Homepage() {
  const auth = useAuthState();
  const [file, setFile] = useState(null);

  const handleSendImage = (file) => {
    const formData = new FormData();
    formData.append("id", "2");
    formData.append("folder", "profilepics");
    formData.append("file", file);
    axios.post("/image", formData).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <div className="homepage-container">
      <FloatingCard>
        <h1>Jouer</h1>
        <div className="avatar-container">
          <Picture src="images/player.jpg" size="130" />
          <div className="avatar-select">
            <ImageUpload onInput={(e) => handleSendImage(e.target.files[0])} />
            <div className="default-avatar">
              <Picture src="images/player.jpg" size="50" />
              <Picture src="images/player.jpg" size="50" />
              <Picture src="images/player.jpg" size="50" />
            </div>
          </div>
        </div>
        <form>
          <InputField placeholder="Pseudo" />
          <div className="form-row">
            <InputField placeholder="Code de la partie" />
            <Button>Rejoindre la partie</Button>
          </div>
          <Link to="/lobby">
            <Button>Créer une partie</Button>
          </Link>
          <Link to="/upload">
            <Button reversed>Uploader une video</Button>
          </Link>
        </form>
      </FloatingCard>
    </div>
  );
}
