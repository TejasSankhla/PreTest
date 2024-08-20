import React, { Fragment } from "react";
import SearchBar from "@/components/constants/searchBar";
import ProfileCard from "@/components/ui/mentor/profileCard";
function page() {
  return (
    <Fragment>
      <div className="search-page-header">
        <div className="flex items-center justify-center search-bar-container py-8 md:py-12 bg-orange-50">
          <div className="search-input flex  items-center justify-center w-full mx-auto ">
            <SearchBar />
          </div>
        </div>
        <div className="search-result flex text-base font-semibold md:text-2xl gap-x-2 m-4 ">
          Showing <div className="totalMentors font-sans">125</div>
          Mentors
        </div>
      </div>
      <hr />
      <section className="max-w-full my-8 sm:my-12 flex overflow-hidden relative flex-col gap-y-4 sm:gap-y-12 justify-evenly md:flex-row flex-wrap ">
        <div className="mentor-profiles lg:w-5/12 shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
        <div className="mentor-profiles lg:w-5/12  shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
        <div className="mentor-profiles lg:w-5/12 shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
        <div className="mentor-profiles lg:w-5/12 shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
        <div className="mentor-profiles lg:w-5/12 shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
        <div className="mentor-profiles lg:w-5/12 shadow-inner  border-gray-900  hover:shadow-lg relative overflow-hidden">
          <ProfileCard />
        </div>
      </section>
    </Fragment>
  );
}

export default page;
