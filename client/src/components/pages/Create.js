import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTemperaments, postBreed } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Header, Layout, Input, Button, Spinner } from "components/common";
import theme from "themes/light";
import styled from "styled-components";
import { useRef } from "react";

const primaryHeader = theme.primaryColor;
const secondaryHeader = theme.secondaryColor;

const H1 = styled.h1`
  margin-top: 100px;
  margin-left: 200px;
`;

const Form = styled.form`
  margin-left: 200px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border: 4px;

  .alt-text {
    text-align: center;
    margin: 10px 0;
  }

  > ${Button}:first-of-type {
    margin-top: 40px;
  }

  > ${Input} {
    margin-top: 20px;
  }
`;

// let errors = {};

function validate(formFields) {
  const validLifeSpan = new RegExp("^[0-9]{1,2}[-][0-9]{1,2}$");

  let errors = {};

  if (formFields.name.length < 3) {
    errors.name = "Your breed name must have a name minimum 3 letters long";
  } else if (formFields.name.length > 30) {
    errors.name = "That´s way too long a name. Keep it simple!!";
  } else if (!formFields.heightMin) {
    errors.heightMin = "REQUIRED. Minimum height of 10 cms.";
  } else if (isNaN(parseInt(formFields.heightMin))) {
    errors.heightMin = "Height should be a number";
  } else if (formFields.heightMin <= 0) {
    errors.heightMin = "Your breed can´t be shorter than 0.";
  } else if (parseInt(formFields.heightMin) >= parseInt(formFields.heightMax)) {
    errors.heightMin = "Minimum height should be lower than maximum height";
  } else if (!formFields.heightMax) {
    errors.heightMax = "REQUIRED. Maximum height of 120 cms.";
  } else if (isNaN(parseInt(formFields.heightMax))) {
    errors.heightMax = "Height should be a number";
  } else if (formFields.heightMax > 120) {
    errors.heightMax = "I think 120cm is enough for a dog´s height, don´t you?";
  } else if (!formFields.weightMin) {
    errors.weightMin = "REQUIRED. Minimum weight of 1kg.";
  } else if (isNaN(parseInt(formFields.weightMin))) {
    errors.weightMin = "Weight should be a number";
  } else if (formFields.weightMin < 1) {
    errors.weightMin = "Your breed must weight at least more than nothing";
  } else if (!formFields.weightMax) {
    errors.weightMax = "REQUIRED. Maximum weight of 80 kg.";
  } else if (isNaN(parseInt(formFields.weightMax))) {
    errors.weightMax = "Weight should be a number";
  } else if (parseInt(formFields.weightMax) <= parseInt(formFields.weightMin)) {
    errors.weightMax = "Maximum weight should be higher than minimum weight";
  } else if (formFields.weightMax > 80) {
    errors.weightMax =
      "We are creating a dog, not an elephant 🐘!! Keep your weight under 80";
  } else if (!validLifeSpan.test(formFields.life_span)) {
    errors.life_span = "Fill life-span with provided pattern '00-99'";
  } else if (formFields.temperaments.length === 0) {
    errors.temperaments = "Select one temperament at least.";
  }

  return errors;
}

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // inicialmente formEnabled esta en 'true' porque si bien errors es {} vacio, formFields esta vacio tambien
  // y por lo tanto el boton de CREATE tiene que permanecer disabled
  // loading pasa a 'true' cuando empieza a hacer el handleSubmit()
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [errors, setErrors] = useState({});

  const allTemperaments = useSelector((state) => state.temperaments);

  const [formFields, setFormFields] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  // console.log("errors temperaments: ", errors.temperaments);
  // console.log("loading: ", loading, "disabled: ", disabled, "errors: ", errors);
  // console.log("formFields: ", formFields);

  function handleInputChange(e) {
    setFormFields((input) => {
      // para asegurarme que siempre tengo el input actualizado...
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };

      const errors = validate(newInput);

      setErrors(errors);

      if (Object.keys(errors).length === 0 && !loading) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }

      return newInput;
    });
  }


  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  
  function handleSelect(e) {
    if (!formFields.temperaments.includes(e.target.value)) {
      setFormFields({
        ...formFields,
        temperaments: [...formFields.temperaments, e.target.value],
      });
    }
  }

  function handleDeleteTemperament(el) {
    // console.log("fileds1: ", formFields.temperaments);
    setFormFields({
      ...formFields,
      temperaments: formFields.temperaments.filter((temp) => temp !== el),
    });
  }

 
  const errores = useRef({})
  useEffect(() => {
    // con esto logro tener los errores cuando borro todos los temperamentos
    errores.current = validate(formFields);
    // ahora necesito modificar el estado de los errores
    console.log("f3: ", errores.current);
  }, [formFields]);



  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (
      !Object.getOwnPropertyNames(errors).length &&
      formFields.name &&
      formFields.heightMin &&
      formFields.heightMax &&
      formFields.weightMin &&
      formFields.weightMax &&
      formFields.life_span &&
      // falta url
      formFields.temperaments.length
    ) {
      // dispatch(postBreed(formFields));
      // console.log(formFields);

      alert("Doggie created 👏");
      setFormFields({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
      navigate.push("/home");
    } else {
      // console.log(errors);
      setLoading(false);
      alert("Doggie can´t be created with these data 🤷‍♂️");
    }
  }

  return (
    <>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      <Layout>
        <H1>Create breed</H1>
        <Form onSubmit={handleSubmit}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <span>Required fields (*)</span>
              <Input
                value={formFields.name}
                onChange={handleInputChange}
                name="name"
                type="text"
                placeholder="(*) Breed name"
                required
              />
              {errors.name && (
                <p className="error">
                  <strong>{errors.name}</strong>
                </p>
              )}
              <Input
                value={formFields.heightMin}
                onChange={handleInputChange}
                name="heightMin"
                type="number"
                placeholder="(*) Minimum height in cms - e.g.: 10 "
                min="10"
                max="120"
                required
              />
              {errors.heightMin && (
                <p className="error">
                  <strong>{errors.heightMin}</strong>
                </p>
              )}
              <Input
                value={formFields.heightMax}
                onChange={handleInputChange}
                name="heightMax"
                type="number"
                placeholder="(*) Maximum height in cms - e.g.: 120"
                required
                min="10"
                max="120"
              />
              {errors.heightMax && (
                <p className="error">
                  <strong>{errors.heightMax}</strong>
                </p>
              )}
              <Input
                value={formFields.weightMin}
                onChange={handleInputChange}
                name="weightMin"
                type="number"
                placeholder="(*) Minimum weight in kilos - e.g.: 1"
                required
                min="1"
                max="80"
              />
              {errors.weightMin && (
                <p className="error">
                  <strong>{errors.weightMin}</strong>
                </p>
              )}
              <Input
                value={formFields.weightMax}
                onChange={handleInputChange}
                name="weightMax"
                type="number"
                placeholder="(*) Maximum weight in kilos - e.g.: 80"
                required
                min="0"
                max="80"
              />
              {errors.weightMax && (
                <p className="error">
                  <strong>{errors.weightMax}</strong>
                </p>
              )}

              <Input
                value={formFields.image}
                onChange={handleInputChange}
                name="image"
                type="text"
                placeholder="Image URL - leave blank if none"
              />
              <div>
                <select onChange={(e) => handleSelect(e)}>
                  <option value="selected" hidden>
                    Temperaments
                  </option>
                  {allTemperaments?.map((temp) => {
                    return (
                      <option value={temp.name} key={temp.name}>
                        {temp.name}
                      </option>
                    );
                  })}
                </select>

                {formFields.temperaments.map((el) => {
                  return (
                    <ul className="allTemps" key={el}>
                      <li>
                        <p className="temp">
                          <strong>{el}</strong>
                        </p>
                        <button
                          onClick={() => handleDeleteTemperament(el)}
                          className="x"
                        >
                          X
                        </button>
                      </li>
                    </ul>
                  );
                })}

                {errores.current.temperaments && (
                  <p className="error">
                    <strong>{errores.current.temperaments}</strong>
                  </p>
                )}
{/* 
                {errors.temperaments && (
                  <p className="error">
                    <strong>{errors.temperaments}</strong>
                  </p>
                )} */}
              </div>
              <Input
                value={formFields.life_span}
                onChange={handleInputChange}
                name="life_span"
                type="text"
                placeholder="Life span in years e.g. '2-4' - Pattern '00-99'"
                // pattern="^[0-9]{1,2}[-][0-9]{1,2}$"
                maxlength="5"
              />
              {errors.life_span && (
                <p className="error">
                  <strong>{errors.life_span}</strong>
                </p>
              )}
            </>
          )}
          {/* inicialmente loading esta en false y pasa a true con el submit */}
          {/* loading queda en true hasta tanto el submit se haya realizado, y asi evito multiples submits */}
          {/* pero necesito que formDisabled este en false tambien: */}
          {/* valor inicial de formDisabled es TRUE y pasa a FALSE cuando errors.length === 0 && !loading*/}

          {/* 
          loading false && errors.length === 0   //console output: false && true = false significa que formEnabled sera false y puedo usar Create
          */}
          <Button large type="submit" disabled={disabled}>
            {loading ? "Loading..." : "Create"}
          </Button>
        </Form>
      </Layout>
    </>
  );
}
