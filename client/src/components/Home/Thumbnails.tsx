import React from "react";
import { Link } from "react-router-dom";
import { imageWithMetaType } from "./Home";

type thumbnailsType = {
  thumbnails: imageWithMetaType[];
  currentPageNo: number;
  setCurrentPageNo: any;
  total: number;
  onClickThumbnail: any;
  currentImageId?: string;
  pageSize: number;
};

const Thumbnails = ({
  thumbnails,
  currentPageNo,
  setCurrentPageNo,
  total,
  onClickThumbnail,
  currentImageId,
  pageSize,
}: thumbnailsType) => {
  const onFirst = () => {
    //Navigate to first page and will call api
    setCurrentPageNo(0);
  };
  const onLast = () => {
    //Navigate to last page and will call api
    setCurrentPageNo(Math.ceil(total / pageSize) - 1);
  };
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
    return Math.ceil(total/pageSize) === (currentPageNo +1)
  };

  const getTop = () => {
    return document.getElementById("thumbnailsGroup")?.clientHeight! / 2.5;
  };

  const getWidth = (size: number) => {
    if (
      size * pageSize >
      document.getElementById("thumbnailsGroup")?.clientWidth!
    ) {
      return (
        document.getElementById("thumbnailsGroup")?.clientWidth! / pageSize - 20
      );
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
                  width={pageSize > 4 ? getWidth(145) : 145}
                  height={pageSize > 4 ? "auto" : 121}
                />
                <span>{element.id}</span>
              </Link>
            );
          })}

        <Link
          className={`first ${isPreviousDisabled() ? "disabled" : ""}`}
          title="First"
          style={{
            top: getTop(),
          }}
          onClick={() => {
            !isPreviousDisabled() && onFirst();
          }}
          to={""}
        >
          First
        </Link>
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
        <Link
          className={`last ${isNextDisabled() ? "disabled" : ""}`}
          title="Last"
          style={{
            top: getTop(),
          }}
          onClick={() => {
            !isNextDisabled() && onLast();
          }}
          to={""}
        >
          Last
        </Link>
      </div>
    </div>
  );
};

export default Thumbnails;
