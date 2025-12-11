import Image from "next/image";
import IITK from "@/public/colleges/IITK.png";
import IIITL from "@/public/colleges/IIITL.png";
import IIITR from "@/public/colleges/IIITR.png";
import IIITU from "@/public/colleges/IIITU.png";
import IITM from "@/public/colleges/IITM.png";
import IITD from "@/public/colleges/IITD.png";
import IITH from "@/public/colleges/IITH.png";

// College logos with correct alt text
const COLLEGE_LOGOS = [
  { src: IITK, alt: "IIT Kanpur" },
  { src: IIITL, alt: "IIIT Lucknow" },
  { src: IIITR, alt: "IIIT Ranchi" },
  { src: IIITU, alt: "IIIT Una" },
  { src: IITD, alt: "IIT Delhi" },
  { src: IITM, alt: "IIT Madras" },
  { src: IITH, alt: "IIT Hyderabad" },
];

const InfiniteScroll = () => {
  return (
    <div className="max-w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start flex-shrink-0 [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        {COLLEGE_LOGOS.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} alt={logo.alt} height={100} width={100} />
          </li>
        ))}
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start flex-shrink-0 [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        {COLLEGE_LOGOS.map((logo, index) => (
          <li key={index}>
            <Image src={logo.src} alt={logo.alt} height={100} width={100} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteScroll;
