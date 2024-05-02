import { NewsContextProvider } from "./component/NewsContext";
import News from "./component/News";
import "./App.css";
import Footer from "./component/Footer";

function App() {

  return (
    <>
    <NewsContextProvider>
      <News />
    </NewsContextProvider>
    <Footer/>
    </>
  );
}

export default App;

