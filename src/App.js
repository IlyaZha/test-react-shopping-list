import './index.css';
import React, { useState, useEffect } from "react";
import ShoppingItem from "./ShopingItem";

function ShoppingListApp({ items: initialItems = []}) {
  const [items, setItems] = useState(initialItems);

  function handleQuantityChange(name, amount) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + amount } : item
      ).filter((item) => item.quantity > 0)
    );
  }

  function convertNonAscii(input) {
    return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  }

  function handleAdd() {
    const name = convertNonAscii(draft);
    const item = items.find((item) => item.name === name);
    if (item) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem = { name, quantity: 1 };
      setItems((prevItems) => [...prevItems, newItem]);
    }
    setDraft("");
  }

  //retrieve draft input from localStorage
  const [draft, setDraft] = useState("");
  useEffect(() => {
    const savedDraft = localStorage.getItem("draft");
    if (savedDraft) {
      setDraft(savedDraft);
    }
  }, []);

  //save draft input to localStorage
  useEffect(() => {
    localStorage.setItem("draft", draft);
  }, [draft]);

  return (
    <>
      <ul>
        {items
        .sort((a, b) => b.quantity - a.quantity)
        .map(({ name, quantity }) => (
          <ShoppingItem
            key={name}
            name={name}
            quantity={quantity}
            onIncrement={() => handleQuantityChange(name, 1)}
            onDecrement={() => handleQuantityChange(name, -1)}
          />
        ))}
      </ul>
      <div className='shopping-input'>
        <input
          id="item-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  );
}

export default ShoppingListApp;
