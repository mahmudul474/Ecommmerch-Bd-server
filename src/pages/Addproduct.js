import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Variyetions from "../components/VariyableProduct/Variyetions";
import useS3 from "../hooks/useS3";
import { base_url } from "../utils/baseUrl";
import uploadImages from "../utils/imgUpload";
import "./Addproduct.css";

const Addproduct = () => {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [productType, setProductType] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setProductType(value);
    setShowAdditionalFields(value === "variable_product");
  };

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleDiscountValueChange = (value) => {
    if (!isNaN(value)) {
      setDiscountValue(value);
    }
  };

  const [multipleImageLinks, setMultipleImageLinks] = useState([]);
  const [singleImageLink, setSingleImageLink] = useState(null);
  const [variyationImageLink, setVariyationImageLink] = useState(null);

  const { uploadToS3, uploadMultipleToS3 } = useS3();
  const [selectedSingleFile, setSelectedSingleFile] = useState(null);
  const [selectedMultipleFiles, setSelectedMultipleFiles] = useState([]);

  const handleThumnilFileChange = async (event) => {
    // const file = event.target.files;
    // console.log(file);
    const fieldName = event.target.name
    const files = event.target.files;
    console.log({
      fieldName,
      files
    });
    const urls = await uploadImages(fieldName, files)

    console.log(urls[0]);
    setSingleImageLink(urls[0]);
    // if (file) {
    //   setSelectedSingleFile(file);
    //   const key = `path/to/${file.name}`;
    //   const url = await uploadToS3(file, key);
    //   console.log(url);
    //   if (url) {
    //     setSingleImageLink(url);
    //   }
    // }
  };

  const handleMultipleImagesChange = async (event) => {
    const fieldName = event.target.name
    const files = event.target.files;
    const urls = await uploadImages(fieldName, files)

    console.log({ urls });
    setMultipleImageLinks(urls);
    // if (files.length > 0) {
    //   setSelectedMultipleFiles([...files]);
    //   const urls = await uploadMultipleToS3(files);
    //   //url check
    //   if (urls.length > 0) {
    //     setMultipleImageLinks(urls);
    //   }
    // }
  };

  const [attributes, setAttributes] = useState([{ label: "", values: [] }]);
  const addAttribute = () => {
    const newAttributes = [...attributes, { label: "", values: [] }];
    setAttributes(newAttributes);
  };

  const removeAttribute = (indexToRemove) => {
    // Implement your remove attribute logic here
    const updatedAttributes = [...attributes];
    updatedAttributes.splice(indexToRemove, 1);
    setAttributes(updatedAttributes);
  };

  const handleLabelChange = (index, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].label = value;
    setAttributes(updatedAttributes);
  };

  const handleValuesChange = (index, values) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].values = values;
    setAttributes(updatedAttributes);
  };
  const [selectedCategory, setSelectedCategory] = useState(" "); // Initialize with an empty string or any default value

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const [categoryData, setCategoryData] = useState([]);
  const onFinish = (values) => {
    let product = {
      name: values?.name,
      category: selectedCategory,
      productType: productType,
      price: parseFloat(values?.price),
      images: multipleImageLinks,
      thumbnail: singleImageLink,
      stock: values.stock,
      description: values.description,
      short_description: values.short_description,
      attributes: values.attributes,
      tags: values.tags,
      slug: values.slug,
      metadata: {
        title: values?.MetaTitle,
        description: values?.MetaDescription,
      },
      variableProducts:
        productType === "variable_product" ? values?.variyations : [],
    };

    if (values.discountType && values.DiscountAmount) {
      product.discount = {
        type: values.discountType,
        value: values.DiscountAmount,
      };
    }

    axios
      .post(`${base_url}/products`, product)
      .then((response) => {
        console.log(response);
        navigate("/admin/list-product");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //// categoty

  useEffect(() => {
    fetch(`${base_url}/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data?.data.categories);
      });
  }, []);

  return (
    <>
      <div>
        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
          <h4>Add Product</h4>
        </div>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <label htmlFor="productType">Product Type:</label>
            <Select
              id="productType"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Select.Option value="simple_product">
                Simple Product
              </Select.Option>
              <Select.Option value="variable_product">
                Variable Product
              </Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <label htmlFor="categoryType">Category Type:</label>
            <Select
              id="categoryType"
              style={{ width: "100%" }}
              placeholder="Select a category"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              {categoryData?.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      <br></br>

      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
          labelCol={{ span: 24 }} // Span the entire width for the label
          wrapperCol={{ span: 24 }} // Span the entire width for the input
          style={{
            marginBottom: "2px",

            fontWeight: "500",
          }}
        >
          <Input placeholder="Example: Door" size="large" />
        </Form.Item>

        <Form.Item
          label="Sort  Description"
          name="short_description"
          rules={[
            {
              message: "Please enter the product description",
            },
          ]}
          labelCol={{ span: 24 }} // Span the entire width for the label
          wrapperCol={{ span: 24 }} // Span the entire width for the input
          style={{
            marginBottom: "2px",

            fontWeight: "500",
          }}
        >
          <ReactQuill
            name="short_description"
            style={{ height: "150px" }}
            theme="snow"
          />
        </Form.Item>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Form.Item
          class="label-above-input"
          label="Description"
          name="description"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{
            marginBottom: "2px",

            fontWeight: "500",
          }}
        >
          <ReactQuill style={{ height: "150px" }} theme="snow" />
        </Form.Item>

        <br />
        <br />
        <br />
        <br />

        <Row gutter={16} style={{ margin: "20px 0px" }}>
          <Col xs={24} lg={12}>
            <Form.Item
              labelAlign="top"
              label="Price (৳)"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter the price",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                fontWeight: "500",
              }}
            >
              <Input
                className="inputfield"
                placeholder="Example: 2000"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              labelAlign="top"
              label="Stock"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Please enter the stock quantity",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                fontWeight: "500",
              }}
            >
              <InputNumber
                placeholder="Example: 20"
                style={{
                  padding: "8px  4px",
                  width: "100%",
                  border: "1px solid black",
                }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[
                {
                  message: "Please enter the price",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                marginBottom: "2px",
                fontWeight: "500",
              }}
            >
              <Select
                value={discountType}
                onChange={(value) => setDiscountType(value)}
                style={{ border: "2px solid black", width: "100%" }}
              >
                <Select.Option value="fixed">Fixed Amount</Select.Option>
                <Select.Option value="percentage">Percentage</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Amount"
              name="DiscountAmount"
              rules={[
                {
                  type: Number,
                  message: "Please enter the Amount or Percentage",
                },
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{
                marginBottom: "2px",
                fontWeight: "500",
              }}
            >
              <InputNumber
                placeholder="Example: 23"
                style={{
                  padding: "3px",
                  width: "100%",
                  border: "2px solid black",
                }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            margin: "10px 0px ",
            border: "1px solid black",
            padding: "20px 10px ",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ margin: "10px auto ", textAlign: "center" }}>
            Image Upload{" "}
          </h4>

          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Form.Item
                name="Thumbnails"
                label="Upload Thumbnails"
                rules={[
                  {
                    required: true,
                    message: "Please upload Thumbnails",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                  marginBottom: "2px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <input type="file" name="thumbnail" onChange={handleThumnilFileChange} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                name="images"
                label="Images"
                rules={[
                  {
                    required: true,
                    message: "Please upload images",
                  },
                ]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{
                  marginBottom: "2px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <input
                  className="bg-red-400"
                  name="images"
                  type="file"
                  multiple
                  onChange={handleMultipleImagesChange}
                // onChange={(e)=>console.log(e.target.files)}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div
          style={{
            margin: "10px 0px ",
            border: "1px solid black",
            padding: "20px 10px ",
            borderRadius: "10px",
          }}
        >
          <h4 style={{ margin: "10px auto ", textAlign: "center" }}>
            Attribute & Tag
          </h4>

          {attributes.map((attribute, index) => (
            <Row gutter={16} key={index}>
              <Col xs={24} lg={8}>
                <Form.Item
                  label={`Attribute ${index + 1}`}
                  name={["attributes", index, "label"]}
                  rules={[
                    {
                      message: "Please enter the attribute label",
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{
                    marginBottom: "2px",
                    fontWeight: "500",
                  }}
                >
                  <Input
                    style={{ border: "1px solid black", color: "black" }}
                    placeholder="Attribute Label"
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    value={attribute.label}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  name={["attributes", index, "values"]}
                  label="Attribute Values"
                  rules={[
                    {
                      message: "Please enter at least one attribute value",
                      type: "array",
                    },
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{
                    marginBottom: "2px",
                    fontWeight: "500",
                  }}
                >
                  <Select
                    mode="tags"
                    width="100%"
                    tokenSeparators={[","]}
                    placeholder="Attribute Values"
                    onChange={(values) => handleValuesChange(index, values)}
                    value={attribute.values}
                    style={{ border: "1px solid black", color: "black" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  wrapperCol={{ span: 24 }}
                  style={{ textAlign: "right" }} // Align the button to the right
                >
                  <span
                    onClick={() => removeAttribute(index)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    <CloseOutlined />
                  </span>
                </Form.Item>
              </Col>
            </Row>
          ))}

          {/* Add Attribute Button */}
          <Form.Item style={{ textAlign: "center" }}>
            <Button
              style={{
                border: "1px solid green",
                fontWeight: "bold",
                background: "green",
                color: "white",
              }}
              type="dashed"
              onClick={addAttribute}
            >
              + Add Attribute
            </Button>
          </Form.Item>

          <Form.Item
            class="label-above-input"
            label="Tags"
            name="tags"
            rules={[
              {
                message: "Please enter at least one tag",
                type: "array",
              },
            ]}
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",

              fontWeight: "500",
            }}
          >
            <Select
              mode="tags"
              tokenSeparators={[","]}
              placeholder="Select tags"
            >
              <Option value="black_friday">black_friday</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          labelAlign="top"
          label="slug"
          name="slug"
          rules={[
            {
              required: true,
              message: "please  enter  a slug ",
            },
          ]}
          labelCol={{ span: 24 }} // Span the entire width for the label
          wrapperCol={{ span: 24 }} // Span the entire width for the input
          style={{
            marginBottom: "2px",

            fontWeight: "500",
          }}
        >
          <Input
            type="slug"
            label="Enter Product slug"
            id="slug"
            name="slug"
            placeholder=" Example: service "
            style={{ width: "100%", padding: "15px" }}
          />
        </Form.Item>

        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid grey",
          }}
        >
          <h6 style={{ textAlign: "center" }}>META DATA</h6>

          <Form.Item
            labelAlign="top"
            label="Meta Title"
            name="MetaTitle"
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",

              fontWeight: "500",
            }}
          >
            <Input placeholder="Enter the product title" />
          </Form.Item>

          <Form.Item
            labelAlign="top"
            name="MetaDescription"
            label="Meta Description"
            labelCol={{ span: 24 }} // Span the entire width for the label
            wrapperCol={{ span: 24 }} // Span the entire width for the input
            style={{
              marginBottom: "2px",

              fontWeight: "500",
            }}
          >
            <Input.TextArea placeholder="Enter the product description" />
          </Form.Item>
        </div>

        {showAdditionalFields && (
          <Variyetions
            attributes={attributes}
            setVariyationImageLink={setVariyationImageLink}
          ></Variyetions>
        )}

        <div style={{ margin: "auto " }}> </div>
        <Form.Item>
          <Button
            style={{
              margin: "auto",
              width: "120px",
              border: "1px solid  green",
              background: "",
            }}
            htmlType="submit"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Addproduct;
