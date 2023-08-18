import React, { useEffect, useState } from "react";
import { axiosAPI } from "../../services";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Thumbnails from "./Thumbnails";
import ImageWithMeta from "./ImageWithMeta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader";

export type imageWithMetaType = {
  title: string;
  description: string;
  cost: string;
  id: string;
  thumbnail: string;
  image: string;
  onDeleteThumbnail?: any;
};

export type queryParamType = {
  searchTitle: string;
  sortBy: "title" | "cost" | "id" | "description" | "thumbnail" | "image";
  sortOrder: "asc" | "desc";
  pageSize: number;
  currentPageNo: number;
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
  const [thumbnails, setThumbnails] = useState<imageWithMetaType[]>([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<queryParamType>({
    searchTitle: "",
    sortBy: "title",
    sortOrder: "asc",
    pageSize: 4,
    currentPageNo: 0,
  });
  const [checked, setChecked] = useState<number[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    const callApi = (pageNo: number) => {
      setIsloading(true);
      //Creating request params
      const params = new URLSearchParams({
        page: pageNo.toString(),
        size: queryParams.pageSize.toString(),
        //sort by can be ["title","cost","id","description","thumbnail","image"]
        //sort directions can be asc/desc
        sortBy: queryParams.sortBy + " " + queryParams.sortOrder,
        searchTitle: queryParams.searchTitle,
      });

      //calling api with request params page and size
      axiosAPI
        .get(`/home?${params.toString()}`)
        .then((res) => {
          setIsloading(false);
          if (res.status === 200) {
            const thumbnails = res?.data?.data || [];
            //set new thumbnails according to pagination
            setThumbnails(thumbnails);
            //select 1st thumbnail
            setCurrentImage(thumbnails.length > 0 ? thumbnails[0] : {});
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
    callApi(queryParams.currentPageNo);
  }, [queryParams, navigate]);

  const setCurrentPageNo = (value: number) => {
    setQueryParams({ ...queryParams, currentPageNo: value });
  };
  const onChange = (key: string, value: string) => {
    setQueryParams({ ...queryParams, [key]: value, currentPageNo: 0 });
  };

  const onReset = () => {
    setQueryParams({
      searchTitle: "",
      sortBy: "title",
      sortOrder: "asc",
      pageSize: queryParams.pageSize,
      currentPageNo: 0,
    });
  };

  const onDeleteThumbnail = () => {
    if (checked.length === 0) {
      alert("please select at least one item");
    } else if (window.confirm("Are you sure to delete selected items ?")) {
      axiosAPI
        .patch(`/home/delete`, checked)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Template deleted successfully!");
            const thumbnails = res?.data?.data || [];
            //set new thumbnails according to pagination
            setThumbnails(thumbnails);
            //select 1st thumbnail
            setCurrentImage(thumbnails.length > 0 ? thumbnails[0] : {});
            setCurrentPageNo(0);
            setChecked([]);
            //set total records in thumbnails
            setTotal(res?.data?.total);
          }
        })
        .catch(() => {
          //If any error occurs during calling api then will navigate to error page
          navigate("/error");
        });
    }
  };

  const onSelect = (id: number, value: boolean) => {
    let checkedIds = [...checked];
    if (value) {
      if (!checkedIds.includes(id)) {
        checkedIds.push(id);
      }
    } else {
      if (checkedIds.includes(id)) {
        const index = checkedIds.indexOf(id);
        if (index > -1) {
          checkedIds.splice(index, 1);
        }
      }
    }
    setChecked(checkedIds);
  };

  return (
    <div id="container">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <div id="main" role="main">
            <div className="text-align-right">
              <button
                onClick={() => navigate("/add")}
                className="margin-top-10-px"
              >
                Add Thumbnail
              </button>
            </div>
            <h3 className="padding-left-10-px">Filters</h3>
            <div className="text-align-left margin-top-10-px">
              <div className="row">
                <div className="col-xs-6">
                  <p className="padding-left-10-px">Search Title :</p>
                  <input
                    id="searchTitle"
                    type="text"
                    className="margin-left-10-px"
                    value={queryParams.searchTitle}
                    onChange={(element) => {
                      onChange(element.target.id, element.target.value);
                    }}
                  />
                </div>
                <div className="col-xs-2">
                  <p className="padding-left-10-px">Sort by :</p>
                  <select
                    id="sortBy"
                    className="margin-left-10-px margin-right-10-px"
                    value={queryParams.sortBy}
                    onChange={(element) => {
                      onChange(element.target.id, element.target.value);
                    }}
                  >
                    <option value="title">Title</option>
                    <option value="cost">Cost</option>
                    <option value="id">Id</option>
                    <option value="description">Description</option>
                    <option value="thumbnail">Thumbnail</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div className="col-xs-2">
                  <p className="padding-left-10-px">Sort order :</p>
                  <select
                    id="sortOrder"
                    className="margin-left-10-px"
                    value={queryParams.sortOrder}
                    onChange={(element) => {
                      onChange(element.target.id, element.target.value);
                    }}
                  >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                  </select>
                </div>
                <div className="col-xs-2">
                  <p className="padding-left-10-px">Page Size :</p>
                  <select
                    id="pageSize"
                    className="margin-left-10-px"
                    value={queryParams.pageSize}
                    onChange={(element) => {
                      onChange(element.target.id, element.target.value);
                    }}
                  >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </div>
              </div>
              <div className="margin-top-10-px">
                <button
                  className="margin-left-50-percent"
                  onClick={() => {
                    onReset();
                  }}
                >
                  Reset All
                </button>
              </div>
            </div>

            {thumbnails.length > 0 ? (
              <>
                <ImageWithMeta
                  {...currentImage}
                  onDeleteThumbnail={onDeleteThumbnail}
                />
                <Thumbnails
                  thumbnails={thumbnails}
                  currentPageNo={queryParams.currentPageNo}
                  pageSize={queryParams.pageSize}
                  setCurrentPageNo={setCurrentPageNo}
                  total={total}
                  onClickThumbnail={(element: imageWithMetaType) => {
                    setCurrentImage(element);
                  }}
                  currentImageId={currentImage.id}
                  onSelect={onSelect}
                  checked={checked}
                />
              </>
            ) : (
              <>No Data found</>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
