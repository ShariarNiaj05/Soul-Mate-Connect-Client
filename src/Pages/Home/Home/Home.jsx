import Banner from "../Banner/Banner";
import HowWorks from "../HowWorks/HowWorks";
import PremiumMemberProfiles from "../PremiumMemberProfiles/PremiumMemberProfiles";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PremiumMemberProfiles></PremiumMemberProfiles>
      <HowWorks></HowWorks>
      <SuccessCounter></SuccessCounter>
      <SuccessStory></SuccessStory>
    </div>
  );
};

export default Home;
