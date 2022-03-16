import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { OptionBase, OptionBaseProps } from "./OptionBase";

interface MultipleChoiceOptionProps extends Omit<OptionBaseProps, "endIcon"> {
  isSelected?: boolean;
}

export function MultipleChoiceOption(props: MultipleChoiceOptionProps) {
  return (
    <OptionBase
      {...props}
      endIcon={
        props.isSelected ? (
          <CheckCircleIcon />
        ) : (
          <Box boxSize={4} bg="grey" borderRadius="50%" />
        )
      }
    />
  );
}
