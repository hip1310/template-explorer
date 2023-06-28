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

  const getTop = () => {
    return document.getElementById("thumbnailsGroup")?.clientHeight! /2.5
  };

  const getWidth = (size: number) => {
    if (size * CONSTANTS.MAX_THUMBNAILS > document.getElementById("thumbnailsGroup")?.clientWidth!) {
        return document.getElementById("thumbnailsGroup")?.clientWidth! / CONSTANTS.MAX_THUMBNAILS - 20;
      } else {
        return size;
      }
  };

  return (
    <div className="thumbnails">
      <div className="group" id="thumbnailsGroup">
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
                  width={CONSTANTS.MAX_THUMBNAILS > 4 ? getWidth(145) : 145}
                  height={CONSTANTS.MAX_THUMBNAILS > 4 ? "auto" : 121}
                />
                <span>{element.id}</span>
              </Link>
            );
          })}
        <Link
          className={`previous ${isPreviousDisabled() ? "disabled" : ""}`}
          title="Previous"
          style={{
            top: getTop(),
          }}
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
          style={{
            top: getTop(),
          }}
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
