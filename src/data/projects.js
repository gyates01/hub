export const projects = [
  {
    id: "finance-tracker",
    name: "Finance Tracker",
    description:
      "Personal finance dashboard. Tracks transactions, spending by category, and net worth across checking, savings, investments, and credit accounts.",
    tags: ["Node.js", "React", "SQLite", "Express"],
    liveUrl: "https://finance-tracker-production-a193.up.railway.app",
    githubUrl: "https://github.com/gyates01/finance-tracker",
    protected: true,
    accent: "#4ade80",
  },
  {
    id: "recipe-logger",
    name: "Recipe Logger",
    description:
      "Save and browse recipes by pasting a URL. Scrapes ingredients, instructions, and nutrition info automatically. Supports a pantry tracker.",
    tags: ["Python", "React", "SQLite", "Flask"],
    liveUrl: "https://shiny-enigma-production-ee0c.up.railway.app",
    githubUrl: null,
    protected: false,
    accent: "#f97316",
  },
  {
    id: "craps-simulator",
    name: "Craps Simulator",
    description:
      "Full craps table simulator with all standard bets, odds, and payout logic. Useful for learning the game or testing betting strategies.",
    tags: ["React", "Vite"],
    liveUrl: "https://craps-simulator-rose.vercel.app",
    githubUrl: null,
    protected: false,
    accent: "#a78bfa",
  },
  {
    id: "pc-tracker",
    name: "PC Tracker",
    description:
      "Tracks PC components, specs, and pricing. Useful for comparing build options and keeping a record of hardware over time.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://pc-tracker-orpin.vercel.app",
    githubUrl: "https://github.com/gyates01/pc-tracker",
    protected: false,
    accent: "#38bdf8",
  },
  {
    id: "claude-usage",
    name: "claude-usage",
    description:
      "CLI tool for tracking Anthropic API usage and costs. Queries local Claude Code session logs and outputs cost summaries by model and date.",
    tags: ["Python", "CLI"],
    liveUrl: null,
    githubUrl: "https://github.com/gyates01/claude-usage",
    protected: false,
    accent: "#e879f9",
  },
];
