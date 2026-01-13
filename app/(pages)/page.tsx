import dynamic from "next/dynamic";

import Category from "./Landing/component/Category";
import BestSellers from "./Landing/component/BestSeller";
import FlashSales from "./Landing/component/FlashSales";
import NewArrival from "./Landing/component/NewArrival";
import NewsLetter from "./Landing/component/NewsLetter";
import Categories from "../../components/header/Categories";
const ImageSlider = dynamic(() => import("./Landing/component/ImageSlider"), {
  loading: () => <p>Loading slider...</p>,
});

const CustomerReviews = dynamic(() => import("./Landing/component/CustomerReviews"), {
  loading: () => <p>Loading reviews...</p>,
});

// Home Component
export default function Home() {
  return (
    <div>
      <ImageSlider />
      <Category />
      <BestSellers />
      <FlashSales />
      <NewArrival />
      <CustomerReviews />
      <NewsLetter />
      <Categories />
      {/* <Footer /> */}
    </div>
  );
}
