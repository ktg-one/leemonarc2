import fs from "node:fs";
import path from "node:path";

function main() {
  console.log("Checking Paraform structural compliance for Lee Monarc...");

  const homePath = path.join(process.cwd(), "src/app/page.tsx");
  if (!fs.existsSync(homePath)) {
    console.error("FAIL: src/app/page.tsx missing.");
    process.exit(1);
  }

  const homeContent = fs.readFileSync(homePath, "utf-8");
  if (!homeContent.includes("<Hero />") || !homeContent.includes("<LightSections />") || !homeContent.includes("<DarkSections />")) {
    console.error("FAIL: Homepage macrostructure must comprise <Hero />, <LightSections />, and <DarkSections />.");
    process.exit(1);
  }

  const heroPath = path.join(process.cwd(), "src/app/components/home/hero.tsx");
  const heroContent = fs.readFileSync(heroPath, "utf-8");

  if (!heroContent.includes("Know what your next move means for your money.")) {
    console.error("FAIL: Hero headline missing or invalid.");
    process.exit(1);
  }

  console.log("SUCCESS: Paraform layout structure and content rules passed!");
}

main();
