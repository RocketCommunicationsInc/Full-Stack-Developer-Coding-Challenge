import { useState } from "react";

export function useData() {
  const [data, setData] = useState(null);

  const getAlertsData = () => {
    fetch("http://localhost:5000/api/alerts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const getContactsData = () => {
    fetch("http://localhost:5000/api/contacts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };
  return { data, getAlertsData, getContactsData };
}
