import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

import { useRingba } from "wecall-config-lib";

const initialValues = {
  zip: "",
};

const validationSchema = yup.object({
  zip: yup
    .string()
    .required("Zip Code is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Zip code should be of 5 digit.")
    .max(5, "Zip code should be of 5 digit."),
});

export default function ZipCodeForm({
  quiz_loader_color,
  PropagateLoader,
  addAnswer,
  question_options_color,
  question_headline_color,
  question_options_bg_color,
  RINGBA_STORAGE_KEYS,

}) {
  const { storeRgbaData } = useRingba();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const {
    handleSubmit,
    touched,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, event) => {
      if (!loading) {
        // sessionStorage.setItem(sessionStorageKeys.zip, String(values.zip));
        incZipFormState(values.zip);
        storeRgbaData(RINGBA_STORAGE_KEYS.zip, values.zip);
      }
    },
  });

  const incZipFormState = (zip) => {
    setLoading(true);
    setResponse({ city: "", state: "" });
    axios
      .get("https://api.zippopotam.us/us/" + zip, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
      .then((response) => {
        const obj = response.data;
        const keys = Object.keys(obj);
        if (keys.length === 0) return setErrors({ zip: "Zip Code not valid" });
        setResponse({
          city: response.data["places"][0]["place name"],
          state: response.data["places"][0]["state abbreviation"],
        });
        storeRgbaData(RINGBA_STORAGE_KEYS.city, response.data["places"][0]["place name"]);
        storeRgbaData(
          RINGBA_STORAGE_KEYS.state,
          response.data["places"][0]["state abbreviation"]
        );

        addAnswer({
          zip,
          city: response.data["places"][0]["place name"],
          state: response.data["places"][0]["state abbreviation"],
        });
        setLoading(false);
      })
      .catch((error) => {
        setErrors({ zip: "Zip Code not valid" });
        setLoading(false);
        console.error("Zip Code " + error);
      });
  };

  const onChangeZipValue = (e) => {
    const value = e.target.value;
    const obj = {
      target: {
        name: "zip",
        value: String(value).slice(0, 5),
      },
    };
    handleChange(obj);
  };

  return (
    <>
      <div className="question_container">
        <div className="questions">
          <div className={`question_headline ${question_headline_color}`}>
            <h2>What's your zipcode?</h2>
          </div>
          <div className="question_holder">
            <div className="question_input">
              <form onSubmit={handleSubmit}>
                <input
                  value={values.zip}
                  required
                  onChange={onChangeZipValue}
                  onBlur={handleBlur}
                  maxLength={5}
                  max={99999}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="zip"
                  id="zip"
                  placeholder="Zip Code"
                  className="custominput"
                />
                {errors.zip && touched.zip ? (
                  <div className="form-error font-12 form-error-2">
                    &nbsp;&nbsp; {errors.zip}
                  </div>
                ) : (
                  ""
                )}
                <button
                  disabled={errors.zip}
                  type="submit"
                  className={` ${
                    question_options_color && question_options_color.length
                      ? question_options_color
                      : "white"
                  } ${
                    question_options_bg_color &&
                    question_options_bg_color.length
                      ? question_options_bg_color
                      : "bg-red"
                  }`}
                >
                  {loading ? (
                    <>
                      <PropagateLoader loading={true} />
                      <p className="visibility-hidden">.</p>{" "}
                    </>
                  ) : (
                    <>Continue</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
