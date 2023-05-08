import { Pie } from "react-chartjs-2";
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props={
    totalCounts: number | null;
    completedCounts: number | null;
}

export const PieChart = ({totalCounts, completedCounts}: Props) => {
    const data = {
        labels: ['Total Outstanding Action Items', 'Completed Action Items'],
        datasets: [
            {
                data: [totalCounts, completedCounts],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    '#1976d2',
                ],
            }
        ]
        
    }

    return ( 
        <Doughnut data={data} />
     );
}
 

