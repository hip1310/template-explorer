import React from "react";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../utils/constants";
import { imageWithMetaType } from "./Home";

type thumbnailsType = {
  thumbnails: imageWithMetaType[];
  currentPageNo: number;
  setCurrentPageNo: any;
  total: number;
  onClickThumbnail: any;
  currentImageId: string;
};

const Thumbnails = ({
  thumbnails,
  currentPageNo,
  setCurrentPageNo,
  total,
  onClickThumbnail,
  currentImageId,
}: thumbnailsType) => {
  const onNext = () => {
    //Navigate to next page and will call api
    setCurrentPageNo(currentPageNo + 1);
  };

  const onPrevious = () => {
    //Navigate to previous page and will call api
    setCurrentPageNo(currentPageNo - 1);
  };

  const isPreviousDisabled = () => {
    //It will disable previous button based on currentPageNo
    return currentPageNo === 0;
  };

  const isNextDisabled = () => {
    //It will disable next button based on currentPageNo and total thumbnails
    return (
      currentPageNo * CONSTANTS.MAX_THUMBNAILS + CONSTANTS.MAX_THUMBNAILS >=
      total
    );
  };

  return (
    <div className="thumbnails">
      <div className="group">
        {thumbnails &&
          thumbnails.map((element, key) => {
            return (
              <Link
                key={key}
                onClick={() => {
                  onClickThumbnail(element);
                }}
                className={currentImageId === element.id ? "active" : ""}
                title={element.id}
                to={""}
              >
                <img
                  src={
                    element.thumbnail &&
                    require("../../images/thumbnails/" + element.thumbnail)
                  }
                  alt={element.thumbnail}
                  width="145"
                  height="121"
                />
                <span>{element.id}</span>
              </Link>
            );
          })}
        <Link
          className={`previous ${isPreviousDisabled() ? "disabled" : ""}`}
          title="Previous"
          onClick={() => {
            !isPreviousDisabled() && onPrevious();
          }}
          to={""}
        >
          Previous
        </Link>
        <Link
          className={`next ${isNextDisabled() ? "disabled" : ""}`}
          title="Next"
          onClick={() => {
            !isNextDisabled() && onNext();
          }}
          to={""}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Thumbnails;
