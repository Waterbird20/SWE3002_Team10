import { GridItem, GridItemProps } from '@chakra-ui/react';

export const FlexGridItem = ({ children, ...props }: GridItemProps) => {
  return (
    <GridItem display="flex" w="full" justifyContent="center" alignContent="center" {...props}>
      {children}
    </GridItem>
  );
};
