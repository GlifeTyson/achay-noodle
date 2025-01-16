import { Metadata } from "next";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    applicationName: "NoodleRestaurant",
    title: "A Chay - Noodle Restaurant",
    description: "Online landing page for A Chay - Noodle Restaurant",
  };
}
export default function LandingPageLayout({ children }: Props) {
  return <div className="">{children}</div>;
}
