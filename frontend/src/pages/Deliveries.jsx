import StockMovesPage from "../components/StockMovesPage.jsx";

export default function Deliveries() {
  return (
    <StockMovesPage
      type="delivery"
      title="Delivery orders"
      endpoint="/stock/deliveries"
      needsFrom={true}
      needsTo={false}
    />
  );
}
