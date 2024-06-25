import React from 'react';
import useData from './useData';
import style from './style.module.scss';
import VehicleItem from '../VehicleItem';

/**Component to display list of vehicle summaries */
export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <div className={style.VehicleList} data-testid="results">
      {
        vehicles.length > 0
          ? (
            <ul aria-label="Vehicle List">
              {vehicles.map((item) => (
                <VehicleItem
                  key={item.id}
                  id={item.id}
                  media={item.media}
                  price={item.price}
                  description={item.description}
                  meta={item.meta}
                />
              ))}
            </ul>
          )
          : <span>No results</span>
      }
    </div>
  );
}
VehicleList.displayName = 'VehicleList';
