import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Collection from "./pages/collection/Collection";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId?" element={<Collection />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
