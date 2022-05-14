import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { getTemperaments, postBreed } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Header, Layout, Input, Button, Spinner } from "components/common";
import theme from "themes/light";
import styled from "styled-components";

const primaryHeader = theme.primaryColor;
const secondaryHeader = theme.secondaryColor;

const H1 = styled.h1`
  margin-top: 100px;
  margin-left: 200px;
`;

const Label = styled.label`
  display: block;
  margin-top: 12px;
`;

const Ul = styled.ul`
  margin: 6px;
`;

const Li = styled.li`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  height: 24px;
`;

const Temp = styled.p`
  margin-right: 6px;
`;

const SelectButton = styled.button`
  padding: 0px 5px;
  color: red;
  height: fit-content;
`;

const Select = styled.select`
  /* padding: 8px 8px 16px 8px; */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: "Open Sans";
  margin-right: 8px;
  min-width: 168px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 0.5em;
  background: #ffffff;
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

  .error {
    color: red;
    font-size: small;
    margin-top: 0px;
    margin-bottom: 24px;
  }
`;

// let errors = {};

function validate(formFields) {
  const validLifeSpan = new RegExp("^[0-9]{1,2}[-][0-9]{1,2}$");

  let errors = {};

  // if (nameExists) {
  //   errors.name = "Name already exists.";
  // }
  if (formFields.name.length < 3) {
    // ojo estos else if tienen que estar ordenados como lo estan los campos input
    // para que pueda imprimir el mensaje de error
    errors.name = "Your breed name must have a name minimum 3 letters long.";
  } else if (formFields.name.length > 30) {
    errors.name = "That´s way too long a name. Keep it simple!!";
  } else if (!formFields.heightMin) {
    errors.heightMin = "REQUIRED. Minimum height of 10 cms.";
  } else if (isNaN(parseInt(formFields.heightMin))) {
    errors.heightMin = "Height should be a number";
  } else if (formFields.heightMin <= 0) {
    errors.heightMin = "Your breed can´t be shorter than 0.";
  } else if (parseInt(formFields.heightMin) >= parseInt(formFields.heightMax)) {
    errors.heightMin = "Minimum height should be lower than maximum height.";
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
    errors.weightMin = "Your breed must weight at least more than nothing.";
  } else if (!formFields.weightMax) {
    errors.weightMax = "REQUIRED. Maximum weight of 80 kg.";
  } else if (isNaN(parseInt(formFields.weightMax))) {
    errors.weightMax = "Weight should be a number";
  } else if (parseInt(formFields.weightMax) < parseInt(formFields.weightMin)) {
    errors.weightMax = "Maximum weight should be higher than minimum weight.";
  } else if (formFields.weightMax > 80) {
    errors.weightMax =
      "We are creating a dog, not an elephant 🐘!! Keep your weight under 80.";
  } else if (!validLifeSpan.test(formFields.life_span)) {
    errors.life_span = "Fill life-span with provided pattern '00-99'.";
  } else if (formFields.temperaments.length === 0) {
    errors.temperaments = "Select one temperament at least.";
  }

  return errors;
}

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendHome = () => {
    navigate("/dogs");
  };

  // inicialmente formEnabled esta en 'true' porque si bien errors es {} vacio, formFields esta vacio tambien
  // y por lo tanto el boton de CREATE tiene que permanecer disabled
  // loading pasa a 'true' cuando empieza a hacer el handleSubmit()
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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

  // PRUEBA error duplicado
  const [nameExists, setNameExists] = useState(false);

  useEffect(() => {
    if (
      !Object.getOwnPropertyNames(errors).length &&
      formFields.name &&
      formFields.heightMin &&
      formFields.heightMax &&
      formFields.weightMin &&
      formFields.weightMax &&
      formFields.life_span &&
      formFields.temperaments.length
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [errors, formFields]);

  // a usar para control de nombre duplicado
  const dogs = useSelector((state) => state.copyDogs);
  // console.log("dogs: ",dogs);

  function handleInputChange(e) {
    setFormFields((input) => {
      // para asegurarme que siempre tengo el input actualizado...
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };

      let search = input.name;
      let searchDogs = [];
      // console.log(search);
      searchDogs = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(search)
      );
      // console.log(searchDogs);
      // if (searchDogs !== []) {
      //   setNameExists(true);
      // } else {
      //   setNameExists(false);
      // }

      console.log('nombre existe?: ', searchDogs)

      setErrors(validate(newInput));

      return newInput;
    });
  }

  function handleSelect(e) {
    if (!formFields.temperaments.includes(e.target.value)) {
      setFormFields({
        ...formFields,
        temperaments: [...formFields.temperaments, e.target.value],
      });
    }
    setErrors({});
  }

  function handleDeleteTemperament(el) {
    setFormFields({
      ...formFields,
      temperaments: formFields.temperaments.filter((temp) => temp !== el),
    });
    setErrors(
      validate({
        ...formFields,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (formFields.image === "") {
      formFields.image =
        "https://static8.depositphotos.com/1000792/1065/v/950/depositphotos_10659058-stock-illustration-cute-dog.jpg";
    }

    dispatch(postBreed(formFields));
    setLoading(false);

    alert("Great!! Dog created 👏");
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
    sendHome();
  }

  return (
    <Fragment>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      <Layout>
        <H1>Create breed</H1>
        <Form onSubmit={handleSubmit}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <span>Required fields (*)</span>
              <Label htmlFor="name">
                Name:
                <Input
                  value={formFields.name}
                  onChange={handleInputChange}
                  name="name"
                  type="text"
                  placeholder="(*) Breed name"
                  required
                />
              </Label>
              {errors.name && (
                <p className="error">
                  <strong>{errors.name}</strong>
                </p>
              )}

              <Label htmlFor="heightMin">
                Minimum height:
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
              </Label>
              {errors.heightMin && (
                <p className="error">
                  <strong>{errors.heightMin}</strong>
                </p>
              )}

              <Label htmlFor="heightMax">
                Maximum height:
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
              </Label>
              {errors.heightMax && (
                <p className="error">
                  <strong>{errors.heightMax}</strong>
                </p>
              )}

              <Label htmlFor="weightMin">
                Minimum weight:
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
              </Label>
              {errors.weightMin && (
                <p className="error">
                  <strong>{errors.weightMin}</strong>
                </p>
              )}

              <Label htmlFor="weightMax">
                Maximum weight:
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
              </Label>
              {errors.weightMax && (
                <p className="error">
                  <strong>{errors.weightMax}</strong>
                </p>
              )}

              <Label htmlFor="image">
                Image URL:
                <Input
                  value={formFields.image}
                  onChange={handleInputChange}
                  name="image"
                  type="url"
                  pattern="https://.*"
                  placeholder="https://mylittledog.jpg - leave blank if none"
                />
              </Label>
              {errors.image && (
                <p className="error">
                  <strong>{errors.image}</strong>
                </p>
              )}

              <Label htmlFor="life_span">
                Life Span in years:
                <Input
                  value={formFields.life_span}
                  onChange={handleInputChange}
                  name="life_span"
                  type="text"
                  placeholder="Life span in years e.g. '2-4' - Pattern '00-99'"
                  maxlength="5"
                />
              </Label>
              {errors.life_span && (
                <p className="error">
                  <strong>{errors.life_span}</strong>
                </p>
              )}

              <div>
                <Label htmlFor="temps">
                  Temperaments:
                  <Select
                    concept="Temperamento"
                    name="temps"
                    onChange={(e) => handleSelect(e)}
                  >
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
                  </Select>
                </Label>

                <Ul>
                  {formFields.temperaments.map((el) => {
                    return (
                      <Li key={el}>
                        <Temp>
                          <strong>{el}</strong>
                        </Temp>
                        <SelectButton
                          onClick={() => handleDeleteTemperament(el)}
                          className="x"
                        >
                          X
                        </SelectButton>
                      </Li>
                    );
                  })}
                </Ul>

                {errors.temperaments && (
                  <p className="error">
                    <strong>{errors.temperaments}</strong>
                  </p>
                )}
              </div>
            </>
          )}
          <Button large type="submit" disabled={disabled}>
            {loading ? "Loading..." : "Create"}
          </Button>
        </Form>
      </Layout>
    </Fragment>
  );
}
