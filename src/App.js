import React, { useState } from 'react';
import './App.css';

// Sample food items
const foodItems = [
  { id: 1, name: '🍎 Apple' },
  { id: 2, name: '🍞 Bread' },
  { id: 3, name: '🥛 Milk' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [bought, setBought] = useState([]);
  const [screen, setScreen] = useState(1); // To manage which screen to display
  const [costs, setCosts] = useState({});

  // Add item to cart
  const addToCart = (item) => {
    if (!cart.includes(item)) {
      setCart([...cart, item]);
    }
  };

  // Move item to bought
  const moveToBought = (item) => {
    setBought([...bought, item]);
    setCart(cart.filter((i) => i !== item));
  };

  // Set cost for an item
  const handleCostChange = (item, value) => {
    setCosts({ ...costs, [item]: value });
  };

  // Calculate total cost
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (parseFloat(costs[item]) || 0), 0);
  };

  return (
    <div className="App">
      {screen === 1 && (
        <div className="screen">
          <h1>Select Items</h1>
          <div className="food-icons">
            {foodItems.map((item) => (
              <button key={item.id} onClick={() => addToCart(item.name)}>
                {item.name}
              </button>
            ))}
          </div>
          <div>
            <h3>Cart:</h3>
            <div>
              {cart.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </div>
          <button onClick={() => setScreen(2)}>Go Shopping</button>
        </div>
      )}

      {screen === 2 && (
        <div className="screen">
          <h1>Items to Buy</h1>
          <div>
            {cart.map((item, index) => (
              <div key={index}>
                {item} <button onClick={() => moveToBought(item)}>Bought</button>
              </div>
            ))}
          </div>
          <button onClick={() => setScreen(3)}>Next</button>
        </div>
      )}

      {screen === 3 && (
        <div className="screen">
          <h1>Add Costs</h1>
          <div>
            {cart.map((item, index) => (
              <div key={index}>
                <label>{item}:</label>
                <input
                  type="number"
                  onChange={(e) => handleCostChange(item, e.target.value)}
                />
              </div>
            ))}
          </div>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
