import Picasso from "@toptal/picasso-provider";
import { Typography, Button } from "@toptal/picasso";

function App() {
  return (
    <Picasso injectFirst>
      <Typography variant="heading" size="xlarge">
        Welcome to the App
      </Typography>
      <Button>Submit</Button>
    </Picasso>
  );
}

export default App;
