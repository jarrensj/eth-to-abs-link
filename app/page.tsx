import ConnectWallet from "./components/ConnectWallet";
import NeonSign from "./components/NeonSign";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <main className="container mx-auto text-center">
        <NeonSign />
        <ConnectWallet />
      </main>
    </div>
  );
}