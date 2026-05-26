import { PickupPointSelector } from "@/components/pickup-point-selector";

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Pickup Point Selector
        </h1>
        <p className="mt-2 text-slate-600">
          Search and select a pickup point on the map.
        </p>
        <PickupPointSelector />
      </section>
    </main>
  );
};

export default Home;
