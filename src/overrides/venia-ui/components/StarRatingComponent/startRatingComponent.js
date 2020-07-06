import React from 'react';
import StarRating from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const StartRatingComponent = (props) => {
    const {isEditable = false, size = '2x', count = 5, ratingValue } = props
    return <StarRating
        name="rating_summary"
        editing={isEditable}
        renderStarIcon={() => <FontAwesomeIcon icon={faStar} size={size} />}
        starCount={count}
        value={ratingValue}/>
}

export default StartRatingComponent
