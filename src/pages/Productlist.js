import React, { useEffect, useState } from "react";
import Spinner from "../components/Shared/Spinner/Spinner";
import DeleteConfirmationModal from "../components/Shared/ConfirmationsModal/DeleteConfirmationModal";
import { Button, Table } from "antd";
import axios from "axios";
import EditProductModal from "../components/Shared/EditProductModal/EditProductModal";
import { base_url } from "../utils/baseUrl";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  useEffect(() => {
    setIsloading(true);
    fetch(`${base_url}/products`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.data.data);
        setIsloading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
   axios
      .delete(
        `${base_url}/products/${selectedProduct._id}`
      )
      .then((response) => {
        // Update the state to remove the deleted product
        setProducts(
          products.filter((product) => product._id !== selectedProduct._id)
        );
        setIsModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setSelectedProduct(null);
    setIsModalVisible(false);
  };



  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleUpdateProduct = (editedProduct, productId) => {
    // Make an API call to update the product
    axios
      .put(`/api/products/${productId}`, editedProduct)
      .then((response) => {
        // Handle the updated product data if needed
        console.log('Product updated:', response.data);
        setIsEditModalVisible(false);
        // You can also refresh the product list if needed
        // Call a function to fetch the updated product list here
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        setIsEditModalVisible(false);
      });
  };

  const handleCancelEdit = () => {
    setSelectedProduct(null);
    setIsEditModalVisible(false);
  };




  const columns = [
    {
      title: "Img",
      width: 100,
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img
          style={{
            width: "50px",
            border: "1px solid grey ",
            borderRadius: "100%",
          }}
          src={thumbnail}
          alt="Thumbnail"
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Price",
      width: 100,
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Product-Type",
      dataIndex: "productType",
      key: "productType",
      width: 150,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
   
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div   style={{display:"flex", justifyContent:"space-between",  justifyItems:"center", }}>
        <Button style={{margin:"0px 5px"}} type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        <Button
          style={{ background: "red", color: "white" }}
          type="danger"
          onClick={() => handleDelete(record)}
        >
          Delete
        </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <Table dataSource={products} columns={columns} />
      <div>
        <DeleteConfirmationModal
          isVisible={isModalVisible}
          entity="Product"
          imageUrl={selectedProduct ? selectedProduct.thumbnail : ""} // Adjust the prop name as needed
          title={selectedProduct ? selectedProduct.name : ""} // Adjust the prop name as needed
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </div>

      <div>
      <EditProductModal
        isVisible={isEditModalVisible}
        product={selectedProduct}
        onCancel={handleCancelEdit}
        onEdit={handleUpdateProduct}
      />
      </div>
    </div>
  );
};

export default Productlist;
