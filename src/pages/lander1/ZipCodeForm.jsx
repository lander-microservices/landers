import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

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

export default function ZipCodeForm({ PropagateLoader, addAnswer }) {
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
        // storeRgbaData("zip", values.zip);
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
        // storeRgbaData("city", response.data["places"][0]["place name"]);
        // storeRgbaData(
        //   "state",
        //   response.data["places"][0]["state abbreviation"]
        // );

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
      <div className="formHolder">
        <div className="form row-gap-30 flex-d-col">
          <div className="form-card-holder flex-a-cen-j-cen row-gap-30 flex-d-col">
            <div className="form-ques-card row-gap-30">
              <div className="form-options row-gap-30 flex-d-col">
                <form onSubmit={handleSubmit}>
                  <input
                    value={values.zip}
                    required
                    onChange={onChangeZipValue}
                    onBlur={handleBlur}
                    maxLength={5}
                    max={99999}
                    type="number"
                    name="zip"
                    id="zip"
                    placeholder="Zip Code"
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
                    className="form-button form-option-continue color-white font-20 bold"
                  >
                    {loading ? (
                      <>
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
      </div>
    </>
  );
}