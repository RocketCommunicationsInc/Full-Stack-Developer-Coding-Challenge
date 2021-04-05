import { useState } from "react";

export function useData() {
  const [data, setData] = useState(null);

  const getAlertsData = () => {
    fetch("http://localhost:5000/api/alerts", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  const getContactsData = () => {
    fetch("http://localhost:5000/api/contacts", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  return { data, getAlertsData, getContactsData };
}
