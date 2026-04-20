import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import CreateInvoice from "./pages/CreateInvoice";
import Dashboard from "./pages/Dashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/invoice" element={<CreateInvoice />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;