import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/PrivateHocs";
import AddCoupon from "./pages/AddCoupon";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addbrand from "./pages/Addbrand";
import Addcat from "./pages/Addcat";
import Addcolor from "./pages/Addcolor";
import Addproduct from "./pages/Addproduct";
import Blogcatlist from "./pages/Blogcatlist";
import Bloglist from "./pages/Bloglist";
import Brandlist from "./pages/Brandlist";
import Categorylist from "./pages/Categorylist";
import Colorlist from "./pages/Colotlist";
import Couponlist from "./pages/Couponlist";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Productlist from "./pages/Productlist";
import Resetpassword from "./pages/Resetpassword";
import Subcategory from "./pages/Subcategory";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
          <Route path="enquiries/:id" element={<ProtectedRoute><ViewEnq /></ProtectedRoute>} />
          <Route path="blog-list" element={<ProtectedRoute><Bloglist /></ProtectedRoute>} />
          <Route path="blog" element={<ProtectedRoute><Addblog /></ProtectedRoute>} />
          <Route path="blog/:id" element={<ProtectedRoute><Addblog /></ProtectedRoute>} />
          <Route path="coupon-list" element={<ProtectedRoute><Couponlist /></ProtectedRoute>} />
          <Route path="coupon" element={<ProtectedRoute><AddCoupon /></ProtectedRoute>} />
          <Route path="coupon/:id" element={<ProtectedRoute><AddCoupon /></ProtectedRoute>} />
          <Route path="blog-category-list" element={<ProtectedRoute><Blogcatlist /></ProtectedRoute>} />
          <Route path="blog-category" element={<ProtectedRoute><Addblogcat /></ProtectedRoute>} />
          <Route path="blog-category/:id" element={<ProtectedRoute><Addblogcat /></ProtectedRoute>} />
          <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="order/:id" element={<ProtectedRoute><ViewOrder /></ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="list-color" element={<ProtectedRoute><Colorlist /></ProtectedRoute>} />
          <Route path="color" element={<ProtectedRoute><Addcolor /></ProtectedRoute>} />
          <Route path="color/:id" element={<ProtectedRoute><Addcolor /></ProtectedRoute>} />
          <Route path="list-category" element={<ProtectedRoute><Categorylist /></ProtectedRoute>} />
          <Route path="category" element={<ProtectedRoute><Addcat /></ProtectedRoute>} />
          <Route path="Subcategory" element={<ProtectedRoute><Subcategory /></ProtectedRoute>} />
          <Route path="category/:id" element={<ProtectedRoute><Addcat /></ProtectedRoute>} />
          <Route path="list-brand" element={<ProtectedRoute><Brandlist /></ProtectedRoute>} />
          <Route path="brand" element={<ProtectedRoute><Addbrand /></ProtectedRoute>} />
          <Route path="brand/:id" element={<ProtectedRoute><Addbrand /></ProtectedRoute>} />
          <Route path="list-product" element={<ProtectedRoute><Productlist /></ProtectedRoute>} />
          <Route path="product" element={<ProtectedRoute><Addproduct /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
