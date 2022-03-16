import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import { QuestionComponent } from "./QuestionComponent";
import { StartScreen } from "./StartScreen";

export function Quiz() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <StartScreen />
          </Suspense>
        }
      />
      <Route
        path="questions/:questionId"
        element={
          <Suspense fallback={null}>
            <QuestionComponent />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
