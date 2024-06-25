import React from 'react';
import style from './style.module.scss';
import VehicleDetailsModal from '../VehicleDetailsModal';

const mobileBreakSize = 701; // Add one to mobile break size to avoid display scaling jitter

/**Component to display single vehicle list item with details popup button*/
const VehicleItem = ({
  id,
  media,
  price,
  description,
  meta
}) => {
  return (
    <li className={style.VehicleItem} data-testid="vehicle" aria-label={id}>
      <picture>
        <source srcSet={media[1].url} media={`(max-width: ${mobileBreakSize}px)`} />
        <img src={media[0].url} alt={id} data-testid="image" />
      </picture>
      <div role="none" className={style.summary}>
        <h2 className={style.title} data-testid="title">
          {id.toUpperCase()}
        </h2>
        <p className={style.price} data-testid="price">
          {`From ${price}`}
        </p>
        <p className={style.description} data-testid="description">
          {description}
        </p>
        { meta
            && (
            <VehicleDetailsModal
              id={id}
              meta={meta}
            />
            )}
      </div>
    </li>
  );
};
VehicleItem.displayName = 'VehicleItem';

export default VehicleItem;
