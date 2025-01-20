import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface StatBoxProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  increase: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title,
  subtitle,
  icon,
  increase,
}) => {
  return (
    <Box width="100%" mx="30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5">{subtitle}</Typography>
        <Typography variant="h5" fontStyle="italic">
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
