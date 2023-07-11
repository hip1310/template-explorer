import React from "react";
import { imageWithMetaType } from "./Home";
import { useNavigate } from "react-router-dom";
import { fileExtension, getSrc } from "../CommonMethods";

const renderMeta = (key: string, value: string) => {
  return (
    <p id={value}>
      <strong>{key}</strong> {value}
    </p>
  );
};

const ImageWithMeta = (currentImage: imageWithMetaType) => {
  const navigate = useNavigate();

  return (
    <div id="large">
      <div className="group">
        <img
          src={getSrc(currentImage.image, "large")}
          alt={currentImage.image}
          width="430"
          height="360"
        />
        <div className="details">
          {renderMeta("Title", currentImage.title)}
          {renderMeta("Description", currentImage.description)}
          {renderMeta("Cost", currentImage.cost)}
          {renderMeta("ID #", currentImage.id)}
          {renderMeta(
            "Thumbnail File",
            currentImage.thumbnail &&
              currentImage.thumbnail.includes("data:image")
              ? currentImage.id + "-m." + fileExtension(currentImage.thumbnail)
              : currentImage.thumbnail
          )}
          {renderMeta(
            "Large Image File",
            currentImage.image && currentImage.image.includes("data:image")
              ? currentImage.id + "-b." + fileExtension(currentImage.image)
              : currentImage.image
          )}
        </div>
        <div className="display-inline-block">
          <button
            onClick={() => navigate("/edit/" + currentImage.id)}
            className="margin-top-10-px"
          >
            Edit Thumbnail
          </button>
          <button
            onClick={() => currentImage.onDeleteThumbnail()}
            className="margin-top-10-px"
          >
            Delete Thumbnail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageWithMeta;
