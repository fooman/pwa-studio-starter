import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import cx from 'classnames';

export const StarRatingComponent = props => {
    const [value, selectStar] = useState(props.value);

    const { editing, className } = props;
    const classes = cx('dv-star-rating', {
        'dv-star-rating-non-editable': !editing
    }, className);

    const onChange = (inputValue) => {
        const { editing, value } = props;
        if (!editing) return
        if (value != null) return
        selectStar(inputValue)
    }

    const onStarClick = (index, value, name, e) => {
        e.stopPropagation();
        const { onStarClick, editing } = props;
        if (!editing) return
        onStarClick && onStarClick(index, value, name, e);
    }

    const onStarHover = (index, value, name, e) => {
        e.stopPropagation();
        const { onStarHover, editing } = props;
        if (!editing) return
        onStarHover && onStarHover(index, value, name, e);
    }

    const onStarHoverOut = (index, value, name, e) => {
        e.stopPropagation();
        const { onStarHoverOut, editing } = props;
        if (!editing) return
        onStarHoverOut && onStarHoverOut(index, value, name, e);
    }

    const renderStars = () => {
        const {
            name,
            starCount,
            starColor,
            emptyStarColor,
            editing
        } = props;
        const starStyles = (i, value) => ({
            float: 'right',
            cursor: editing ? 'pointer' : 'default',
            color: value >= i ? starColor : emptyStarColor
        });
        const radioStyles = {
            display: 'none',
            position: 'absolute',
            marginLeft: -9999
        };

        let starNodes = [];

        for (let i = starCount; i > 0; i--) {
            const id = `${name}_${i}`;
            const starNodeInput = (
                <input
                    key={`input_${id}`}
                    style={radioStyles}
                    className="dv-star-rating-input"
                    type="radio"
                    name={name}
                    id={id}
                    value={i}
                    checked={value === i}
                    onChange={() => onChange(i, name)}
                />
            );
            const starNodeLabel = (
                <label
                    key={`label_${id}`}
                    style={starStyles(i, value)}
                    className={'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star')}
                    htmlFor={id}
                    onClick={e => onStarClick(i, value, name, e)}
                    onMouseOver={e => onStarHover(i, value, name, e)}
                    onMouseLeave={e => onStarHoverOut(i, value, name, e)}
                >
                    {renderIcon(i, value, name, id)}
                </label>
            );

            starNodes.push(starNodeInput);
            starNodes.push(starNodeLabel);
        }

        return starNodes.length ? starNodes : null;
    }

    const renderIcon = (index, value, name, id) => {
        const {renderStarIcon, renderStarIconHalf, size} = props;

        if (
            typeof renderStarIconHalf === 'function' &&
            Math.ceil(value) === index &&
            value % 1 !== 0
        ) {
            return renderStarIconHalf(index, value, name, id);
        }

        if (typeof renderStarIcon === 'function') {
            return renderStarIcon(index, value, name, id);
        }

        return <FontAwesomeIcon icon={faStar} size={size}/>
    }

    return  <div style={{display: 'inline-block', position: 'relative'}} className={classes}>
        {renderStars()}
    </div>
}


StarRatingComponent.propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    size: PropTypes.string,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    starColor: PropTypes.string,
    onStarClick: PropTypes.func,
    onStarHover: PropTypes.func,
    onStarHoverOut: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func
};

StarRatingComponent.defaultProps = {
    starCount: 5,
    size: '2x',
    name: "rate-summary",
    editing: false,
    starColor: '#ffb400',
    emptyStarColor: 'rgb(var(--venia-global-color-gray-400))'
};

