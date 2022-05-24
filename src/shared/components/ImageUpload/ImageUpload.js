import React from "react";
import InputField from "../InputField/InputField";
import "./ImageUpload.scss";

const ImageUpload = ({...rest}) => {
  return (
    <div className="uploader">
      <label htmlFor="uploader"><p>Insérez une image</p></label>
      <InputField className="uploader-input" type="file" id="uploader" accept=".jpg, .jpeg, .png, .gif" {...rest}/>
    </div>
  );
};

export default ImageUpload;
