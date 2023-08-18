import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonButton = ({ className }: any) => {
  return <Skeleton count={1} height={30} width={100} className={className} />;
};

export default SkeletonButton;
