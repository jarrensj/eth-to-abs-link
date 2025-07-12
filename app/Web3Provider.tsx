'use client'

import { ReactNode } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    appName: "",
    appDescription: "",
    appUrl: ""
  }),
);

const queryClient = new QueryClient();

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider customTheme={{
          '--ck-primary-button-background': '#ff69b4',
          '--ck-primary-button-hover-background': '#ff85c2',
          '--ck-primary-button-text': '#fff',
          '--ck-primary-button-border': '#ff69b4',
        }}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};