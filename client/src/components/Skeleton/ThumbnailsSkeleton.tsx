import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ThumbnailsSkeleton = () => {
  return (
    <div className="thumbnails">
      <div className="group" id="thumbnailsGroup">
        <Skeleton count={1} height={121} width={145} />
        <Skeleton
          count={1}
          height={121}
          width={145}
          className="margin-left-10-px"
        />
        <Skeleton
          count={1}
          height={121}
          width={145}
          className="margin-left-10-px"
        />
        <Skeleton
          count={1}
          height={121}
          width={145}
          className="margin-left-10-px"
        />
      </div>
    </div>
  );
};

export default ThumbnailsSkeleton;
