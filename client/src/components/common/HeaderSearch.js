import styled from "styled-components";
import { Select, Input } from "components/common";

const HeaderWrapper = styled.header`
  font-family: "Open Sans";
  margin: 60px auto 0 auto;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  height: 90px;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme.primaryColor},
    ${(p) => p.theme.secondaryColor}
  ); 
  border-bottom: 3px solid ${(p) => p.theme.secondaryColor}; */
`;

const Form = styled.form`
  display: flex;
`;

const Fieldset = styled.fieldset`
  display: flex;
  height: 60px;
  width: 100px;
`;

const Legend = styled.legend`
font-size: small;
`

const Label = styled.label`
`

const InputR = styled.input``;

const Div = styled.div`
  display: flex;
  align-items: center;
`

export function HeaderSearch() {
  return (
    <HeaderWrapper>
      <Select concept="Temperamento" />
      <Form action="">
        <Fieldset>
          <Legend>Sort by Name</Legend>
          <Div>
            <InputR type="radio" name="name" defaultChecked />
            <Label>Asc</Label>
          </Div>
          <Div>
            <InputR type="radio" name="name" />
            <Label>Des</Label>
          </Div>
        </Fieldset>
        <Fieldset>
          <Legend>Sort by Breed</Legend>
          <Div>
            <InputR type="radio" name="breed" defaultChecked />
            <Label>All</Label>
          </Div>
          <Div>
            <InputR type="radio" name="breed" />
            <Label>API</Label>
          </Div>
          <Div>
            <InputR type="radio" name="breed" />
            <Label>Created</Label>
          </Div>
        </Fieldset>
      </Form>
      <Input
        type="text"
        placeholder="Search..."
        width="200px"
        marginTop="23px"
        marginLeft="8px"
      />
    </HeaderWrapper>
  );
}
