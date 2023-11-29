import { Col, Form, Row } from "antd";
import React from "react";

function ImageUploader({ setMultipleImageLinks, setSingleImageLink }) {
  const handleMultipleImageUpload = async (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${process.env.imggBB_URL}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMultipleImageLinks((prevLinks) => [...prevLinks, data.data.url]);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files[0];
 
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.imggBB_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSingleImageLink(data.data.url);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="Thumnils "
          label="Upload  Thumnil"
          rules={[
            {
              required: true,
              message: "Please Upload Thumnil",
            },
          ]}
          labelCol={{ span: 24 }} // Span the entire width for the label
          wrapperCol={{ span: 24 }} // Span the entire width for the input
          style={{ marginBottom: "2px", fontSize: "20px", fontWeight: "bold" }}
        >
          <input type="file" onChange={handleSingleImageUpload} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="images"
          label="Images"
          rules={[
            {
              required: true,
              message: "Please  upload images ",
            },
          ]}
          labelCol={{ span: 24 }} // Span the entire width for the label
          wrapperCol={{ span: 24 }} // Span the entire width for the input
          style={{ marginBottom: "2px", fontSize: "20px", fontWeight: "bold" }}
        >
          <input
            className="bg-red-400"
            type="file"
            multiple
            onChange={handleMultipleImageUpload}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default ImageUploader;
