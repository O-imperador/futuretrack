export interface SavedRoadmap {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface CompletedQuiz {
  id: string;
  date: string;
  score?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}

export interface UserDashboardData {
  id: string;
  name: string;
  email: string;
  savedRoadmaps: SavedRoadmap[];
  completedQuizzes: CompletedQuiz[];
  achievements: Achievement[];
}

export interface AuthUser {
  email: string;
  password: string;
  userData: UserDashboardData;
}
interface EducationStep {
  level: string;
  focus: string;
}

export interface RoadmapData {
  career: string;
  description: string;
  skills: string[];
  education: EducationStep[];
  alternativePaths: string[];
  careerEntry: string[];
  careerAdvancement: string[];
  timelineYears: number;
}
