import Orb from '../components/Orb';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Silk from "@/components/Silk";

// bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  

export default function Home() {
  return (

    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={10}
          scale={1}
          color="170123"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <main className="min-h-screen w-full justify-center">
        <div className="relative w-full h-[600px] flex items-center justify-center text-center">
          <div className="absolute inset-0 z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
          <h1 className="text-4xl text-white font-bold">
            Welcome to Resonix
          </h1>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
          Bridging Talent & Opportunity — Smarter, Faster, Fairer.
        </h1>
        <p className="text-lg md:text-xl text-center mt-4 text-gray-300 max-w-3xl mx-auto">
          Our AI-powered hiring platform connects skilled students with recruiters directly. Upload, apply, and stand out — no middlemen, just merit.
        </p>

        <div className='mt-10 flex items-center justify-center'>
          <CardContainer className="inter-var w-100 px-2">
            <CardBody className="group/card  bg-[#0f0117] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg max-w-md mx-auto  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white dark:text-white"
              >
                AI-Powered Resume Sorting
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Let AI do the hard work. Recruiters get sorted applicant lists based on custom skill requirements — in seconds.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUl8ZW58MHx8MHx8fDA%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>

            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var w-98 px-2">
            <CardBody className="group/card  bg-[#0f0117] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg max-w-md mx-auto  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white dark:text-white"
              >
                Real-Time Student Applications
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Students apply directly to job listings. No third parties, no delays — pure talent meets opportunity.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>

            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var w-100 px-2">
            <CardBody className="group/card  bg-[#0f0117] backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg max-w-md mx-auto  ">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white dark:text-white"
              >
                Dynamic Application Status
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Students get real-time updates — whether selected, rejected, or under review — right on their dashboard.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://plus.unsplash.com/premium_photo-1713967593106-202e5971416f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNlbGVjdGVkfGVufDB8fDB8fHww"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>

            </CardBody>
          </CardContainer>
          
        </div>







      </main>
    </div>
  );
}
