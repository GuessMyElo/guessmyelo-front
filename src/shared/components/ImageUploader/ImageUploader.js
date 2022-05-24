import React from "react";
import InputField from "../InputField/InputField";
import "./ImageUploader.scss";

const ImageUploader = ({...rest}) => {
  return (
    <div className="uploader">
      <label htmlFor="uploader"><p>Importer une image</p></label>
      <InputField className="uploader-input" type="file" id="uploader" accept=".jpg, .jpeg, .png, .gif" {...rest}/>
    </div>
  );
};

export default ImageUploader;
