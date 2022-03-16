import { Box, Heading, VStack, Text } from "@chakra-ui/react";

import { SingleOptionQuestion } from "../../types";

import { SingleChoiceOption } from "./options";

interface SingleChoiceProps {
  question: SingleOptionQuestion;
  onAnswer(value: string): void;
}

export function SingleChoice({ question, onAnswer }: SingleChoiceProps) {
  return (
    <Box
      d="flex"
      flexDir="column"
      alignItems={["stretch", null, "center"]}
      w="100%"
      maxWidth="46rem"
    >
      <Heading>{question.label}</Heading>
      {question.description && (
        <Text mt={[2, null, 4]}>{question.description}</Text>
      )}
      <VStack mt={[4, null, 8]} spacing={2} w={["100%", null, "25rem"]}>
        {question.options.map((opt) => (
          <SingleChoiceOption
            key={opt.value}
            label={opt.label}
            icon={opt.custom?.icon}
            iconSize={opt.custom?.iconSize}
            onSelect={() => onAnswer(opt.value)}
          />
        ))}
      </VStack>
    </Box>
  );
}
