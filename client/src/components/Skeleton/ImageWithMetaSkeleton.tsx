import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonButton from "./SkeletonButton";

const ImageWithMetaSkeleton = () => {
  return (
    <div id="large">
      <div className="group">
        <Skeleton height={360} width={430} className="float-left"  />
        <Skeleton count={6} width={250} className="float-right" />
      </div>
      <div className="display-inline-flex  margin-top-10-px">
        <SkeletonButton />
        <SkeletonButton className="margin-left-10-px" />
      </div>
    </div>
  );
};

export default ImageWithMetaSkeleton;
