import { Header, Layout, HeaderSearch, DisplayDogs } from "components/common";
import theme from "themes/light";

const primaryHeader = theme.primaryColor;
const secondaryHeader = theme.secondaryColor;


export default function Dogs() {
  return (
    <div>
      <Header primary={primaryHeader} secondary={secondaryHeader} />
      <HeaderSearch />
      <Layout>
        <DisplayDogs />
      </Layout>
    </div>
  );
}
