'use client';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

const PieChartComponent = ({ data }) => {
    const size = {
        width: 500,
        height: 500,
    };
    return (
        <PieChart
        margin={{ top: 10, bottom: 10, left: 10, right:200 }}
        series={[
            {
                arcLabel: (item) => `${item.label} (${item.value})`,
                data: data,
                arcLabelMinAngle: 25,
            },
        ]}
        width={800}
        height={400}
        slotProps={
            {
                legend: {
                    direction: 'column',
                    position: { vertical: 'middle', horizontal: 'right' },
                    labelStyle: {
                        textWrap: 'wrap',
                        fill: 'white',
                    }
                }
            }
        }
        sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
                fontSize: 10,
            },
          }}
    />
    );
}

export default PieChartComponent;