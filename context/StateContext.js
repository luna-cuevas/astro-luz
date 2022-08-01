import { useContext, createContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  // useEffect(()=>{
  //   localStorage.setItem('cart', cartItems)
  //   console.log(cartItems)
  // },[cartItems]);

  // console.log(cartItems)

  let foundProduct;

  const incrementQty = () => {
    setQty((qty) => qty + 1);
  };

  const decrementQty = () => {
    // if quantity is greater than 1, return quantity - 1 else return 1
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const addToCart = (product, quantity) => {
    // check if product already exists in cart
    const checkCart = cartItems.find((item) => item._id === product._id);

    // updates total price and quantity of cart
    setTotalPrice((totalPrice) => totalPrice + product.price * quantity);
    setTotalQuantity((totalQuantity) => totalQuantity + quantity);

    // if product exists in cart, update quantity
    if (checkCart) {
      // update quantity
      const newCartItems = cartItems.map((item) => {
        //checks if product id matches the item we're adding, if so, update quantity
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        // if product id doesn't match, return item without updating
        return item;
      });

      // update cart
      setCartItems(newCartItems);
    } else {
      // if product does not exists, add to cart
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    // display success message
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const updateCartItemQty = (id, value) => {
    // First find the product in the cart
    foundProduct = cartItems.find((item) => item._id === id);
    // Copy the current cart array
    const newCartItems = cartItems;

    if (value === "increment") {
      // If click value is increment, increment quantity by 1
      newCartItems.map(
        (item) => item._id === id && (item.quantity = foundProduct.quantity + 1)
      );
      setCartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "decrement") {
      if (foundProduct.quantity > 1) {
        // If click value is decrement, and quantity is greater than 1, increment quantity by 1
        newCartItems.map(
          (item) =>
            item._id === id && (item.quantity = foundProduct.quantity - 1)
        );
        setCartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incrementQty,
        decrementQty,
        addToCart,
        setShowCart,
        updateCartItemQty,
        removeFromCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
