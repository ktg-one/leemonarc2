import type { Metadata } from "next";
import { WhoWeHelpClient } from "./who-we-help-client";
import "./who-we-help.css";

export const metadata: Metadata = {
  title: "Who We Help — Lee Monarc",
};

export default function WhoWeHelp() {
  return <WhoWeHelpClient />;
}
