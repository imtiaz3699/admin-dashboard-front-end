import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/ProductTable";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";
import Admin from "./pages/Admin/Admin";
import Product from "./pages/Product/Product";
import Managers from "./pages/Managers/Managers";
import AddProduct from "./pages/Product/AddProduct";
import Category from "./pages/Product/Category/Category";
import Brand from "./pages/Product/Brand/Brand";
import Branch from "./pages/Branch/Branch";
import Stock from "./pages/Stock/Stock";
import AddBranch from "./pages/Branch/AddBranch";
import AddStock from "./pages/Stock/AddStock";
import StockMovement from "./pages/StockMovement/StockMovement";
import StockIn from "./pages/StockMovement/StockIn";

import Supplier from "./pages/Supplier/Supplier";
import AddSupplier from "./pages/Supplier/AddSupplier";
import PurchaseOrder from "./pages/PuchaseOrder/PurchaseOrder";
import AddPurchaseOrder from "./pages/PuchaseOrder/AddPurchaseOrder";
import StockOut from "./pages/StockMovement/StockOut";
import Sale from "./pages/sale/Sale";
import AddSale from "./pages/sale/AddSale";
import StockTransfer from "./pages/StockMovement/StockTransfer";
import CreateTransfer from "./pages/StockMovement/CreateTransfer";
import StockAdjustment from "./pages/StockAdjustment/StockAdjustment";
import AddAdjustment from "./pages/StockAdjustment/AddAdjustment";
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth pages */}
          {/* <Route element= {<AuthLayout/>}> */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* </Route> */}
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/dashboard" element={<Home />} />
              <Route path="/dashboard/admin" element={<Admin />} />
              <Route path="/dashboard/product" element={<Product />} />
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route path="/dashboard/category" element={<Category />} />
              <Route path="/dashboard/brand" element={<Brand />} />
              <Route path="/dashboard/branch" element={<Branch />} />
              <Route path="/dashboard/add-branch" element={<AddBranch />} />
              <Route path="/dashboard/update-branch/:id" element={<AddBranch />} />
              <Route path="/dashboard/sales" element={<Sale />} />
              <Route path="/dashboard/add-sales" element={<AddSale />} />



              <Route path="/dashboard/purchase-orders" element={<PurchaseOrder />} />
              <Route path="/dashboard/add-purchase-order" element={<AddPurchaseOrder />} />
              
              
              <Route path="/dashboard/stock" element={<Stock />} />
              <Route path="/dashboard/add-stock" element={<AddStock />} />
              <Route path="/dashboard/update-stock/:id" element={<AddStock />} />
              
              <Route path="/dashboard/stock-movement-system" element={<StockMovement />} />
              <Route path="/dashboard/stock-in" element={<StockIn stock="IN" />} />
              <Route path="/dashboard/stock-out" element={<StockOut stock="OUT" />} />
              <Route path="/dashboard/stock-transfer" element={<StockTransfer />} />
              <Route path="/dashboard/create-transfer" element={<CreateTransfer />} />
              //Stock adjustment
              <Route path="/dashboard/stock-adjustment" element={<StockAdjustment />} />
              <Route path="/dashboard/add-adjustment" element={<AddAdjustment />} />

              {/* //supplier */}
              <Route path="/dashboard/supplier" element={<Supplier />} />
              <Route path="/dashboard/add-supplier" element={<AddSupplier />} />
              <Route path="/dashboard/update-supplier/:id" element={<AddSupplier />} />




              <Route path="/dashboard/managers" element={<Managers />} />
              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />
              {/* Tables */}
              {/* <Route path="/basic-tables" element={<BasicTables />} /> */}
              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />
              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>
          {/* Auth Layout */}
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
