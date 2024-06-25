/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export async function request(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.error(`api request for '${apiUrl}' failed: ${error}`);
      throw error;
    });
}
