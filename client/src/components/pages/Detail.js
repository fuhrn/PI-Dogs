import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDogs } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { Header, Layout } from "components/common";
import styled from "styled-components";

const H1 = styled.h1`
  &:hover {
    color: red;
  }
`;

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const dogs = useSelector((state) => state.allDogs);
  // const dog = dogs.filter(dog => dog.id === id)
  // console.log(typeof id === 'string');
  const dog = dogs[0];
  // console.log(dogs[0]);
  return (
    <div>
      {id}
      <Header />
      <Layout>
        {/* <H1>Detail</H1> */}
        <p>
          {dog ? (
            <div>
              <img src={dog.image} alt={dog.name} className="image" />
            </div>
          ) : (
            <div >
              <h1>
                <strong>
                  Loading ...
                </strong>
              </h1>
            </div>
          )}
        </p>
      </Layout>
    </div>
  );
}
