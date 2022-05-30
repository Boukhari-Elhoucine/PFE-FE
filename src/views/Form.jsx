import React, { memo } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { validateData } from "./utils";
function Form(props) {
  const {
    touched,
    handleSubmit,
    handleBlur,
    params,
    handleInput,
    error,
    handleChange,
    processing,
  } = props;
  return (
    <form
      className="flex flex-col items-center w-4/5  justify-between h-screen  px-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full ">
        <label htmlFor="ite" className="text-sm text-gray-800">
          Nombre d'itération
        </label>
        <input
          type="text"
          id="ite"
          value={params.iters}
          name="iters"
          onBlur={handleBlur}
          onChange={handleInput}
          className="py-1 px-2 outline-none border border-blue-500 rounded shadow-md"
        />
        {error.iters && touched.iters ? (
          <span className="text-red-400 text-xs mt-1">{error.iters}</span>
        ) : null}
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="al" className="text-sm text-gray-800">
          alpha
        </label>
        <input
          type="text"
          value={params.alpha}
          id="al"
          onBlur={handleBlur}
          name="alpha"
          className="py-1 px-2 outline-none border border-blue-500 rounded shadow-md"
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
          className="bg-blue-500 text-gray-50 w-48 rounded py-1 items-center flex justify-center cursor-pointer shadow-md "
        >
          {" "}
          <MdAddPhotoAlternate className="text-lg mr-1" />
          Ajouter une image
        </label>
      </div>
      <div className="flex w-full justify-start">
        <button
          type="submit"
          disabled={validateData(params) || processing}
          className="bg-blue-500 text-white px-10 py-1 mt-2 rounded focus:outline-none  shadow-md disabled:bg-gray-300 transition-all"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default memo(Form);
