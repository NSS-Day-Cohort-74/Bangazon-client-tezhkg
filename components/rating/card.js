import { useEffect } from 'react';
import { Rating } from 'react-simple-star-rating'

export function RatingCard({ rating }) {
  const [showRating, setShowRating] = useState(false);
  useEffect(() => {
    setShowRating(true)
  }, [])

  return (
    <div className="tile is-child">
      <article className="media box is-align-items-center">
        <figure className="media-left">
          {showRating && <Rating initialValue={rating.score} readonly={true} />}
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              {rating.review}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
