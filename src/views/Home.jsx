import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const current = e.target.files[0];
    setFile(current);
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setPreview(reader.result);
    }
  }, [file]);
  return (
    <div className="h-screen flex justify-center items-center">
      <form>
        <input type="file" accept="image/*" onChange={handleChange} />
      </form>
      <img src={preview} alt="" />
    </div>
  );
}

export default Home;
