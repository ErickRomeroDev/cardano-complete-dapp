"use client";

import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import { useEffect } from "react";

interface MidnightWrapperProps {
  children: React.ReactNode;
}

export const MidnightProvider = ({ children }: MidnightWrapperProps) => {
  useEffect(() => {
    const run = async () => {
      setNetworkId(NetworkId.TestNet);
    };
    run();
  }, []);

  return <>{children}</>;
};
