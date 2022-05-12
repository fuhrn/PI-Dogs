import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { Header, Layout } from "components/common";
import styled from "styled-components";
import theme from "themes/light";

const primaryHeader = theme.primaryColor;
const secondaryHeader = theme.secondaryColor;

const H1 = styled.h1`
  margin-top: 100px;
  margin-left: 200px;
`;

const DetailWrapper = styled.article`
  display: flex;
  /* flex-direction: column; */
  border-radius: 1rem;
  overflow: auto;
  width: 1000px;
  height: 500px;
  background-color: ${(p) => p.theme.secondaryColor};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  margin: auto;
  cursor: pointer;

  .img {
    /* width: ${(props) => props.size}; */
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 3rem;

    h2 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1rem;
      margin: 0 0 5px 0;
    }

    .container {
      margin: 0 0 10px 0;
    }
  }
`;

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  const response = useSelector((state) => state.detail);
  const dog = response[0];
  // console.log(dog)
  // console.log("detail page: ", dog[0]);

  return (
    <>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      <Layout>
        {dog ? (
          <>
            <H1>Dog Detail</H1>
            <DetailWrapper>
              <img className="img" src={dog.image} alt={dog.name} />

              <div className="info">
                <h2>{dog.name}</h2>
                <h5>Temperament</h5>
                <div className="container">
                  {dog.temperament.join(", ").concat(".")}
                </div>
                <h5>Weight:</h5>
                <div className="container">{dog.weight} kgs.</div>
                <h5>Height:</h5>
                <div className="container">{dog.height} cms.</div>
                <h5>Life span: </h5>
                <div className="container">{dog.life_span} years.</div>
              </div>
            </DetailWrapper>
          </>
        ) : (
          <div>
            <H1>
              <strong>Loading ...</strong>
            </H1>
          </div>
        )}
      </Layout>
    </>
  );
}
