import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAPI } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fileExtension } from "../CommonMethods";

const AddThumbnails = () => {
  type AddThumbnailsType = {
    id?: string;
    title: string;
    cost: string;
    description: string;
    thumbnail: string;
    thumbnailName: string;
    image: string;
    imageName: string;
  };
  const [data, setData] = useState<AddThumbnailsType>({
    title: "",
    cost: "",
    description: "",
    thumbnail: "",
    thumbnailName: "",
    image: "",
    imageName: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const isEdit = params.id;

  const addNewTemplate = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axiosAPI[isEdit ? "put" : "post"](
      isEdit ? "/home/update" : "/home/add",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            isEdit
              ? "Template updated successfully!"
              : "Template added successfully!"
          );
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          toast.error(error?.response.data?.error);
        } else {
          //If any error occurs during calling api then will navigate to error page
          navigate("/error");
        }
      });
  };

  useEffect(() => {
    if (isEdit) {
      const callApi = () => {
        axiosAPI
          .get(`/home/getById/${isEdit.toString()}`)
          .then((res) => {
            if (res.status === 200) {
              const data = res?.data || {};
              if (data.thumbnail.includes("data:image")) {
                data.thumbnailName =
                  data.id + "-m." + fileExtension(data.thumbnail);
              } else {
                data.thumbnailName = data.thumbnail;
              }

              if (data.image.includes("data:image")) {
                data.imageName = data.id + "-m." + fileExtension(data.image);
              } else {
                data.imageName = data.image;
              }
              setData(data);
            }
          })
          .catch(() => {
            //If any error occurs during calling api then will navigate to error page
            navigate("/error");
          });
      };
      callApi();
    }
  }, [isEdit, navigate]);

  const onChange = (key: string, value: string | any) => {
    setData({ ...data, [key]: value });
  };

  const onChangeImage = (key: string, event: any) => {
    const selectedfile = event.target.files;
    if (Number((selectedfile[0].size / 1024).toFixed(2)) > 5) {
      toast.error("Max image size is 5 kb");
    } else {
      if (selectedfile.length > 0) {
        const [imageFile] = selectedfile;
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const srcData = fileReader.result;
          const spllitedArrayOfName = (
            document.getElementById("file-input-" + key) as HTMLInputElement
          )?.value.split("\\");
          setData({
            ...data,
            [key]: srcData,
            [key + "Name"]: spllitedArrayOfName[spllitedArrayOfName.length - 1],
          });
        };
        fileReader.readAsDataURL(imageFile);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <h2 className="margin-top-0 margin-bottom-30-px">
        {isEdit ? <>Edit Thumbnail</> : <>Add Thumbnail</>}
      </h2>
      <form
        id="add-new-form"
        onSubmit={addNewTemplate}
        style={{ marginLeft: "30%", marginRight: "30%" }}
      >
        <div className="row">
          <div className="col-xs-3">Title : </div>
          <div className="col-xs-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={(element) => onChange("title", element.target.value)}
              maxLength={500}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Cost :</div>
          <div className="col-xs-6">
            <input
              type="text"
              name="cost"
              placeholder="Cost"
              value={data.cost}
              onChange={(element) => {
                if (!isNaN(Number(element.target.value))) {
                  onChange("cost", element.target.value);
                }
              }}
              maxLength={10}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Thumbnail name :</div>
          <div className="col-xs-6">
            <input
              type="file"
              accept="image/*"
              id="file-input-thumbnail"
              onChange={(event) => {
                onChangeImage("thumbnail", event);
              }}
            />
            <label
              id="file-input-thumbnail-label"
              htmlFor="file-input-thumbnail"
            >
              {data.thumbnailName ? data.thumbnailName : "Choose File"}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Image name :</div>
          <div className="col-xs-6">
            <input
              type="file"
              accept="image/*"
              id="file-input-image"
              onChange={(event) => {
                onChangeImage("image", event);
              }}
            />
            <label id="file-input-image-label" htmlFor="file-input-image">
              {data.imageName ? data.imageName : "Choose File"}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3"> Description :</div>
          <div className="col-xs-6">
            <textarea
              rows={3}
              name="description"
              placeholder="Description"
              value={data.description}
              onChange={(element) =>
                onChange("description", element.target.value)
              }
              required
            />
          </div>
        </div>
        <button className="add-new" name="addNew" type="submit">
          {isEdit ? "Update" : "Add New"}
        </button>
        <button
          className="cancel margin-left-10-px "
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
export default AddThumbnails;
