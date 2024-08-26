import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Resultlist from './components/Resultlist';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Product from './components/Product';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CartSidebar from './components/CartSidebar';
import { useState } from 'react';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <BrowserRouter>
      <header>
        <div className="left">
          <Link to="/"><img src="../src/assets/Meubel_House_Logos-05.png" alt="Meubel House Logo" />Furniro</Link>
        </div>
        <div className="center">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="right">
          <nav>
            <ul>
              <li><Link to="#"><img src="../src/assets/mdi_account-alert-outline.png" alt="User Account"/></Link></li>
              <li><button onClick={handleCartOpen}><img src="../src/assets/ant-design_shopping-cart-outlined.png" alt="Shopping Cart" /></button></li>
              <CartSidebar isOpen={isCartOpen} onClose={handleCartClose} />
            </ul>
          </nav>
        </div>
      </header>
      
      <section className="image-content-section">
        <div className="image">
          <img src="../src/assets/Rectangle_1.png" alt="" />
          <div className="shop-navigation">
            <h3>Shop</h3>
            <p><span>Home</span> Shop</p>
          </div>
        </div>
      </section>
      
      <section className="filter-content-section">
        <div className="left">
          <div className="filter-bar">
            <button id="filter-button" className="filter-icon">
              <img src="../src/assets/system-uicons_filtering.png" alt="Filter Button" />
            </button>
            <div className="filter-menu">
              <button>Default</button>
              <button>A-Z</button>
              <button>Z-A</button>
              <button>Higher to Lower</button>
              <button>Lower to Higher</button>
            </div>
          </div>
          <div className="results-info">1 de 32 de 62 produtos</div>
        </div>
        <div className="right">
          <p>Show <input id="items-per-page-input" type="number" placeholder="8" /></p>
        </div>    
      </section>
      
      <main>
        <Routes>
          <Route path="/products" element={<Resultlist />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <ToastContainer position='top-center' autoClose={2000}/>
      </main>

      <section className="services-section">
        <div className="service">
          <div className="service-image">
            <img src="../src/assets/Trophy.png" alt="High Quality" />
          </div>
          <div className="service-info">
            <h2>High Quality</h2>
            <p>Crafted from top materials</p>
          </div>
        </div>
        <div className="service">
          <div className="service-image">
            <img src="../src/assets/Guarantee.png" alt="Warranty Protection" />
          </div>
          <div className="service-info">
            <h2>Warranty Protection</h2>
            <p>Over 2 years</p>
          </div>
        </div>
        <div className="service">
          <div className="service-image">
            <img src="../src/assets/Shipping.png" alt="Free Shopping"/>
          </div>
          <div className="service-info">
            <h2>Free Shipping</h2>
            <p>Order over 150 $</p>
          </div>
        </div>
        <div className="service">
          <div className="service-image">
            <img src="../src/assets/Support.png" alt="24 / 7 Support" />
          </div>
          <div className="service-info">
            <h2>24 / 7 Support</h2>
            <p>Dedicated Support</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-columns">
          <div className="footer-column">
            <h2>footer.</h2>
            <p>Rua Alexandre Dumas, 1711 - 6º andar - Chácara Santo Antônio, São Paulo - SP, 04717-004</p>
          </div>
          <div className="footer-column">
            <h3>Links</h3>
            <ul>
              <li><Link to="/desafio2">Home</Link></li>
              <li><Link to="/desafio2">Shop</Link></li>
              <li><Link to="#">About</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Help</h3>
            <ul>
              <li><Link to="#">Payment Options</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Returns</Link></li>
            </ul>
          </div>
          <div className="footer-column newsletter">
            <h3>Newsletter</h3>
            <form id="emailForm" method="post">
              <input id="emailInput" type="email" placeholder="Enter your Email Address" />
              <button type="submit">SUBSCRIBE</button>
              <p id="resultMessage"></p>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Compass UOL</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
