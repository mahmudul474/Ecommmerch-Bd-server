// EditCategoryModal.js
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const EditCategoryModal = ({ isVisible, category, onCancel, onEdit }) => {
  const [form] = Form.useForm();

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        onEdit(values, category._id); // Pass edited data and category ID for updating
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="Edit Category"
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
      <Form form={form} initialValues={category}>
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            {
              required: true,
              message: 'Please enter the category name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Add more form fields for editing category data if needed */}
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
