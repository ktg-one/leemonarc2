import type { Metadata } from "next";
import { WhoWeHelpContent } from "./who-we-help-content";
import "./who-we-help.css";

export const metadata: Metadata = {
  title: "Who We Help — Lee Monarc",
};

export default function WhoWeHelp() {
  return <WhoWeHelpContent />;
}
