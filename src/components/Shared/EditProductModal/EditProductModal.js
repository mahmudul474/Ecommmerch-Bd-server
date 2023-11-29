// EditProductModal.js
import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const EditProductModal = ({ isVisible, product, onCancel, onEdit }) => {
  console.log(product)
    const [form] = Form.useForm();

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        onEdit(values, product._id); // Pass edited data and product ID for updating
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="Edit Product"
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="edit" type="primary" onClick={handleEdit}>
          Edit
        </Button>,
      ]}
    >
      <Form form={form} initialValues={product}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please enter the product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="img"
          label="Image URL"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="variation"
          label="Variation"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="images"
          label="Images"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Thumbnail"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="productType"
          label="Product Type"
        >
          <Select>
            <Select.Option value="type1">Type 1</Select.Option>
            <Select.Option value="type2">Type 2</Select.Option>
            <Select.Option value="type3">Type 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
        >
          <Select>
            <Select.Option value="category1">Category 1</Select.Option>
            <Select.Option value="category2">Category 2</Select.Option>
            <Select.Option value="category3">Category 3</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
