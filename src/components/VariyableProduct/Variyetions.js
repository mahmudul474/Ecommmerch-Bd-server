import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Row, Col, Select } from "antd";
import { Option } from "antd/es/mentions";
import useS3 from "../../hooks/useS3";

const Variyetions = ({ setVariyationImageLink, attributes }) => {
  

  const { uploadToS3 } = useS3();
  const [selectedSingleFile, setSelectedSingleFile] = useState(null);
  const [singleImg,setSingelImg]=useState("")

  const handleThumnilFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedSingleFile(file);
      const key = `path/to/${file.name}`;
      const url = await uploadToS3(file, key);

      if (url) {
        setSingelImg(url);
      }
    }
  };

  const [selectedValue, setSelectedValue] = useState('');

  // Function to handle the change event
  const handleSelectChange = (value) => {
    // Update the state with the selected value
    setSelectedValue(value);
  };

  const foundItem = attributes.length >0 && attributes.find((item) => item.label === selectedValue);
   

  return (
    <>
      <div
        style={{
          margin: "10px 0px ",
          border: "1px solid black",
          padding: "20px 10px ",
          borderRadius: "10px",
        }}
      >
        <h4 style={{ margin: "10px auto ", textAlign: "center" }}>
          Product Variyations
        </h4>
        <Form.List
          name="variyations"
          initialValue={[
            {
              image: singleImg, // Initialize with default values if needed
              price: "",
              stock: "",
              attributes: [
                {
                  label: "",
                  value: "",
                },
              ],
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key}>
                  {/* Your variation fields */}

                  <Row gutter={16}>
                    {/* Single-column Form.Item */}
                    <Col span={24}>
                      <Form.Item
                        name={[name, "image"]}
                        label="Upload Image"
                        values={singleImg}
                        rules={[
                          {
                            required: true,
                            message: "Please Upload Thumbnail",
                          },
                        ]}
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
                      >
                        <input type="file" onChange={handleThumnilFileChange} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
                        label="Price"
                        name={[name, "price"]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Stock"
                        name={[name, "stock"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the stock quantity",
                          },
                        ]}
                        labelCol={{ span: 24 }} // Span the entire width for the label
                        wrapperCol={{ span: 24 }} // Span the entire width for the input
                        style={{
                          marginBottom: "2px",

                          fontWeight: "500",
                        }}
                      >
                        <InputNumber min={0} />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Attribute fields */}
                  <Form.List name={[name, "attributes"]}>
                    {(
                      attributeFields,
                      { add: addAttribute, remove: removeAttribute }
                    ) => (
                      <>
                        {attributeFields.map(
                          ({
                            key: attributeKey,
                            name: attributeName,
                            fieldKey: attributeFieldKey,
                            ...attributeRestField
                          }) => (
                            <div key={attributeKey}>
                              <Form.Item
                                label="Label"
                                name={[attributeName, "label"]}
                                labelCol={{ span: 24 }} // Span the entire width for the label
                                wrapperCol={{ span: 24 }} // Span the entire width for the input
                                style={{
                                  marginBottom: "2px",

                                  fontWeight: "500",
                                }}
                              >
                                <Select
                                  style={{
                                    width: "100%",
                                  }}
                                  onChange={handleSelectChange} // Attach the event handler to the Select component
                                  value={selectedValue} 
                                  
                                >
                                  {attributes.length >0  && attributes.map((attribute) => (
                                    <Option value={attribute?.label}>
                                      {attribute?.label}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              <Form.Item
                                label="Value"
                                name={[attributeName, "value"]}
                                labelCol={{ span: 24 }} // Span the entire width for the label
                                wrapperCol={{ span: 24 }} // Span the entire width for the input
                                style={{
                                  marginBottom: "2px",

                                  fontWeight: "500",
                                }}
                              >
                                <Select
                                  style={{
                                    width: "100%",
                                  }}
                                  placeholder="Select a category"
                                >
                                  {foundItem && foundItem.values.map(value=>
                                    <Option value={value}>
                                     {value}
                                  </Option>)}
                                </Select>
                                
                              </Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => removeAttribute(attributeName)}
                                style={{
                                  background: "red",
                                  color: "white",
                                  border: "1px solid red",
                                  marginTop: "5px",
                                  marginBottom: "5px",
                                }}
                              >
                                Remove Attribute
                              </Button>
                            </div>
                          )
                        )}
                        <Form.Item>
                          <Button
                            style={{
                              border: "1px solid green ",
                              background: "green",
                              color: "white",
                              margin: "10px 0px",
                            }}
                            type="dashed"
                            onClick={() => addAttribute()}
                          >
                            Add Attribute
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Button
                    type="dashed"
                    onClick={() => remove(name)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "1px solid red",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    Remove variyations
                  </Button>
                </div>
              ))}

              <Form.Item>
                <Button
                  style={{
                    background: "green",
                    color: "white",
                    border: "1px solid red",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  type="dashed"
                  onClick={() => add()}
                >
                  Add variyations
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </>
  );
};

export default Variyetions;
