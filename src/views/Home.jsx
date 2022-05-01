import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("/process", formData)
      .then((res) => {
        const reader = new FileReader();
        console.log(res);
        reader.readAsDataURL(new Blob([res.data], { type: "image/png" }));
        reader.onloadend = () => setResult(reader.result);
      })
      .catch((err) => console.warn(err));
  };
  console.log(result);
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-10 py-1 mt-2 rounded"
        >
          Submit
        </button>
      </form>
      <img src={preview} alt="" className="h-32 w-32" />
      <img src={result} alt="" className="h-32 w-32" />
    </div>
  );
}

export default Home;
