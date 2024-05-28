import axios from "axios";

export const fetchEBM = async (url, data) => {
  try {
    const { EBM_URL } = process.env;

    const response = await axios({
      method: "post",
      url: `${EBM_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMomo = async (method, url, headers, data) => {
  try {
    const { MOMO_URL, AUTH_MTN_KEY, SUBSCRIPTION_KEY } = process.env;

    const response = await axios.request({
      method,
      maxBodyLength: Infinity,
      url: `${MOMO_URL}${url}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Basic ${AUTH_MTN_KEY}`,
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        ...headers,
      },
      data,
    });
    return response;
  } catch (error) {
    // console.log(JSON.parse(JSON.stringify(error)));
    return JSON.parse(JSON.stringify(error));
  }
};

export const fetchVault = async (method, url, headers, data) => {
  try {
    const { VAULT_URL } = process.env;

    const response = await axios.request({
      method,
      url: `${VAULT_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchYellow = async (method, url, headers, data) => {
  // try {
  const { YELLOW_URL, X_API_KEY } = process.env;
  const response = await axios.request({
    method,
    url: `${YELLOW_URL}${url}`,
    headers: {
      "x-api-key": X_API_KEY,
    },
    data,
  });
  return response;
  // } catch (error) {
  //   console.log(error);
  // }
};
