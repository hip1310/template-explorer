import React, { useEffect, useState } from "react";
import { axiosAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../utils/constants";
import Header from "../Header";
import Footer from "../Footer";
import Thumbnails from "./Thumbnails";
import ImageWithMeta from "./ImageWithMeta";

export type imageWithMetaType = {
  title: string;
  description: string;
  cost: string;
  id: string;
  thumbnail: string;
  image: string;
};

const Home = () => {
  const [currentImage, setCurrentImage] = useState<imageWithMetaType>({
    title: "",
    description: "",
    cost: "",
    id: "",
    thumbnail: "",
    image: "",
  });
  const [thumbnails, setThumbnails] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const callApi = (pageNo: number) => {
      //Creating request params
      const params = new URLSearchParams({
        page: pageNo.toString(),
        size: CONSTANTS.MAX_THUMBNAILS.toString(),
      });

      //calling api with request params page and size
      axiosAPI
        .get(`/home?${params.toString()}`)
        .then((res) => {
          if (res.status === 200) {
            const thumbnails = res?.data?.data || [];
            //set new thumbnails according to pagination
            setThumbnails(thumbnails);
            //select 1st thumbnail
            setCurrentImage(thumbnails[0]);
            //set total records in thumbnails
            setTotal(res?.data?.total);
          }
        })
        .catch(() => {
          //If any error occurs during calling api then will navigate to error page
          navigate("/error");
        });
    };

    //Calling callApi function on currentPageNo change
    callApi(currentPageNo);
  }, [currentPageNo, navigate]);

  return (
    <div id="container">
      <Header />
      <div id="main" role="main">
        <ImageWithMeta {...currentImage} />
        <Thumbnails
          thumbnails={thumbnails}
          currentPageNo={currentPageNo}
          setCurrentPageNo={setCurrentPageNo}
          total={total}
          onClickThumbnail={(element: imageWithMetaType) => {
            setCurrentImage(element);
          }}
          currentImageId={currentImage.id}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
