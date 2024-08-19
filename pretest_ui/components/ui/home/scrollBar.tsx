import React from "react";
import IITK from "../../../public/colleges/IITK.png";
import IIITL from "../../../public/colleges/IIITL.png";
import IIITR from "../../../public/colleges/IIITR.png";
import IIITU from "../../../public/colleges/IIITU.png";
import IITM from "../../../public/colleges/IITM.png";
import IITD from "../../../public/colleges/IITD.png";
import IITH from "../../../public/colleges/IITH.png";
import Image from "next/image";

const InfiniteScroll = () => {
  return (
    <div className=" max-w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start  flex-shrink-0 [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
        <li>
          <Image src={IITK} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITL} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITR} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITU} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITD} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITM} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITH} alt="IIT K" height={100} width={100} />
        </li>
      </ul>
      <ul
        className="flex items-center justify-center md:justify-start flex-shrink-0 [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
        aria-hidden="true"
      >
        <li>
          <Image src={IITK} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITL} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITR} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IIITU} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITD} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITM} alt="IIT K" height={100} width={100} />
        </li>
        <li>
          <Image src={IITH} alt="IIT K" height={100} width={100} />
        </li>
      </ul>
    </div>
  );
};

export default InfiniteScroll;
