// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useState } from "react";
import Slide from "./Slide";

// import bgimg1 from '../assets/images/carousel1.jpg'
// import bgimg2 from '../assets/images/carousel2.jpg'
// import bgimg3 from '../assets/images/carousel3.jpg'

export default function Banner() {
  const [ImageArray, setImageArray] = useState([
    {
      title: "Saudi Arabia",
      ImgSrc:
        "https://images.pexels.com/photos/4346403/pexels-photo-4346403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Saudi Arabia offers diverse visa options for tourism, education, and official purposes.Ensure all required documents are complete for a smooth and hassle- free application process.",
    },
    {
      title: "Palestine",
      ImgSrc:
        "https://images.pexels.com/photos/17690078/pexels-photo-17690078/free-photo-of-view-of-the-dome-of-the-rock.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description:
        "Travel to Palestine requires specific documentation, including an official or personal invitation letter.Ensure compliance with all visa requirements to facilitate a seamless entry experience.",
    },
  ]);
  return (
    <div className=" py-0 mx-auto mt-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            title={"Bangladesh"}
            image={
              "https://images.pexels.com/photos/12251538/pexels-photo-12251538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            text="Bangladesh provides affordable visa options for tourists, students, and officials.Complete your application with the necessary documentation to ensure smooth entry to the country."
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={"Palestine"}
            image={
              "https://images.pexels.com/photos/17690078/pexels-photo-17690078/free-photo-of-view-of-the-dome-of-the-rock.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            text={
              "Travel to Palestine requires specific documentation, including an official or personal invitation letter. Ensure compliance with all visa requirements to facilitate a seamless entry experience."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={"Afghanistan"}
            image={
              "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            text={
              "Afghanistan offers visas for business, tourism, and official engagements. Prepare all required documents thoroughly to ensure a secure and hassle-free travel process."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={"Pakistan"}
            image={
              "https://images.pexels.com/photos/16883433/pexels-photo-16883433/free-photo-of-lake-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            text={
              "Pakistan offers straightforward visa processes for students, tourists, and businesses. Ensure all documents are in order for a smooth and efficient application experience."
            }
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            title={"Turkey"}
            image={
              "https://images.pexels.com/photos/2767815/pexels-photo-2767815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            text={
              "Turkey's diverse visa options cater to a wide range of visitors for tourism, education, and business. Prepare all documents for a smooth application."
            }
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
