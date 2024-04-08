import Image from "next/image";
import DummyDataTable from "../components/DummyDataTable";
import EditApplicationButton from "../components/EditApplicationsButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>BostonHacks</div>
      <DummyDataTable />
    </main>
  );
}
