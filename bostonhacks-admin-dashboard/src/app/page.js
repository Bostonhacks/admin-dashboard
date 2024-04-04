import Authentication from "@/components/LoginPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>BostonHacks </div>
      <Authentication />
      <Authentication />
      <Authentication />
      <Authentication />
    </main>
  );
}
