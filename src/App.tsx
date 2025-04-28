import {Routes, Route} from "react-router-dom"
import DashboardPage from './pages/dashboardPage'
import CustomersPage from './pages/customerPage'
import SalesPage from './pages/salesPage'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signupPage'
import PurchasePage from './pages/purchasePage'
import './App.css'
import SupplierPage from './pages/supplierPage'
import ErrorPage from "./pages/errorPage"
import ProductPage from "./pages/productPage"
import SettingsPage from "./pages/settingsPage"
import StockPage from "./pages/stockPage"
import ExamplePage from "./pages/privacyPage"
import AccountsPage from "./pages/accountsPage"
import MoreAccountsPage from "./pages/moreAccountsPage"
import SupportPage from "./pages/supportPage"
import SaleInvoicePage from "./pages/posPage"

import LockCurrentRoute from "./components/LockCurrentRoute";

function App() {
  

  return (
    <>
    <Routes>
    

      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/customers" element={<CustomersPage/>}/>
      <Route path="/purchase" element={<PurchasePage/>}/>
      <Route path="/supplier" element={<SupplierPage/>}/>
      <Route path="/sales" element={<SalesPage/>}/>
      <Route path='/products' element={<ProductPage/>} />
      <Route path='/stock' element={<StockPage/>} />
      <Route path='/privacy' element={<ExamplePage/>}/>
      <Route path='/accounts' element={<AccountsPage/>}/>
      <Route path='/settings' element={<SettingsPage/>} />
      <Route path='/moreAccounts' element={<MoreAccountsPage/>} />
      <Route path='/supportGenie' element={<SupportPage/>} />
      <Route path='/pos' element={<SaleInvoicePage/>} />

    
      <Route path="/"  element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="*" element={<ErrorPage/>}></Route>
    </Routes>
   
    </>
  )
}

export default App



