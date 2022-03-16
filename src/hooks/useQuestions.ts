import useSWRImmutable from "swr/immutable";

import api from "../apis/api";

export const questionsSwrKey = "questions";
export function useQuestions() {
  const { data } = useSWRImmutable(questionsSwrKey, api, {
    suspense: true,
  });

  return data?.data.questions!;
}
