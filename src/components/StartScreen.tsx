import { Box, Button, Heading, Image } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../hooks";
import { resetQuiz } from "../state/quiz";

export function StartScreen() {
  const questions = useQuestions();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO: add logic to handle empty questions from server
  const firstQuestion = questions[0];
  const onStartQuiz = () => {
    if (!firstQuestion) {
      return;
    }
    dispatch(resetQuiz());
    navigate(`/questions/${encodeURIComponent(questions[0].key)}`);
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      d="flex"
      p="1.5rem"
      flexDir={["column-reverse", null, "row"]}
      gap="1.5rem"
      alignItems={"center"}
      justifyContent={["flex-end", null, "space-around"]}
    >
      <Box
        alignSelf={["stretch", null, "center"]}
        d="flex"
        flexDir="column"
        gap="1rem"
      >
        <Heading alignSelf={["center", null, "flex-start"]}>
          Get back in shape
        </Heading>
        <Button
          alignSelf={["stretch", null, "flex-start"]}
          onClick={onStartQuiz}
          isDisabled={!firstQuestion}
        >
          Start The Quiz
        </Button>
      </Box>
      <Image
        w={["100%", null, "50%"]}
        objectFit="cover"
        src="/start-icon.svg"
        alt="Dan Abramov"
        sx={{ aspectRatio: "6.4 / 5" }}
      />
    </Box>
  );
}
