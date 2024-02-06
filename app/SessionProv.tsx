"use client"

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode
}

const ProvSes: React.FC<Props> = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default ProvSes;
