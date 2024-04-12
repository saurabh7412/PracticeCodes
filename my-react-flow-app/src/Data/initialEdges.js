export const initialEdges = [
  // Start stage connections
  { id: "start-order", source: "start", target: "order" },
  { id: "start-address", source: "start", target: "address" },
  { id: "start-payment", source: "start", target: "payment" },

  // Order Booking stage connections
  { id: "order-order-booking", source: "order", target: "order-booking" },
  { id: "address-order-booking", source: "address", target: "order-booking" },
  { id: "payment-order-booking", source: "payment", target: "order-booking" },

  // Order Booking pretasks connections
  {
    id: "order-booking-order-receiving",
    source: "order-booking",
    target: "order-receiving",
  },
  {
    id: "order-booking-food-preparation",
    source: "order-booking",
    target: "food-preparation",
  },

  // Food Preparing stage connections
  {
    id: "order-receiving-food-preparing",
    source: "order-receiving",
    target: "food-preparing",
  },
  {
    id: "food-preparation-food-preparing",
    source: "food-preparation",
    target: "food-preparing",
  },

  // Food Preparing pretasks connections
  {
    id: "food-preparing-delivery-confirmation",
    source: "food-preparing",
    target: "delivery-confirmation",
  },
  {
    id: "food-preparing-order-pickup",
    source: "food-preparing",
    target: "order-pickup",
  },

  // Food Delivering stage connections
  {
    id: "delivery-confirmation-food-delivering",
    source: "delivery-confirmation",
    target: "food-delivering",
  },
  { id: "food-delivering-finish", source: "food-delivering", target: "finish" },

  // Order Pickup pretasks connections
  {
    id: "order-pickup-food-delivering",
    source: "order-pickup",
    target: "food-delivering",
  },
];
