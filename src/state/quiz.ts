import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface QuizState {
  answers: { [key: string]: string | string[] };
}

const initialState: QuizState = {
  answers: {},
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addAnswer: (
      state,
      action: PayloadAction<{
        questionKey: string;
        answerValue: string | string[];
      }>
    ) => {
      state.answers[action.payload.questionKey] = action.payload.answerValue;
    },
    resetQuiz: (state) => {
      state.answers = {};
    },
  },
});

export const { addAnswer, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
