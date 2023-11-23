import Banner from "../Banner/Banner";
import HowWorks from "../HowWorks/HowWorks";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/* have to add premium member  */}
      <HowWorks></HowWorks>
      <SuccessCounter></SuccessCounter>
      <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;
