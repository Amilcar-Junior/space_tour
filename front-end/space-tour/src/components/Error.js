import { Link, NavLink } from "react-router-dom";

export default function Error() {
  return (
    <>
      <section className="home destinations">
        <div className="px-80 pt-80 grid grid-cols-1 gap-5 md:grid-cols-2 gap-10 xl:max-w-7xl xl:mx-auto">
          <article className="text-center md:text-left">
            <span className="block font-semibold tracking-widest text-4xl text-white md:text-5xl lg:text-6xl 2xl:text-7xl mb-10 mt-3">
              Page not Found
            </span>
            <h5 className="text-white text-3xl font-extralight text-gray-300 uppercase tracking-wider pb-10">
              Pess on buton to go home
            </h5>

            
          </article>
          <article className="text-center md:text-left pb-10">
              <button className="bg-white text-gray-900 font-bold uppercase text-2xl w-40 h-40 rounded-full shadow xl:h-52 xl:w-52 xl:text-4xl animate-pulse mt-10 md:mt-0">
                <Link
                  className="bg-white text-gray-900 font-bold uppercase text-2xl w-40 h-40 rounded-full shadow xl:h-52 xl:w-52 xl:text-4xl animate-pulse mt-10 md:mt-0"
                  to="/"
                >
                  Home
                </Link>
              </button>
            </article>
        </div>
      </section>
    </>
  );
}
