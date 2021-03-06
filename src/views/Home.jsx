import React, { useState, useEffect } from "react";
import axios from "axios";
import { validateOnChange } from "./utils";
import Form from "./Form";
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
      .post("/process", formData)
      .then((res) => {
        const final_images = [];
        res.data.result.forEach((img) => {
          const final_string = `data:image/png;base64,${img}`;
          final_images.push(final_string);
        });
        setResult(final_images);
      })
      .catch((err) => console.warn(err))
      .finally(() => setProcessing(false));
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setParams({ ...params, [name]: value });
  };

  return (
    <div className="h-full bg-gradient-to-t from-yellow-100 to-yellow-50   flex items-center justify-center ">
      <div className="flex flex-col  h-screen items-center w-4/5">
        <h2 className="text-4xl my-5 text-gray-600">
          S??gmentation d'image m??dicale
        </h2>
        <Form
          params={params}
          touched={touched}
          error={error}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          processing={processing}
          handleBlur={handleBlur}
          handleInput={handleInput}
        />
        <div className="h-4/5 flex items-center">
          {preview ? (
            <div className="mr-10">
              <p className="text-center text-lg text-gray-800">
                image original
              </p>
              <img
                src={preview}
                alt="original"
                className="h-52 object-contain"
              />
            </div>
          ) : null}
          {result ? (
            processing ? (
              <div className="flex items-center">
                <Spinner />
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-center text-lg text-gray-800">
                    contour initial
                  </p>
                  <img
                    src={result[0]}
                    alt=""
                    className="h-52 mr-2 object-contain"
                  />
                </div>
                <div>
                  <p className="text-center text-lg text-gray-800">
                    contour finale
                  </p>
                  <img src={result[1]} alt="" className="h-52 object-contain" />
                </div>
              </>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
