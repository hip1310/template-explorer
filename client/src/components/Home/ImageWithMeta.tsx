import React from "react";
import { imageWithMetaType } from "./Home";

const renderMeta = (key: string, value: string) => {
  return (
    <p id={value}>
      <strong>{key}</strong> {value}
    </p>
  );
};



const ImageWithMeta = (currentImage: imageWithMetaType) => {
  return (
    <div id="large">
      <div className="group">
        <img
          src={
            currentImage.image &&
            require("../../images/large/" + currentImage.image)
          }
          alt={currentImage.image}
          width="430"
          height="360"
        />
        <div className="details">
          {renderMeta("Title", currentImage.title)}
          {renderMeta("Description", currentImage.description)}
          {renderMeta("Cost", currentImage.cost)}
          {renderMeta("ID #", currentImage.id)}
          {renderMeta("Thumbnail File", currentImage.thumbnail)}
          {renderMeta("Large Image File", currentImage.image)}
        </div>
      </div>
    </div>
  );
};

export default ImageWithMeta;
