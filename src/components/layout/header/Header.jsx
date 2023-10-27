import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Styled Component
const StyledTodoTitle = styled(Typography)(() => ({
  marginBottom: "2rem" /* 32px */,
}));

// Main Component
const Header = () => {
  return (
    <Box>
      <StyledTodoTitle variant="h4" fontWeight="bold">
        #todo
      </StyledTodoTitle>
    </Box>
  );
};

export default Header;
