import "react-multi-carousel/lib/styles.css";
import BannerCategories from "./ui/BannerCategories";
import HomeBanner from "./ui/HomeBanner";
import Hightlights from "./ui/Hightlights";
import Categories from "./ui/Categories";

function App() {
  return (
    <main>
      <BannerCategories />
      <HomeBanner />
      <Hightlights />
      <Categories />
    </main>
  );
}

export default App;
