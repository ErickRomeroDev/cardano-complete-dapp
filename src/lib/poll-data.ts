interface PollOption {
  text: string; // Option text
  votes: number; // Number of votes for this option
}

interface Poll {
  id: string;
  deadline: string; // Deadline for the poll
  question: string; // Poll question
  action: "Vote Now" | "Awaiting Results" | "Poll Closed"; // Action status
  options: PollOption[]; // Array of poll options
}

export const mockPolls: Poll[] = [
  {
    id: "item-1",
    deadline: "Dec 01, 2023, 06:00 PM",
    question: "What is your favorite programming language?",
    action: "Vote Now",
    options: [
      { text: "JavaScript", votes: 42 },
      { text: "Python", votes: 36 },
      { text: "Java", votes: 18 },
    ],
  },
  {
    id: "item-2",
    deadline: "Nov 30, 2023, 12:00 PM",
    question: "Which framework do you prefer for frontend development?",
    action: "Awaiting Results",
    options: [
      { text: "React", votes: 50 },
      { text: "Vue", votes: 25 },
      { text: "Angular", votes: 15 },
      { text: "Svelte", votes: 10 },
      { text: "Vite", votes: 30 }
    ],
  },
  {
    id: "item-3",
    deadline: "Nov 29, 2023, 03:00 PM",
    question: "What is your preferred cloud provider?",
    action: "Poll Closed",
    options: [
      { text: "AWS", votes: 70 },
      { text: "Google Cloud", votes: 40 },
      { text: "Azure", votes: 30 },
    ],
  },
  {
    id: "item-4",
    deadline: "Dec 03, 2023, 10:00 AM",
    question: "Which database technology do you use the most?",
    action: "Vote Now",
    options: [
      { text: "MySQL", votes: 20 },
      { text: "PostgreSQL", votes: 35 },
      { text: "MongoDB", votes: 40 },
      { text: "SQLite", votes: 10 },
    ],
  },
  {
    id: "item-5",
    deadline: "Dec 05, 2023, 09:00 AM",
    question: "What is your preferred operating system?",
    action: "Awaiting Results",
    options: [
      { text: "Windows", votes: 25 },
      { text: "macOS", votes: 30 },
      { text: "Linux", votes: 45 },
    ],
  },
];
