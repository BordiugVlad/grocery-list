import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaShoppingCart, FaList, FaDollarSign } from "react-icons/fa";
import "./App.css";
import "./styles.css";

const categories = {
  Fruits: ["🍎 Apple", "🍊 Orange", "🍌 Banana"],
  Vegetables: ["🥕 Carrot", "🥦 Broccoli", "🌽 Corn"],
  Dairy: ["🥛 Milk", "🧀 Cheese", "🍦 Yogurt"],
};

const GrocerySelection = ({ addItem }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="screen">
      <h2>Select Groceries</h2>
      <div className="categories">
        {Object.keys(categories).map((category) => (
          <button className="category-btn" key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && (
        <div className="items">
          {categories[selectedCategory].map((item) => (
            <button className="item-btn" key={item} onClick={() => addItem(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Cart = ({ cart, moveToBought }) => (
  <div className="screen">
    <h2>Shopping Cart</h2>
    <div className="cart-items">
      {cart.map((item, index) => (
        <button className="cart-item-btn" key={index} onClick={() => moveToBought(item)}>
          {item}
        </button>
      ))}
    </div>
  </div>
);

const TotalCost = ({ boughtItems, setCosts, costs }) => {
  const total = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0);
  return (
    <div className="screen">
      <h2>Total Cost</h2>
      <div>
        {boughtItems.map((item, index) => (
          <div className="cost-input" key={index}>
            {item} - $
            <input
              type="number"
              className="cost-field"
              onChange={(e) => setCosts({ ...costs, [item]: parseFloat(e.target.value) || 0 })}
            />
          </div>
        ))}
      </div>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [costs, setCosts] = useState({});

  const addItem = (item) => setCart([...cart, item]);
  const moveToBought = (item) => {
    setBoughtItems([...boughtItems, item]);
    setCart(cart.filter((i) => i !== item));
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<GrocerySelection addItem={addItem} />} />
          <Route path="/cart" element={<Cart cart={cart} moveToBought={moveToBought} />} />
          <Route path="/total" element={<TotalCost boughtItems={boughtItems} setCosts={setCosts} costs={costs} />} />
        </Routes>
        <nav className="bottom-nav">
          <Link to="/" className="nav-link">
            <FaList /> Items
          </Link>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/total" className="nav-link">
            <FaDollarSign /> Total
          </Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
