import logo from "./logo.svg";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [timestamps, setTimestamps] = useState([]);

  const fetchTimestamps = async () => {
    try {
      const response = await axios.get("http://localhost:3001/timestamps");
      setTimestamps(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTimestamps();
  }, []);

  return (
    <div>
      <Header />
      <VideoPlayer stamps={timestamps} />
    </div>
  );
}

export default App;
