import ConnectWallet from "./components/ConnectWallet";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <main className="container mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">hi</h1>
        <ConnectWallet />
      </main>
    </div>
  );
}