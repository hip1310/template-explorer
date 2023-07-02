import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAPI } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddThumbnails = () => {
  type AddThumbnailsType = {
    title: string;
    cost: string;
    description: string;
    thumbnail: string;
    image: string;
  };
  const [data, setData] = useState<AddThumbnailsType>({
    title: "",
    cost: "",
    description: "",
    thumbnail: "7111-m.jpg",
    image: "7111-b.jpg",
  });

  const navigate = useNavigate();
  const params = useParams();
  const isEdit = params.id;

  const addNewTemplate = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axiosAPI[isEdit ? "put" : "post"]("/home/add", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
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
      .catch(() => {
        //If any error occurs during calling api then will navigate to error page
        navigate("/error");
      });
  };

  useEffect(() => {
    console.log(isEdit);
    if (isEdit) {
      const callApi = () => {
        axiosAPI
          .get(`/home/getById/${isEdit.toString()}`)
          .then((res) => {
            if (res.status === 200) {
              const data = res?.data || {};
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
  }, []);

  const onChange = (key: string, value: string) => {
    setData({ ...data, [key]: value });
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
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Cost :</div>
          <div className="col-xs-6">
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              value={data.cost}
              onChange={(element) => onChange("cost", element.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Thumbnail name :</div>
          <div className="col-xs-6">
            <select
              className="margin-bottom-10-px"
              value={data.thumbnail}
              onChange={(element) => {
                onChange("thumbnail", element.target.value);
              }}
            >
              <option value="7111-m.jpg">7111-m.jpg</option>
              <option value="7112-m.jpg">7112-m.jpg</option>
              <option value="7118-m.jpg">7118-m.jpg</option>
              <option value="7124-m.jpg">7124-m.jpg</option>
              <option value="7130-m.jpg">7130-m.jpg</option>
              <option value="7131-m.jpg">7131-m.jpg</option>
              <option value="7141-m.jpg">7141-m.jpg</option>
              <option value="7143-m.jpg">7143-m.jpg</option>
              <option value="7147-m.jpg">7147-m.jpg</option>
              <option value="7150-m.jpg">7150-m.jpg</option>
              <option value="7152-m.jpg">7152-m.jpg</option>
              <option value="7155-m.jpg">7155-m.jpg</option>
              <option value="7160-m.jpg">7160-m.jpg</option>
              <option value="7162-m.jpg">7162-m.jpg</option>
              <option value="7164-m.jpg">7164-m.jpg</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3">Image name :</div>
          <div className="col-xs-6">
            <select
              className="margin-bottom-10-px"
              value={data.image}
              onChange={(element) => {
                onChange("image", element.target.value);
              }}
            >
              <option value="7111-b.jpg">7111-b.jpg</option>
              <option value="7112-b.jpg">7112-b.jpg</option>
              <option value="7118-b.jpg">7118-b.jpg</option>
              <option value="7124-b.jpg">7124-b.jpg</option>
              <option value="7130-b.jpg">7130-b.jpg</option>
              <option value="7131-b.jpg">7131-b.jpg</option>
              <option value="7141-b.jpg">7141-b.jpg</option>
              <option value="7143-b.jpg">7143-b.jpg</option>
              <option value="7147-b.jpg">7147-b.jpg</option>
              <option value="7150-b.jpg">7150-b.jpg</option>
              <option value="7152-b.jpg">7152-b.jpg</option>
              <option value="7155-b.jpg">7155-b.jpg</option>
              <option value="7160-b.jpg">7160-b.jpg</option>
              <option value="7162-b.jpg">7162-b.jpg</option>
              <option value="7164-b.jpg">7164-b.jpg</option>
            </select>
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
            />
          </div>
        </div>
        <button className="add-new" name="addNew" type="submit">
          Add New
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
