import Image from "next/image";
import { PickupPointSelector } from "@/components/pickup-point-selector";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-7xl">
        <div className="flex gap-2">
          <Image
            src="/bflogo.png"
            alt="BIGFISH"
            width={180}
            height={130}
            className="h-16 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              Pickup Point Selector
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Search and select a pickup point on the map.
            </p>
          </div>
        </div>
        <PickupPointSelector />
      </section>
    </main>
  );
};

export default Home;
