const About = () => {
  return (
    <div className="w-4/5 mx-auto text-white pt-20 pb-20 ">
        <p className="text-lg md:text-xl mb-10">
          Outside of work, you can find me:
        </p>
        <div className="flex flex-col gap-12">
          <div className="md:text-left">
            <h1 className="text-center text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
              Starting a <i>(hopefully)</i> long running career
            </h1>
            <p className="text-center text-sm md:text-base">Last race: BMO Half Marathon</p>
          </div>
          <div className="md:text-left">
            <h1 className="text-center text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
              Attending concerts
            </h1>
            <p className="text-center text-sm md:text-base">Last concert: Two Friends</p>
          </div>
          <div className="md:text-left">
            <h1 className="text-center text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2">
              Creating home and fashion content
            </h1>
            <p className="text-center text-sm md:text-base">Instagram: @camshomearchives</p>
          </div>
        </div>
    </div>
  );
};

export default About;

