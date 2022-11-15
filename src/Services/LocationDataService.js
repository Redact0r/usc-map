import TokenService from "./TokenService";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const DATA_PATHWAY = process.env.REACT_APP_DATA_PATHWAY;

export const LocationDataService = {
  getLocationData() {
    fetch(`${API_ENDPOINT}/`, {
      authorization: `Bearer ${TokenService.getAuthToken()}`,
    }).then((res) => {
      if (!res.ok) return res.json().then((e) => Promise.reject(e));
      return res.json();
    });
  },
};
