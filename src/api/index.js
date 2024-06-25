// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

const vehicleListApiUrl = '/api/vehicles.json';

async function getVehicleSummary(vehicle) {
  return request(vehicle.apiUrl)
    .then((details) => ({
      ...vehicle,
      ...details
    }));
}

const hasPrice = (item) => item.price !== undefined && item.price !== '';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
export default async function getData() {
  return request(vehicleListApiUrl)
    .then(async (listData) => {
      const detailLookupPromises = listData.map(getVehicleSummary);

      return Promise.allSettled(detailLookupPromises)
        .then((promises) => promises
          .filter((promise) => promise.status === 'fulfilled') // Ignore failed lookups
          .map((promise) => promise.value))
        .then((listItems) => listItems.filter(hasPrice)); // Filter out items with no price
    });
}
