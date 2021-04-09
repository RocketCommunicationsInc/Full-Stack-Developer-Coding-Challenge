import { useState } from "react";

const ENV = "prod";

let apiEndpoint = "http://localhost:5000";

if (ENV === "prod") {
  apiEndpoint = "https://rocket-comms-challenge-api.herokuapp.com";
}

export function useData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getAlertsData = () => {
    fetch(`${apiEndpoint}/api/alerts`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        error && console.log(error);
        error && setError(error);
      });
  };

  const getContactsData = () => {
    fetch(`${apiEndpoint}/api/contacts`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        error && console.log(error);
        error && setError(error);
      });
  };
  return { data, error, getAlertsData, getContactsData };
}
