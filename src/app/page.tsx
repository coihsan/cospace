import Image from "next/image";
import Navbar from '@/components/global/navbar'
import { ContainerScroll } from '@/components/global/container-scroll-animation'
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { HeroParallax } from "@/components/global/connect-parallax";
import { LampComponent } from "@/components/global/lamp";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { CheckIcon } from "lucide-react";
import { clients, products } from '@/lib/constant'
export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col overflow-hidden">
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center  antialiased px-6">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            <Button
                  size={'lg'}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                    Get Started!
                  </span>
            </Button>
          <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Start For Free Today <br />
                <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none">
                Automate Your Work With Fuzzie
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/temp-banner.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        </div>
      </section>
    </main>
  );
}
