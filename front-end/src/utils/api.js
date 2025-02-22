/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with a `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }
    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// reservations API
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function reservationByPhone(mobile_number, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function reservationById(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function reservationByDate(date, signal) {
  const url = `${API_BASE_URL}/reservations?date=${date}`;
  return await fetchJson(url, { signal })
    .then(formatReservationDate)
    .then(formatReservationTime);
}


export async function createReservation(data, signal) {
  const url = `${API_BASE_URL}/reservations`;
  data.people = Number(data.people);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function updateReservation(data, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  console.log("api data.people", data.people, typeof data.people)
  data.people = Number(data.people)
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data}),
    signal,
  };
  return await fetchJson(url, options);
}

export async function updateReservationStatus(data, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}



export async function deleteReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservation/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: "cancelled" } }),
    signal,
  };
  return await fetchJson(url, options);
}

// tables API

export async function createTable(data, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  data.capacity = Number(data.capacity);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

export async function seatTable(reservation_id, table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id } }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function finishTable(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    headers,
    body: JSON.stringify({ data: { table_id } }),
    signal,
  };
  return await fetchJson(url, options);
}


