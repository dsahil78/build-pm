/** Mock data for dynamic sections. Replace with real API data post-launch. */

export const LIVE_STATS = [
  { label: "builders active this week", value: 128, icon: "fire" },
  { label: "products shipped this month", value: 23, icon: "rocket" },
  { label: "build sprints ongoing", value: 6, icon: "bolt" },
] as const;

export interface ShippedProject {
  project: string;
  builder: string;
  avatar: string;
  avatarBg: string;
  timeToShip: string;
  outcome: string;
}

export const SHIPPED_THIS_WEEK: ShippedProject[] = [
  {
    project: "AI PRD Generator",
    builder: "Amara K.",
    avatar: "AK",
    avatarBg: "#FF5733",
    timeToShip: "6 days",
    outcome: "120 users in first week",
  },
  {
    project: "Feedback Pulse",
    builder: "Yuki T.",
    avatar: "YT",
    avatarBg: "#378ADD",
    timeToShip: "11 days",
    outcome: "Adopted by 3 teams",
  },
  {
    project: "Sprint Retro Bot",
    builder: "Carlos R.",
    avatar: "CR",
    avatarBg: "#7F77DD",
    timeToShip: "5 days",
    outcome: "Open-sourced, 40 stars",
  },
  {
    project: "PM Interview Prep",
    builder: "Priya S.",
    avatar: "PS",
    avatarBg: "#1D9E75",
    timeToShip: "9 days",
    outcome: "800+ practice sessions",
  },
  {
    project: "Roadmap Canvas",
    builder: "Fatima A.",
    avatar: "FA",
    avatarBg: "#FFBD2E",
    timeToShip: "7 days",
    outcome: "Featured on Product Hunt",
  },
  {
    project: "User Story Mapper",
    builder: "Arjun M.",
    avatar: "AM",
    avatarBg: "#FF5733",
    timeToShip: "4 days",
    outcome: "Integrated by 2 startups",
  },
];

export interface BuilderProfile {
  name: string;
  handle: string;
  avatar: string;
  avatarBg: string;
  role: string;
  score: number;
  projects: number;
  streak: number;
  skills: string[];
}

export const MOCK_BUILDER: BuilderProfile = {
  name: "Amara Kofi",
  handle: "amara",
  avatar: "AK",
  avatarBg: "#FF5733",
  role: "Builder PM",
  score: 847,
  projects: 12,
  streak: 8,
  skills: ["AI/ML", "Developer Tools", "Growth"],
};

export interface MockProject {
  name: string;
  description: string;
  status: "shipped" | "in-progress" | "planning";
  builder: string;
  builderAvatar: string;
  builderBg: string;
  daysToShip: number;
  decisions: number;
  users: number;
  collaborators: number;
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    name: "AI Roadmap Generator",
    description: "Generate prioritized product roadmaps from user feedback using AI.",
    status: "shipped",
    builder: "Amara K.",
    builderAvatar: "AK",
    builderBg: "#FF5733",
    daysToShip: 6,
    decisions: 8,
    users: 120,
    collaborators: 4,
  },
  {
    name: "Feedback Pulse",
    description: "Real-time user sentiment tracking for product teams.",
    status: "shipped",
    builder: "Yuki T.",
    builderAvatar: "YT",
    builderBg: "#378ADD",
    daysToShip: 11,
    decisions: 5,
    users: 45,
    collaborators: 3,
  },
  {
    name: "Sprint Retro Bot",
    description: "Automated retrospective summaries and action items.",
    status: "in-progress",
    builder: "Carlos R.",
    builderAvatar: "CR",
    builderBg: "#7F77DD",
    daysToShip: 5,
    decisions: 3,
    users: 0,
    collaborators: 2,
  },
  {
    name: "PM Interview Prep",
    description: "Practice product sense and execution questions with AI feedback.",
    status: "shipped",
    builder: "Priya S.",
    builderAvatar: "PS",
    builderBg: "#1D9E75",
    daysToShip: 9,
    decisions: 6,
    users: 800,
    collaborators: 3,
  },
  {
    name: "Roadmap Canvas",
    description: "Visual roadmap builder with drag-and-drop prioritization.",
    status: "shipped",
    builder: "Fatima A.",
    builderAvatar: "FA",
    builderBg: "#FFBD2E",
    daysToShip: 7,
    decisions: 4,
    users: 65,
    collaborators: 5,
  },
  {
    name: "User Story Mapper",
    description: "Turn customer interviews into structured user stories automatically.",
    status: "in-progress",
    builder: "Arjun M.",
    builderAvatar: "AM",
    builderBg: "#FF5733",
    daysToShip: 4,
    decisions: 2,
    users: 0,
    collaborators: 2,
  },
];

export const PARTNER_STATS = [
  { label: "Active builders", value: "500+" },
  { label: "Products shipped / mo", value: "23" },
  { label: "Tools in ecosystem", value: "40+" },
  { label: "Avg. engagement", value: "4.2h/wk" },
] as const;

export const PARTNER_USE_CASES = [
  { metric: "20+", label: "build sprints using partner tools" },
  { metric: "85%", label: "organic adoption rate" },
  { metric: "48hr", label: "avg. time to first feedback" },
] as const;
