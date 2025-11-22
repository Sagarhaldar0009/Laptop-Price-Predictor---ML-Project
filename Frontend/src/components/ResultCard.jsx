const ResultCard = ({ price }) => {
  if (!price) return null;

  return (
    <div className="result-box">
      <h2>Predicted Price</h2>
      <h1>₹ {Math.round(price).toLocaleString()}</h1>
    </div>
  );
};

export default ResultCard;
