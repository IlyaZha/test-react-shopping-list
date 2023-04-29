import React from "react";
export default function ShoppingItem(props) {
  const { name, quantity, onIncrement, onDecrement } = props;
  return (
    <li className="shopping-item">
      <span>{name}</span> - <span>quantity: {quantity}</span>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </li>
  );
}
