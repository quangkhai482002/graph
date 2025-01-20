import { Box, useMediaQuery } from "@mui/material";
import StatBox from "../components/Statbox";
import { Email, PersonAdd, PointOfSale, Traffic } from "@mui/icons-material";

function Dashboard() {
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  return (
    <Box m="20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Statistic Items */}
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="11,361"
            subtitle="Email Sent"
            increase="+14%"
            icon={<Email sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            increase="+21%"
            icon={<PointOfSale sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            increase="+5%"
            icon={<PersonAdd sx={{ fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            increase="+43%"
            icon={<Traffic sx={{ fontSize: "26px" }} />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
