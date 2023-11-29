import { React,   useState } from "react";

import { Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useS3 from "../hooks/useS3";
import "./Addcat.css";
import { base_url } from "../utils/baseUrl";

const Addcat = () => {
  const { uploadToS3 } = useS3();

  const [categoryname, setCategoryname] = useState("");
  const [icon, setIcon] = useState("");
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const [singleFile, setSingleFile] = useState(null);

  const handleSingleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setSingleFile(selectedFile);

    // Use the uploadToS3 function to upload the single selected file immediately
    if (selectedFile) {
      const key = `path/to/single/${selectedFile.name}`;
      const url = await uploadToS3(selectedFile, key);

      if (url) {
        setIcon(url);
      }
    }
  };
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      if (inputValue.trim() !== "") {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = {
      name: categoryname,
      slug: slug,
      icon: icon,
      tags: tags,
    };
    fetch(`${base_url}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          navigate("/admin/list-category");
        }
      });
  };

  return (
    <div>
      <h3 className="mb-4  title">Category</h3>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              for="name"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Category Name
            </label>
            <Input
              type="name"
              onChange={(e) => setCategoryname(e.target.value)}
              label="Enter Product Category"
              id="name"
              name="name"
              placeholder="Example:  All Door"
              style={{ width: "100%", padding: "15px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="icon"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Icon
            </label>

            {icon && (
              <div>
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={icon}
                  alt="Uploaded"
                />
              </div>
            )}
            <Input
              onChange={handleSingleFileChange}
              type="file"
              label="Enter Category icon"
              id="icon"
              name="icon"
              style={{ width: "100%", padding: "15px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="slug"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              slug name
            </label>
            <Input
              onChange={(e) => setSlug(e.target.value)}
              type="slug"
              label="Enter Product slug"
              id="slug"
              name="slug"
              placeholder=" Example: service "
              style={{ width: "100%", padding: "15px" }}
            />
          </div>

          <div>
            <div className="tag-input">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag}
                  <span className="remove" onClick={() => removeTag(tag)}>
                    &times;
                  </span>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Enter tags"
              />
            </div>
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add-Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
