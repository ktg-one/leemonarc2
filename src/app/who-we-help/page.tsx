import type { Metadata } from "next";
import { WhoWeHelpClient } from "./who-we-help-client";

export const metadata: Metadata = {
  title: "Who We Help — Lee Monarc",
};

export default function WhoWeHelp() {
  return <WhoWeHelpClient />;
}
