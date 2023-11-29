import React from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirmationModal = ({ isVisible, entity, imageUrl, title, onCancel, onConfirm }) => {
  return (
    <Modal
      title={`Confirm Delete ${entity}`}
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button style={{background:"red", color:"white"}} key="delete" type="danger" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <div>
        <img src={imageUrl} alt={title} style={{ maxWidth: '100%', marginBottom: '10px' }} />
        <p  style={{ fontSize:"18px", color:"black"}} >Are you sure you want to delete <span style={{color:"red",fontSize:"30px"}}>{title}?</span></p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
