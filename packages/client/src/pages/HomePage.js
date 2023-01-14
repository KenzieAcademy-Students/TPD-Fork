import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/handsWorking.jpg";

export default function HomePage(props) {
  return (
    <div className="bg-sky-900 h-screen flex flex-col items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-center mx-auto my-10">
        <img
          src={logo}
          className="w-full mt-4  sm:w- md:w-1/2 h-32 lg:h-48 rounded shadow-amber-500"
          alt="Logo"
        />
        <div className="w-full p-8 text-slate-800 bg-slate-300 rounded-lg shadow-lg my-10">
          <h3 className="text-center underline text-pink-800 font-semibold">
            Why Choose Total Product Design?
          </h3>
          <p className="my-2">
            Total Product Design (TPD) is a growing design agency that
            specialized in creating powerful, effective brands and web
            presences for businesses of all sizes.
          </p>
          <p className="my-2">
            Our team of experienced designers takes the time to
            understand your business, your goals, and your target
            audience, and we use this information to create a unique,
            tailored design that speaks directly to your audience.
          </p>
          <p className="my-2">
            In addition to our attention to detail and personalized
            approach, TPD is also known for our innovative and
            cutting-edge designs. We are always on the lookout for new
            trends and techniques, and we are not afraid to push the
            boundaries in order to create something truly special and
            memorable.
          </p>
          <p className="my-2">
            Overall, if you want a brand and web presence that truly
            stands out and gets results, TPD is the perfect choice.
            Contact us today to learn more about what we can do for
            your business.
          </p>
          <button className="bg-amber-500 text-pink-800 rounded-lg p-2">
            <Link to="/register">SIGN-UP</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
