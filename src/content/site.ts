export const business = {
  name: "Lee Monarc",
  descriptor: "Accounting & Advisory",
  adviser: "Vivienne Lee",
  location: "Perth, Western Australia",
  phone: "0413 149 137",
  phoneHref: "tel:+61413149137",
  email: "vivienne@leemonarc.com.au",
};

// Service list from the revised copy deck (docs/LeeRevised September 2026.docx).
// href targets the deck-approved routes under /services/.
export const services = [
  {
    number: "01",
    title: "Accounting and compliance",
    short: "Keep the essentials in order.",
    description:
      "Keep your books, financial statements and tax returns in order, with reliable numbers to work from.",
    topics: ["Bookkeeping", "Financial statements", "Tax returns"],
    href: "/services/accounting-compliance",
  },
  {
    number: "02",
    title: "Tax planning and advice",
    short: "See tax coming.",
    description:
      "Plan ahead with advice that considers your business and personal goals.",
    topics: ["Planning ahead", "Business goals", "Personal goals"],
    href: "/services/tax-planning",
  },
  {
    number: "03",
    title: "Business structuring",
    short: "Check that your structure fits the plan.",
    description:
      "Starting up, bringing in an owner or changing direction? Check that your structure fits the plan.",
    topics: ["Starting up", "New owners", "Changing direction"],
    href: "/services/business-structuring",
  },
  {
    number: "04",
    title: "Fractional CFO and business advisory",
    short: "Guidance for the bigger calls.",
    description:
      "Understand performance and assess your next move with experienced financial guidance.",
    topics: ["Performance", "Cashflow", "Next moves"],
    href: "/services/fractional-cfo-advisory",
  },
  {
    number: "05",
    title: "Business acquisition and due diligence",
    short: "Ask the questions before you sign.",
    description:
      "Understand the financial opportunity and the questions to ask before buying a business.",
    topics: ["Opportunity", "Due diligence", "Questions to ask"],
    href: "/services/business-acquisition",
  },
  {
    number: "06",
    title: "Succession and exit planning",
    short: "Prepare for the day you step back.",
    description:
      "Prepare for the day you want to sell, step back or pass on what you’ve built.",
    topics: ["Selling", "Stepping back", "Passing it on"],
    href: "/services/succession-exit",
  },
];

export const perspectives = [
  {
    name: "Understand",
    label: "See where you stand.",
    text: "Start with the detail. Understand your numbers, your obligations and the questions that need a closer look.",
    focus: "Your numbers",
    caption: "A clear foundation",
  },
  {
    name: "Connect",
    label: "Bring the pieces together.",
    text: "Numbers mean more in context. Connect your financial position with the way your business works and the goals you are working towards.",
    focus: "Your business",
    caption: "A connected perspective",
  },
  {
    name: "Move forward",
    label: "Decide with perspective.",
    text: "Turn that understanding into a considered next step. Make the trade-offs visible and give your decisions a clearer direction.",
    focus: "Your direction",
    caption: "A considered next step",
  },
];
