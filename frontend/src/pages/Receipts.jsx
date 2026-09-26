import StockMovesPage from "../components/StockMovesPage.jsx";

export default function Receipts() {
  return (
    <StockMovesPage
      type="receipt"
      title="Receipts"
      endpoint="/stock/receipts"
      needsFrom={false}
      needsTo={true}
    />
  );
}
