// react hook to check user exid the total number of requests from the local storage save the totoal and retrice

import { useEffect, useState } from "react";
const localStorageKey = "totalRequests";

export const useLimitRestriction = () => {
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const totalRequests = localStorage.getItem(localStorageKey);
    if (totalRequests) {
      setTotalRequests(parseInt(totalRequests));
    }
  }, []);

  const incrementTotalRequests = () => {
    const currentTotalRequests = localStorage.getItem(localStorageKey);
    if (currentTotalRequests) {
      const newTotalRequests = parseInt(currentTotalRequests) + 1;
      localStorage.setItem(localStorageKey, newTotalRequests.toString());
      setTotalRequests(newTotalRequests);
    } else {
      localStorage.setItem(localStorageKey, "1");
      setTotalRequests(1);
    }
  };

  return { totalRequests, incrementTotalRequests };
};
