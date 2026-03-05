import supabase from "./supabase-client.ts";
import {useEffect, useState} from "react";
import { Chart } from 'react-charts'

const Dashboard = () => {
    const [metrics, setMetrics] = useState([])


    useEffect(() => {
        let isMounted = true

        const fetchMetrics = async () => {
            const { data, error } = await supabase
                .from('sales_deals')
                .select('name, total:value.sum()')

            if (error) return

            console.log(data)
            if (isMounted) {
                setMetrics(data)
            }
        }

        fetchMetrics()

        return () => {
            isMounted = false
        }
    }, [])

    const primaryAxis = {
        getValue: (d) => d.primary,
        scaleType: 'band',
        padding: 0.2,
        position: 'bottom'
    }

    const y_max= () => {
       if( metrics.length > 0 ){
           const maxSum = Math.max(...metrics.map((m) => m.total));
           return maxSum + 2000;
       }

       return 5000;
    }

    const secondaryAxes = [
        {
            getValue: (d) => d.secondary,
            scaleType: 'linear',
            min: 0,
            max: y_max(),
            padding: {
                top: 20,
                bottom: 40
            }
        }
    ]

    const chartData =[{
        data: metrics.map((m) => ({
            primary: m.name,
            secondary: m.total
        }))
      }]


    console.log(chartData)


    return (
        <div className="dashboard-wrapper">
            <div className="chart-container">
                <h2>Total Sales This Quarter ($)</h2>

                <div style={{ flex: 1 }}>
                    <Chart options={{
                        data: chartData,
                        primaryAxis,
                        secondaryAxes,
                        type:'bar',
                        defaultColors:['#58d675'],
                        tooltip: {
                            show: false
                        }
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
