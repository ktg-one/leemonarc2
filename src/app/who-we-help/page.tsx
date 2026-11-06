import type { Metadata } from "next";
import { WhoWeHelpView } from "./who-we-help-view";
import "./who-we-help.css";

export const metadata: Metadata = {
  title: "Who We Help — Lee Monarc",
};

export default function WhoWeHelp() {
  return <WhoWeHelpView />;
}
