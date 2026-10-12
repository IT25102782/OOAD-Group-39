# OOAD-Group-39
# Member 3 – Manage Cart & Place Order / Checkout - Udawatta U K D S L

## Individual Scope

This part of the Udawatta Stores Online Grocery Shopping System handles the customer shopping cart and checkout/order-placement flow.

### Main Functions

- Add products to the shopping cart
- View and manage cart items
- Change/remove cart items
- Calculate the cart total
- Proceed to checkout
- Enter and validate delivery details
- Select Cash on Delivery (COD)
- Place an order
- Validate product stock before order creation
- Update product stock after a successful order
- Store the order in the database

## Files in My Part

### Frontend

- `src/context/CartContext.jsx`
- `src/pages/Cart.jsx`
- `src/pages/Cart.css`
- `src/pages/Checkout.jsx`
- `src/pages/Checkout.css`

### Backend

- `src/main/java/com/example/udawatta_stores_website/model/Order.java`
- `src/main/java/com/example/udawatta_stores_website/repository/OrderRepository.java`
- `src/main/java/com/example/udawatta_stores_website/controller/OrderController.java`

## Main Order Flow

1. Customer adds products to the cart.
2. Customer reviews or updates the cart.
3. Customer proceeds to checkout.
4. Customer enters delivery information.
5. The system validates the checkout details.
6. The customer selects Cash on Delivery.
7. The frontend sends the order to the backend.
8. The backend validates the order and product stock.
9. The order is saved.
10. Product stock is updated.
11. The cart is cleared after successful order placement.

## Main Backend Endpoint

- `POST /api/orders` – places a customer order.

## Shared Project Dependencies

This module works inside the complete Udawatta Stores project and uses shared project components such as product data, authentication, routing, and application configuration.

`OrderController.java`, `Order.java`, and `OrderRepository.java` are shared backend files used by order-related features. My individual contribution is the cart/checkout/order-placement functionality.

## Scope Note

Customer order history (`MyOrders.jsx` and `MyOrders.css`) is assigned to Member 4 and is not included in my individual frontend scope.
