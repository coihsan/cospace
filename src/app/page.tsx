import Image from "next/image";
import Navbar from '@/components/global/navbar'

export default function Home(){
  return (
    <main className="flex items-center justify-center flex-col overflow-hidden">
      <Navbar />
      <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center  antialiased px-6">
        <div className="absolute inset-0 h-full w-full items-center -z-50 px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]" />
        <div className="flex flex-col items-center justify-center mt-44">
              <h1 className="text-4xl font-semibold">
                Start For Free Today <br />
                <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none">
                Automate Your Work With Fuzzie
                </span>
              </h1>
            <Image
            src={`/temp-banner.png`}
            alt="hero"
            height={720}
            width={900}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </div>
      </section>
    </main>
  );
}
