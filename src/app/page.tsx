'use client';

import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Image from "next/image";

const images = [
  '/img/TopProducts/Top-1.png',
  '/img/TopProducts/Top-2.png',
  '/img/TopProducts/Top-3.png',
];

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col mt-5">
      <div className="bg-[#F3F6FF] flex flex-col lg:flex-row justify-around items-center gap-10 px-4 py-10 overflow-hidden">
        {/* sec-1 */}
        <div className="p-10">
          <h1 className="font-bold text-6xl">Showcase Your</h1>
          <h1 className="font-bold text-6xl text-[#2E5FEB]">Best Sellers</h1>
          <p className="py-[30]">Upload stunning product images to feature your top-selling items and attract more customers.</p>
          <div 
            id="uploadContainer" 
            className="w-full max-w-md p-6 border-2 border-dashed 
            border-gray-300 hover:border-black/80 rounded-lg bg-white 
            text-center shadow-md 
            transition-all duration-500 ease-in-out
          data-[drag-active=true]:border-blue-500 data-[drag-active=true]:shadow-lg data-[drag-active=true]:shadow-blue-200/50"
            data-drag-active="false"
          >
            <i className="text-6xl text-gray-400 mb-5"><FontAwesomeIcon icon={faArrowUpFromBracket} /></i>
            <p className="text-xl font-bold text-gray-800 mb-2">Drop your product images here</p>
            <p className="text-sm text-gray-400 mb-8">or click to browse from your computer</p>
            <button 
              id="chooseFilesBtn" 
              className="bg-black text-white py-3 px-6 rounded-4xl text-base cursor-pointer 
                        transition-colors duration-200 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/80 focus:ring-opacity-50"
            >
              Choose Files
            </button>
            <input type="file" id="fileInput" multiple accept="image/*" className="hidden" />
          </div>
        </div>
        {/* sec-2 */}
        <div className="p-10">
          <div>
              <h1 className="font-bold text-2xl pb-[30]">Top Sale Products</h1>
              <div className="relative w-full max-w-sm">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  loop
                  centeredSlides
                  slidesPerView={1.5}
                  spaceBetween={30}
                  className="swiper-wrapper"
                >
                  {images.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                        <Image 
                          className="rounded-2xl mx-auto w-full h-auto"
                          src={src}
                          width={400}
                          height={400}
                          alt={`Slide ${index+1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
      </div>

      <div>
          <h1 className="my-5 text-center text-6xl">Featured Products</h1>
          <p className="mb-5 text-center">Discover our handpicked selection of premium products, curated just for you.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/Sigma.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">I don't fucking know</p>
              <p className="text-center mb-2">Sundown</p>
              <p className="text-center">$1, 4 ,1948</p>
            </div>

            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/Sigma.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">Sigma</p>
              <p className="text-center mb-2">Aung San</p>
              <p className="text-center">$1, 4 ,1948</p>
            </div>

            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/Sigma.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">Sigma</p>
              <p className="text-center mb-2">Aung San</p>
              <p className="text-center">$1, 4 ,1948</p>
            </div>

            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/slave.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">Slave</p>
              <p className="text-center mb-2">Nigger</p>
              <p className="text-center">$69</p>
            </div>

            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/slave.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">Slave</p>
              <p className="text-center mb-2">Nigger</p>
              <p className="text-center">$69</p>
            </div>

            <div className="shadow-lg rounded-2xl p-4 w-fit m-10 transform transition duration-300 hover:scale-105 cursor-pointer">
              <Image
                className="rounded-2xl"
                src="/img/slave.png"
                width={400}
                height={400}
                alt=""
              />
              <p className="text-center my-2">Slave</p>
              <p className="text-center mb-2">Nigger</p>
              <p className="text-center">$69</p>
            </div>
          </div>
      </div>
    </main>
  );
}