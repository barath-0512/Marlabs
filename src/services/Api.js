import mockRequests from "../assets/requests.json";

export const getRequestsSync = () => mockRequests;

export const getRequests = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(mockRequests), 500);
  });