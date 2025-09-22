export default function About() {
  return (
    <section className="relative bg-black text-white" id="about">
      
     
      <div className="absolute left-0 top-4 hidden lg:block">
        <img src="/images/net.jpg" alt="Spiderweb" className="w-[12.5rem] h-[17.5rem] opacity-60" />
      </div>

      
      <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden lg:block">
        <img src="/images/Vector.png" alt="vector" className="w-[32.5rem] h-[7.5rem]" />
      </div>

      
      <div className="absolute right-0 top-80 -translate-y-1/2 transform hidden lg:block">
        <img src="/images/skeleton.png" alt="Skeleton" className="w-[18.5rem] h-[37.5rem] mt-[10rem] opacity-80" />
      </div>

      
      <div className="container py-40">
        <div className="mb-20 md:mb-12">
          <h2 className="font-jolly text-center text-red-700 text-5xl mb-6">
            About Genesis
          </h2>
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-poppins text-white mb-4 text-lg">
              GENESIS Is Much More Than Just A Team, It’s A Close-Knit Family. With A Diverse Group Of 50 Individuals, Each Bringing Their Own Set Of Skills And Experiences, The Connections They Share Go Far Beyond The Typical Work Relationship. From Managers To Supervisors To Executives, Everyone Comes Together With A Shared Vision And A Collective Purpose. GENESIS Is Built On Four Major Pillars: Technical, Sports, Cultural, And Social. But These Aren't Just Categories Or Labels, But Also — They’re A Reflection Of The Unique Passions And Interests That Each Team Member Brings.
            </p>
            <p className="font-poppins text-white text-lg">
              Some Are Creative Minds With A Knack For Design, Others Are Passionate Athletes, And Some Are Tech Experts. There Are Also Those Who Are Deeply Committed To Making A Social Impact. What Truly Makes GENESIS Stand Out, However, Is The Emotional Connection They Create With The People They Serve. Through Events Like Cultural Festivals That Unite Different Groups And Sports Activities That Promote Camaraderie And Healthy Competition, GENESIS Fosters A Strong Sense Of Community Among Students, Faculty, And Beyond.
            </p>
          </div>
        </div>

        {/* Three Icons Section */}
        <div className="mb-20">
          <div className="relative mx-auto max-w-3xl">
            <img 
              src="/images/spider_net.png"
              alt="Awakening Innovation, Meaning Connections, Forging Future Leaders" 
              className="w-full h-auto mx-auto mb-4" 
            />
            <div className="grid grid-cols-3 gap-50 text-center text-white">
              <span className="font-poppins">Awakening Innovation</span>
              <span className="font-poppins">Meaning Connections</span>
              <span className="font-poppins">Forging Future Leaders</span>
            </div>
          </div>
        </div>
        
        {/* About Hackman V8.0 Section */}
        <div className="relative py-16">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 transform hidden lg:block">
            <img src="/images/left_bat.png" alt="Bats" className="w-[25rem]" />
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 transform hidden lg:block">
            <img src="/images/right_bat.png" alt="Bats" className="w-[25rem]" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <h2 className="font-jolly font-bold text-red-700 text-5xl mb-10">
              About Hackman V8.0
            </h2>
            <div className="max-w-5xl mx-auto rounded-[3rem] bg-[#151515] p-13 shadow-lg">
              <p className="font-poppins text-white text-lg mb-2">
                Code. Create. Conquer The Dark.
              </p>

              <h1 className="font-nosifer-caps text-7xl mb-4 tracking-wider">
                HACKMAN 2025
              </h1>
              <p className="font-poppins text-[#747474] text-base mb-6">
                Our Grand Ritual, Hackman 2025, Rises From The Shadows As A 36-Hour Haunted Hackathon, Where<br />
                Restless Minds Gather To Code, Create, And Conquer The Dark. Guided By The Wisdom Of The Masters Of <br />
                The Craft, Participants Will Battle Sleepless Nights, Conjure Groundbreaking Ideas, And Fight For Wicked <br /> Prizes, Swag, And Eerie Goodies — Only The Brave Will Survive!
              </p>
              <button className="bg-[#fe772d] hover:bg-orange-600 text-2xl text-gray-900 font-bold py-3 px-[4rem] rounded-[1.5rem] transition-colors duration-300 cursor-pointer">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
