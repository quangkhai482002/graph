import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ChartData {
  uData: number[];
  pData: number[];
  xData: number[];
  xLabels: string[];
}
const data: Record<string, ChartData> = {
  day: {
    uData: [400, 300, 200, 278, 189, 239, 349],
    pData: [240, 139, 980, 390, 480, 380, 430],
    xData: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
    xLabels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  },
  month: {
    uData: [4000, 3000, 2000, 2780, 1890, 2390, 3490, 240, 139, 980, 390, 480],
    pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300, 400, 300, 200, 278, 189],
    xData: [240, 139, 980, 390, 480, 380, 430, 2400, 1398, 9800, 3908, 4800],
    xLabels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  quater: {
    uData: [12000, 10000, 8000, 8300],
    pData: [7200, 5500, 29000, 11700],
    xData: [7200, 5500, 29000, 11700],
    xLabels: ["Q1", "Q2", "Q3", "Q4"],
  },
};

function Dashboard() {
  const [filter, setFilter] = useState<"day" | "month" | "quater">("month");
  const { uData, pData, xData, xLabels } = data[filter];

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as "day" | "month" | "quater");
  };

  const handleDownload = async () => {
    const chartElement = document.getElementById("chart-container");
    if (!chartElement) return;

    // Temporarily remove the background color
    const originalBackgroundColor = chartElement.style.backgroundColor;
    chartElement.style.backgroundColor = "transparent";

    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");

    // Restore the original background color
    chartElement.style.backgroundColor = originalBackgroundColor;

    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("chart.pdf");
  };

  return (
    <Box m="20px">
      <Box display="flex" alignItems="center">
        <Box
          id="chart-container"
          bgcolor="yellow"
          display={"flex"}
          justifyContent={"center"}
        >
          <BarChart
            width={500}
            height={300}
            series={[
              { data: pData, label: "pv", id: "pvId", stack: "total" },
              { data: uData, label: "uv", id: "uvId", stack: "total" },
              { data: xData, label: "xc", id: "xcId", stack: "total" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Box>
        <Box>abc</Box>
      </Box>

      <FormControl style={{ marginTop: "20px", minWidth: 120 }}>
        <InputLabel id="filter-select-label">Filter</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          value={filter}
          label="Filter"
          onChange={handleFilterChange}
        >
          <MenuItem value="quater">Quarter</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="day">Day</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={handleDownload}
      >
        Download
      </Button>
    </Box>
  );
}

export default Dashboard;
