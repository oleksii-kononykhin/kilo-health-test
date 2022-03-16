import { ArrowForwardIcon } from "@chakra-ui/icons";
import { OptionBase, OptionBaseProps } from "./OptionBase";

interface SingleChoiceOptionProps extends Omit<OptionBaseProps, "endIcon"> {}

export function SingleChoiceOption(props: SingleChoiceOptionProps) {
  return <OptionBase {...props} endIcon={<ArrowForwardIcon />} />;
}
