import React, { useState, useEffect } from "react";
import getAnswerToQuestion from "./query";
const TakeAway = () => {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAnswerToQuestion();
        setAnswer(response);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="">
      <h1> Takeaway from the session.</h1>
      <p> {answer}</p>
    </div>
  );
};

export default TakeAway;
