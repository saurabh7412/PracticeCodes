
const nodeTypes = {
    start:{
        shape: "rectangle",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        backgroundColor: "#fd730a",
        color: "#FFFFFF",
        padding: "2px 10px"
    },
    stage: {
        shape: "rectangle",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        backgroundColor: "rgb(0, 149, 14)",
        color: "#FFFFFF",
        padding: "2px 10px"
    },
    pretask: {
        shape: "rectangle",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        backgroundColor: "rgb(35, 89, 145)",
        color: "#FFFFFF",
        padding: "2px 10px"
    },
    finish:{
        shape: "rectangle",
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        backgroundColor: "#fd730a",
        color: "#FFFFFF",
        padding: "2px 10px"
    },
  };

export const initialNodes = [
    // Stages
    {
      id: "start",
      data: { label: "Start" },
      position: { x: 300, y: 50 },
      type: "start",
      style: nodeTypes.start,
      connectable: true,
      draggable:false,
    },
    {
      id: "order-booking",
      data: { label: "Order Booking" },
      position: { x: 300, y: 300 },
      type: "stage",
      style: nodeTypes.stage
    },
    {
      id: "food-preparing",
      data: { label: "Food Preparing" },
      position: { x: 300, y: 550 },
      type: "stage",
      style: nodeTypes.stage
    },
    {
      id: "food-delivering",
      data: { label: "Food Delivering" },
      position: { x: 300, y: 800 },
      type: "stage",
      style: nodeTypes.stage
    },
    {
      id: "finish",
      data: { label: "Finish" },
      position: { x: 300, y: 950 },
      type: "finish",
      style: nodeTypes.finish,
      draggable:false,
    },

    // Pretasks
    {
      id: "order",
      data: { label: "Take Order from User" },
      position: { x: 100, y: 175 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "address",
      data: { label: "Take Address from User" },
      position: { x: 350, y: 175 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "payment",
      data: { label: "Payment Receiving Confirmation" },
      position: { x: 600, y: 175 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "order-receiving",
      data: { label: "Order Receiving by Chef" },
      position: { x: 100, y: 425 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "food-preparation",
      data: { label: "Food Preparation by Chef" },
      position: { x: 350, y: 425 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "delivery-confirmation",
      data: { label: "Order Delivery Confirmation" },
      position: { x: 100, y: 660 },
      type: "pretask",
      style: nodeTypes.pretask
    },
    {
      id: "order-pickup",
      data: { label: "Order Pickup by Delivery Person" },
      position: { x: 350, y: 660 },
      type: "pretask",
      style: nodeTypes.pretask
    },
];
