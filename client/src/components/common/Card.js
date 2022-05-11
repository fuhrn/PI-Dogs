import styled from "styled-components";

const CardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: auto;
  width: ${(props) => props.size};
  height: 400px;
  background-color: ${(p) => p.theme.secondaryColor};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  margin: 1rem;
  cursor: pointer;
  transition: transform 250ms ease;
  &:hover {
    transform: scale(1.02);
  }

  .img {
    width: ${(props) => props.size};
    height: 60%;
    object-fit: cover;
  }

  .info {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 1rem;

    h2 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1rem;
      margin: 0 0 10px 0;
    }

    .temp-container {
      margin: 0 0 20px 0;
      }
    }
`;

export function Card({ image, name, temperament}) {
  return (
    <CardWrapper size="20rem">
      <img className="img" src={image} alt="" />

      <div className="info">
        <h2>{name}</h2>
        <h5>Temperament</h5>
        <div className="temp-container">
          {temperament.join(', ').concat('.')}
        </div>
      </div>
    </CardWrapper>
  );
}
