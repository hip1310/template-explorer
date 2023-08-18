import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageWithMetaSkeleton from "./components/Skeleton/ImageWithMetaSkeleton";
import SkeletonButton from "./components/Skeleton/SkeletonButton";
import ThumbnailsSkeleton from "./components/Skeleton/ThumbnailsSkeleton";

const Loader = () => {
  return (
    <div id="main" role="main">
      <div className="text-align-right">
        <SkeletonButton className="margin-top-10-px" />
      </div>
      <h3 className="padding-left-10-px">
        <SkeletonButton className="margin-top-10-px" />
      </h3>
      <div className="text-align-left margin-top-10-px">
        <div className="row">
          <div className="col-xs-6">
            <Skeleton height={30} />
          </div>
          <div className="col-xs-2">
            <Skeleton height={30} />
          </div>
          <div className="col-xs-2">
            <Skeleton height={30} />
          </div>
          <div className="col-xs-2">
            <Skeleton height={30} />
          </div>
        </div>
        <SkeletonButton className="margin-left-50-percent margin-top-10-px" />
      </div>

      <ImageWithMetaSkeleton />
      <ThumbnailsSkeleton />
    </div>
  );
};

export default Loader;
