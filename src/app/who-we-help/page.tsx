import type { Metadata } from "next";
import WhoWeHelpContent from "./who-we-help-content";

export const metadata: Metadata = {
  title: "Who We Help — Lee Monarc",
};

export default function WhoWeHelp() {
  return <WhoWeHelpContent />;
}
