import StockMovesPage from "../components/StockMovesPage.jsx";

export default function Transfers() {
  return (
    <StockMovesPage
      type="internal"
      title="Internal transfers"
      endpoint="/stock/transfers"
      needsFrom={true}
      needsTo={true}
    />
  );
}
