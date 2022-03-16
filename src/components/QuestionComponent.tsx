import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { useQuestions } from "../hooks";
import { addAnswer } from "../state/quiz";
import { RootState } from "../state/store";
import { QuestionTypes } from "../types";
import { SingleChoice, MultipleChoice, InfoQuestion } from "./questions";

export function QuestionComponent() {
  const navigate = useNavigate();
  const params = useParams<{ questionId: string }>();
  const questionId = params.questionId && decodeURIComponent(params.questionId);

  const questions = useQuestions();
  const questionIndex = useMemo(
    () => questions.findIndex((q) => q.key === questionId),
    [questions, questionId]
  );

  const answers = useSelector((state: RootState) => state.quiz.answers);

  // NOTE: we need to perform check if we need to redirect from current question
  const isRedirectNeeded = useMemo(() => {
    // incorrect question key - redirect
    if (questionIndex === -1) {
      return true;
    }

    // TODO: we can add check for dependant question answer here
    if (questionIndex > 0 && !answers[questions[questionIndex - 1].key]) {
      return true;
    }

    return false;
  }, [questions, answers, questionIndex]);

  // NOTE: finding latest not yet answered question to redirect to
  const defaultQuestion = useMemo(() => {
    for (const question of questions) {
      if (!answers[question.key]) {
        return question;
      }
    }
    return questions[0];
  }, [questions, answers]);

  const dispatch = useDispatch();

  const onGoBack = () => {
    if (questionIndex > 0) {
      // TODO: in case we have dependant questions we can have logic here to select previous
      const prevQuestion = questions[questionIndex - 1];
      navigate(`/questions/${prevQuestion.key}`);
    } else {
      navigate("/");
    }
  };

  const onAnswer = (answer: string | string[]) => {
    if (!currentQuestion) {
      return;
    }

    dispatch(
      addAnswer({ questionKey: currentQuestion.key, answerValue: answer })
    );

    if (questionIndex < questions.length - 1) {
      // TODO: in case we have dependant questions we can have logic here to select next
      const nextQuestion = questions[questionIndex + 1];
      navigate(`/questions/${nextQuestion.key}`);
    } else {
      navigate("/result");
    }
  };

  if (isRedirectNeeded) {
    return <Navigate to={`/questions/${defaultQuestion.key}`} />;
  }

  const currentQuestion = questions[questionIndex];

  return (
    <Box h="100vh" w="100vw" d="flex" flexDir="column" alignItems="stretch">
      <Box
        d="flex"
        flexShrink={0}
        alignItems="center"
        justifyContent="space-between"
        py={[2, null, 4]}
        px={[6, null, "10vw"]}
        boxShadow="0px 8px 24px rgba(0, 0, 0, 0.04)"
      >
        <Button
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          onClick={onGoBack}
        >
          Back
        </Button>
        <Text>
          {questionIndex + 1} of {questions.length}
        </Text>
      </Box>
      <Box
        d="flex"
        flexGrow={1}
        p={4}
        alignItems={["stretch", null, "center"]}
        justifyContent={["flex-start", null, "center"]}
      >
        {currentQuestion.type === QuestionTypes.Single && (
          <SingleChoice question={currentQuestion} onAnswer={onAnswer} />
        )}
        {currentQuestion.type === QuestionTypes.Multiple && (
          <MultipleChoice question={currentQuestion} onAnswer={onAnswer} />
        )}
        {currentQuestion.type === QuestionTypes.Info && <InfoQuestion />}
      </Box>
    </Box>
  );
}
