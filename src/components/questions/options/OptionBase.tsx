import { Box, Image, Text } from "@chakra-ui/react";

export interface OptionBaseProps {
  isSelected?: boolean;
  icon?: string;
  iconSize?: number;
  label: string;
  endIcon: JSX.Element;
  onSelect(): void;
}

// TODO: make this component 'user-friendly': hover states, a11y, keyboard nav etc.
// TODO: add selected styles
export function OptionBase({
  icon,
  iconSize = 32,
  label,
  endIcon,
  onSelect,
}: OptionBaseProps) {
  return (
    <Box
      d="flex"
      w="100%"
      p={4}
      bg="white"
      border="1px solid rgba(33, 33, 33, 0.16)"
      borderRadius="8px"
      cursor="pointer"
      _hover={{ bg: "#e5e5e5" }}
      alignItems="center"
      onClick={onSelect}
    >
      <Box d="flex" alignItems="center" flexGrow={1} mr={4} overflow="hidden">
        {icon && (
          <Image
            flexShrink={0}
            mr={6}
            boxSize={`${iconSize}px`}
            // src={icon}
            src="/option-icon.svg"
          />
        )}
        <Text isTruncated>{label}</Text>
      </Box>
      <Box flexShrink={0}>{endIcon}</Box>
    </Box>
  );
}
