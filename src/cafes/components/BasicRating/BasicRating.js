import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function MyComponent() {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate / 20);
  };

  return (
    <Rating
      emptyColor="transparent"
      fillColor="#fff"
      onClick={handleRating}
      ratingValue={rating / 20}
    />
  );
}
