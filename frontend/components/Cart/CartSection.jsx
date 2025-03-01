import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import styles from "./Cart.module.css";
import DeleteConfirmation from "./DeleteConfirmation";

const CartSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:5000/cart/${id}`, { quantity });
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 500;
  const total = subtotal + shipping;

  if (loading) return <p>Loading cart...</p>;

  return (
    <section id="cart" className={styles.cart}>
      <DeleteConfirmation
        show={showDeleteModal}
        product={selectedItem}
        onConfirm={() => confirmDelete(selectedItem?._id)}
        onCancel={() => setShowDeleteModal(false)}
      />
      {checkoutSuccess ? (
        <div className={styles.checkoutSuccess}>
          <h2>Payment Confirmed! 🎉</h2>
          <p>Thank you for your purchase.</p>
        </div>
      ) : (
        <>
          <table width="100%">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveClick(item)}
                    >
                      <FaTimesCircle />
                    </button>
                  </td>
                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}/=</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()}/=</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.cartAdd}>
            <div className={styles.subtotal}>
              <h3>Cart Total</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td>{subtotal.toLocaleString()}/=</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>{shipping.toLocaleString()}/=</td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{total.toLocaleString()}/=</strong></td>
                  </tr>
                </tbody>
              </table>
              <button className={styles.normal} onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartSection;
