import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useState } from "react";

import { MultipleOptionQuestion, QuestionOption } from "../../types";

import { MultipleChoiceOption } from "./options";

interface MultipleChoiceProps {
  question: MultipleOptionQuestion;
  onAnswer(value: string[]): void;
}
// TODO: we can reduce amount of loops here
// TODO: support display of previous answer
export function MultipleChoice({ question, onAnswer }: MultipleChoiceProps) {
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([]);

  const onOptionSelect = (option: QuestionOption) => {
    setSelectedOptions((selectedOptions) => {
      if (selectedOptions.find((opt) => opt.value === option.value)) {
        return selectedOptions.filter((opt) => opt.value !== option.value);
      } else {
        if (option.custom?.deselectAll) {
          return [option];
        } else {
          return [
            ...selectedOptions.filter((opt) => !opt?.custom?.deselectAll),
            option,
          ];
        }
      }
    });
  };

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
          <MultipleChoiceOption
            isSelected={
              !!selectedOptions.find(
                (selectedOpt) => selectedOpt.value === opt.value
              )
            }
            key={opt.value}
            label={opt.label}
            icon={opt.custom?.icon}
            iconSize={opt.custom?.iconSize}
            onSelect={() => onOptionSelect(opt)}
          />
        ))}
        <Button
          w="100%"
          onClick={() => onAnswer(selectedOptions.map((opt) => opt.value))}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
}
