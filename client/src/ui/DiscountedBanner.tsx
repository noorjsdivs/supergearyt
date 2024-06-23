import React from "react";
import Container from "./Container";
import Title from "./Title";
import { Link } from "react-router-dom";
import {
  brandFive,
  brandFour,
  brandOne,
  brandSix,
  brandThree,
  brandTwo,
  discountImgOne,
  discountImgTwo,
} from "../assets";

const DiscountedBanner = () => {
  const popularSearchItems = [
    { title: "Smart Watches", link: "smartWatches" },
    { title: "Headphone", link: "headphones" },
    { title: "Cameras", link: "camerasAndPhotos" },
    { title: "Audio", link: "tvAndAudio" },
    { title: "Laptop & Computers", link: "computersAndLaptop" },
    { title: "Cell Phone", link: "cellPhones" },
  ];
  return (
    <Container>
      <div>
        <Title text="Popular Search" />
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="my-7 flex items-center flex-wrap gap-4">
        {popularSearchItems?.map(({ title, link }) => (
          <Link
            key={title}
            to={`/category/${link}`}
            className="border border-[px] border-gray-300 px-8 py-3 rounded-full capitalize font-medium hover:bg-black hover:text-white duration-200"
          >
            {title}
          </Link>
        ))}
      </div>
      <div className="w-full py-5 md:py-0 my-12 bg-[#f6f6f6] rounded-lg flex items-center justify-between overflow-hidden">
        <img
          src={discountImgOne}
          alt="discountedImgOne"
          className="hidden lg:inline-flex h-36"
        />
        <div className="flex flex-col flex-1 gap-1 items-center">
          <div className="flex items-center justify-center gap-x-3 text-xl md:text-4xl font-bold">
            <h2>Sony Headphone</h2>
            <Link
              to={"/product"}
              className="border border-red-600 px-4 py-2 text-xl md:text-3xl text-red-600 rounded-full"
            >
              Discount 20%
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            You’re out to play or stepping out to make
          </p>
        </div>
        <img
          src={discountImgTwo}
          alt="discountedImgTwo"
          className="hidden lg:inline-flex h-36"
        />
      </div>
      <div className="mt-7">
        <p className="font-bold text-2xl">Brands We Distribute</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-7">
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandOne}
              alt="brandOne"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandTwo}
              alt="brandTwo"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandThree}
              alt="brandThree"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandFour}
              alt="brandFour"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-r-0 border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandFive}
              alt="brandFive"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
          <div className="border border-gray-300 flex items-center justify-center px-6 py-2 cursor-pointer group">
            <img
              src={brandSix}
              alt="brandSix"
              className="w-36 h-auto group-hover:opacity-50 duration-200"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DiscountedBanner;
