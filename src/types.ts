// NOTE: It seems icon and iconSize always come in pair, so I would to change custom prop to have next type
interface SuggestedCustomConfig {
  icon?: {
    key: string; // or url based on how we resolve where to fetch it from
    size: number;
  };
  deselectAll?: true;
}
// instead we have this
type OptionCustomConfig = {
  icon?: string;
  iconSize?: number;
  deselectAll?: true;
};

// or maybe we can define type better

interface IconConfig {
  icon: string;
  iconSize: number;
}

interface OtherCustomConfig {
  deselectAll?: true;
}

export interface QuestionOption {
  label: string;
  value: string;
  custom?: OptionCustomConfig;
}

export enum QuestionTypes {
  Single = "single",
  Multiple = "multiple",
  Info = "info",
}

interface QuestionBase {
  key: string;
  label: string;
  description?: string;
}

export interface SingleOptionQuestion extends QuestionBase {
  type: QuestionTypes.Single;
  options: QuestionOption[];
}

export interface MultipleOptionQuestion extends QuestionBase {
  type: QuestionTypes.Multiple;
  options: QuestionOption[];
}

export interface InfoQuestion extends QuestionBase {
  type: QuestionTypes.Info;
}

export type Question =
  | SingleOptionQuestion
  | MultipleOptionQuestion
  | InfoQuestion;

export interface ApiResponse {
  data: {
    name: string;
    slug: string;
    questions: Question[];
  };
}
