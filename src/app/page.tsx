/* Hallmark · macrostructure: editorial-paraform · theme: lee-monarc-luxury · genre: editorial
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * slop test: pass
 */
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { LightSections } from "@/components/home/light-sections";
import { DarkSections } from "@/components/home/dark-sections";

export const metadata: Metadata = { title: "Know what your next move means for your money — Lee Monarc" };

export default function Home() {
  return <main id="main" className="lm-home"><Hero /><LightSections /><DarkSections /></main>;
}
