import React, { useState, useEffect } from "react";
import axios from "axios";
import { validateData, validateOnChange } from "./utils";
import { MdAddPhotoAlternate } from "react-icons/md";
import Spinner from "./Spinner";

function Home() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [touched, setTouched] = useState({ iters: false, alpha: false });
  const [error, setError] = useState({ iters: null, alpha: null });
  const [params, setParams] = useState({
    iters: "",
    alpha: "",
  });
  const handleChange = (e) => {
    const current = e.target.files[0];
    setFile(current);
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const errors = validateOnChange(params);
    setError(errors);
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
    setProcessing(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("iters", params.iters);
    formData.append("alpha", params.alpha);
    axios
      .post("/process", formData, { responseType: "blob" })
      .then((res) => {
        const final = new Blob([res.data]);
        const final_str = URL.createObjectURL(final);
        setResult(final_str);
        //const final_string = `data:image/png;base64,${res.data}`;
        //setResult(final_string);
      })
      .catch((err) => console.warn(err))
      .finally(() => setProcessing(false));
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <form
        className="flex flex-col justify-between items-start h-1/2  px-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            type="text"
            value={params.iters}
            name="iters"
            onBlur={handleBlur}
            onChange={handleInput}
            className="py-1 px-2 outline-none border border-blue-500 rounded"
            placeholder="Nombre d'itération"
          />
          {error.iters && touched.iters ? (
            <span className="text-red-400 text-xs mt-1">{error.iters}</span>
          ) : null}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            value={params.alpha}
            placeholder="alpha"
            onBlur={handleBlur}
            name="alpha"
            className="py-1 px-2 outline-none border border-blue-500 rounded"
            onChange={handleInput}
          />
          {error.alpha && touched.alpha ? (
            <span className="text-red-400 text-xs mt-1">{error.alpha}</span>
          ) : null}
        </div>
        <div className="w-full flex">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            id="file"
          />
          <label
            htmlFor="file"
            className="bg-blue-500 text-gray-50 flex-1 rounded py-1 items-center flex justify-center cursor-pointer "
          >
            {" "}
            <MdAddPhotoAlternate className="text-lg mr-1" />
            Ajouter une image
          </label>
        </div>
        <button
          type="submit"
          disabled={validateData(params) || processing}
          className="bg-blue-500 text-white px-10 py-1 mt-2 rounded focus:outline-none disabled:bg-gray-300"
        >
          Submit
        </button>
      </form>
      <div className="h-screen flex-1 flex items-center">
        {preview ? (
          <div className="mr-10">
            <p className="text-center">image original</p>
            <img src={preview} alt="original" />
          </div>
        ) : null}
        {result ? (
          processing ? (
            <div className="flex items-center">
              <Spinner />
              <span>Processing...</span>
            </div>
          ) : (
            <div>
              <p className="text-center"> image segmenter</p>
              <img src={result} alt="" />
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default Home;
