import Image from "next/image";
import aboutImage from "@/public/src/image.jpg"; // use actual file name
import faatiHaaayat from "@/public/src/faatihaaayat.jpg";
import HeadingDetails from "../Components/Heading/HeadingDetails";
import ThemeSong from "../Components/ThemeSong/ThemeSong";
import PresidentAward from "@/public/src/PresidentAward.jpg";
import UNDP from "@/public/src/UNDP.jpg";
import Environmentalist from "@/public/src/Environmentalist.jpg";
import UrbanDebate from "@/public/src/UrbanDebate.jpg";
import NRBAward from "@/public/src/NRBAward.jpg";
import CertificateRecognition from "@/public/src/CertificateRecognition.jpg";
import Link from "next/link";

const Section = () => {
  return (
    <main>
      <section
        className="relative bg-cover bg-center h-[350px] md:h-[550px]"
        style={{ backgroundImage: `url(${aboutImage.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="px-5 lg:px-0 relative z-10 flex justify-center items-center h-full text-center text-white mt-">
          <div className="mt-20 flex flex-col items-end">
            <h1 className="text-xl md:text-4xl lg:text-5xl font-bold">{`"Reducing To Zero, Rising As Hero!"`}</h1>
            <p className="text-lg lg:text-xl ">-- Faatiha Ayat</p>
          </div>
        </div>
      </section>

      {/* <section className="max-w-7xl mx-auto py-10">
        <HeadingDetails
          title={"Empowering the Next Generation: Zero Olympiad"}
          subtitle={
            "A Global Competition for Youth to Tackle Social Challenges and Promote Sustainable Development."
          }
        ></HeadingDetails>
        <div>
          <div>
            <div className="inline-flex items-center gap-2 bg-bd-green/10 text-bd-green px-4 py-2 rounded-full mb-6 border border-green-500">
              <span className="text-xl font-semibold">Our Theme Song</span>
            </div>



          </div>
          <div></div>
        </div>
      </section> */}

      <section className="max-w-7xl mx-auto pt-16 px-5 lg:px-0 md:flex justify-center gap-12 space-y-5">
        <div className="md:w-1/2  border-red-200 flex  justify-end">
          <Image
            src={faatiHaaayat}
            width={500}
            height={500}
            alt="faatiHaaayat"
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-bd-green/10 text-bd-green px-4 py-2 rounded-full mb-6 border border-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star w-4 h-4"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>

            <span className="text-sm font-semibold">Project Ambassador</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
            Faatiha Aayat
          </h1>
          <p className="mt-5 text-gray-600 font-semibold text-sm md:text-base lg:text-xl">
            I am a 13-years-old Child Rights Activist and Climate Campaigner. I
            have already spoken in the UnitedNations, Harvard University, ECOSOC
            Chamber etc. I regularly raise my voice against Global Warming,
            Carbon Emission and Fossil Fuel. I talk to stop Child Abuse, Gender
            Discrimination and Lead Pollution. I am the founder and CEO of
            CHIL&D where I work for Climate, Health, Information, Learning and
            Development.
          </p>
        </div>
      </section>

      <section className="max-w-7xl pt-16 px-5 lg:px-0 mx-auto">
        <div>
          <HeadingDetails
            title="Speeches at the United Nations"
            subtitle="Her United Nations speeches highlight her commitment to child rights, climate action, and global awareness, inspiring meaningful change across international platforms."
          ></HeadingDetails>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/xmdFQDY1hF0?si=ewQ63mn_i-Vsx8jQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/TNWmTUQymhQ?si=ThbyvQJPx3B3C_8p"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/ka0G-H0TouA?si=XKIKkpUgjWc_88qq"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/1W2sfRjBH6A?si=-rKFyBW0JXO-UG-i"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/Ln_YVVUNmtE?si=XY95SCIL_IG-UFWp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/18kRsnDq-mw?si=LOo7kafueuUUO4og"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/M4zZ_OTqwIM?si=oCstY85051pAKexr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/U0Vg6ymJDB8?si=3c8U_dr-7um6_aK3"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="max-w-7xl pt-16 px-5 mx-auto">
        <HeadingDetails
          title={"Honors and Awards"}
          subtitle={
            "A collection of the prestigious honors and awards she has received for her remarkable contributions to child rights advocacy, climate awareness, and global youth leadership."
          }
        ></HeadingDetails>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {/* Card 1 */}
          <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube.com/embed/h9k6q9jO5ck?si=Vh2XC5BK1c0qb9mn"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              height={320}
            ></iframe>

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                Human Rights Hero Award at United Nations ECOSOC Chamber
              </p>
              <div className="flex justify-center mt-4 items-end ">
                <Link
                  href={"https://www.youtube.com/watch?v=h9k6q9jO5ck"}
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={PresidentAward}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                <span className="font-semibold">
                  President’s Award For Outstanding Academic Excellence – Gold
                  Certificate
                </span>{" "}
                from US Department of Education
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={
                    "https://www.facebook.com/FaatihaAayatOfficial/photos/a.1536682463171433/2100226800150327/"
                  }
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={UNDP}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                Champion in{" "}
                <span className="font-semibold">
                  “My Goal – For A Better Future”
                </span>{" "}
                organized by UNDP.
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={
                    "https://www.undp.org/bangladesh/press-releases/mygoal-campaign-winners-awarded"
                  }
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={Environmentalist}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block  text-sm md:text-base lg:text-lg h-22">
                <span className="font-semibold">
                  Environmentalist Award 2022
                </span>{" "}
                from Umbrella Youth Foundation
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={"https://www.facebook.com/photo/?fbid=1145624629411284"}
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={UrbanDebate}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                Champion in the{" "}
                <span className="font-semibold">
                  New York City Urban Debate League 2023
                </span>
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={
                    "https://www.linkedin.com/posts/faatihaaayat_champion-msparlijvdivision-activity-7048638463234953216-ezzW?utm_source=share&utm_medium=member_desktop"
                  }
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={NRBAward}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block  text-sm md:text-base lg:text-lg h-22">
                <span className="font-semibold">
                  NRB Award In The Special Talent Category
                </span>{" "}
                from the Consul General of Bangladesh in New York
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={
                    "https://www.prothomalo.com/world/usa/%E0%A6%8F%E0%A6%A8%E0%A6%86%E0%A6%B0%E0%A6%AC%E0%A6%BF-%E0%A6%B8%E0%A7%8D%E0%A6%AA%E0%A7%87%E0%A6%B6%E0%A6%BE%E0%A6%B2-%E0%A6%9F%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%9F-%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%93%E0%A7%9F%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A1-%E0%A6%AA%E0%A7%87%E0%A6%B2-%E0%A6%AB%E0%A6%BE%E0%A6%A4%E0%A6%BF%E0%A6%B9%E0%A6%BE"
                  }
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={CertificateRecognition}
              alt="avatar"
              width={350}
              height={350}
              className="object-cover w-full h-80"
            />

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                <span className="font-semibold">
                  Certificate of Recognition
                </span>{" "}
                by New York State Senator John Liu and New York City Mayor Eric
                Adams
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={"https://www.facebook.com/photo/?fbid=1915120198660989"}
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/I84Du2wNqHc?si=DsvuibtYlQmZkEuP"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <div className="p-5">
              <p className="block text-sm md:text-base lg:text-lg h-22">
                <span className="font-semibold">
                  Multiple Prizes along with Honorable Mention
                </span>{" "}
                from the National Mathematics Pentathlon Academic Tournament,
              </p>
              <div className="flex justify-center mt-4">
                <Link
                  href={
                    "https://www.youtube.com/watch?v=I84Du2wNqHc&feature=youtu.be"
                  }
                  target="_blank"
                  className="px-6 py-2 lg:px-10 lg:py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-Primary rounded-lg hover:bg-Primary/80 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Section;
