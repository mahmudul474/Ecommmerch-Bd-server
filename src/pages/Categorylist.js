import { Button, Spin, Table, Dropdown, Menu, Image } from "antd";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Shared/Spinner/Spinner";
import axios from "axios";
import DeleteConfirmationModal from "../components/Shared/ConfirmationsModal/DeleteConfirmationModal";
import EditCategoryModal from "../components/EditCategoryModal/EditCategoryModal";
import { base_url } from "../utils/baseUrl";
export default function Categorylist() {
  const [categorys, setCategory] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  //get category
  useEffect(() => {
    setIsloading(true);
    fetch(`${base_url}/category?grouped=true`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data.categories);
        setIsloading(false);
      });
  }, []);

  const handleDelete = (product) => {
    setSelectedCategory(product);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `${base_url}/category/${selectedCategory._id}`
      )
      .then((response) => {
        setCategory(
          categorys.filter((product) => product._id !== selectedCategory._id)
        );
        setIsModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setSelectedCategory(null);
    setIsModalVisible(false);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalVisible(true);
  };

  const handleUpdateCategory = (editedCategory, categoryId) => {
    axios
      .put(`/api/categories/${categoryId}`, editedCategory)
      .then((response) => {
        setIsEditModalVisible(false);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        setIsEditModalVisible(false);
      });
  };

  const handleCancelEdit = () => {
    setSelectedCategory(null);
    setIsEditModalVisible(false);
  };

  const columns = [
    {
      title: "Img",
      width: 100,
      dataIndex: "icon",
      render: (icon) => (
        <Image
          

          src={icon}
           
          style={{
            width: "30px",
            height: "30px",
            marginRight: "8px",
            borderRadius: "100%",
          }}
        
          alt="icon"
        />
      ),
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "slug",
      dataIndex: "slug",
      key: "slug",
      width: 150,
    },
    {
      title: "Subcategories",
      key: "subcategories",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              {record.subCategory.map((subCategory) => (
                <Menu.Item key={subCategory._id}>
                  <div style={{ display: "flex", textTransform:"capitalize",alignItems: "center" }}>
                    <Image
                      src={subCategory.icon}
                      alt={subCategory.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                        borderRadius: "100%",
                      }}
                    />
                    <span>{subCategory.name}</span>
                  </div>
                </Menu.Item>
              ))}
            </Menu>
          }
          placement="bottomLeft"
        >
          <Button style={{ background: "blue", color: "white" }}>
            Show Subcategories
          </Button>
        </Dropdown>
      ),
    },

    {
      title: "Edit",
      key: "actions",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
          }}
        >
          <Button
            style={{ background: "green", color: "white" }}
            type="danger"
            onClick={() => handleDelete(record)}
          >
            Edit
          </Button>
        </div>
      ),
    },
    {
      title: "Delete",
      key: "actions",
      render: (_, record) => (
        <Button
          style={{ background: "red", color: "white" }}
          type="danger"
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <h2>Product Category</h2>
      <Table dataSource={categorys} columns={columns} />
      <div>
        <DeleteConfirmationModal
          isVisible={isModalVisible}
          entity="Category"
          imageUrl={selectedCategory ? selectedCategory.icon : ""} // Adjust the prop name as needed
          title={selectedCategory ? selectedCategory.name : ""} // Adjust the prop name as needed
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
        <EditCategoryModal
          isVisible={isEditModalVisible}
          category={selectedCategory}
          onCancel={handleCancelEdit}
          onEdit={handleUpdateCategory}
        />
      </div>
    </div>
  );
}
