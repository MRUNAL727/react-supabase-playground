import supabase from "./supabase-client.ts";
import {useEffect, useState} from "react";
import { type AxisOptions, Chart } from 'react-charts'
import Form from "./Form.tsx";

interface Metric {
    name: string;
    total: number;
}

interface Datum {
    primary: string;
    secondary: number;
}

const Dashboard = () => {
    const [metrics, setMetrics] = useState<Metric[]>([])


    useEffect(() => {
        let isMounted = true

        const fetchMetrics = async () => {
            const { data, error } = await supabase
                .from('sales_deals')
                .select('name, total:value.sum()')

            if (error) return

            console.log(data)
            if (isMounted && data) {
                setMetrics(data as Metric[])
            }
        }

        fetchMetrics()

        const channel = supabase
            .channel('deal_changes')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'sales_deals'
            },
                (payload) => {
                  fetchMetrics()
                    const { new: newRecord, eventType} = payload;
                    const { name, value } = newRecord;

                    if(eventType === 'INSERT'){
                         console.log(name)
                        // do something here
                    }
                }
            ).subscribe();


        return () => {
            isMounted = false
            supabase.removeChannel(channel)
        }
    }, [])

    const primaryAxis: AxisOptions<Datum> = {
        getValue: (d) => d.primary,
        scaleType: 'band',
        position: 'bottom'
    }

    const y_max= () => {
       if( metrics.length > 0 ){
           const maxSum = Math.max(...metrics.map((m) => m.total));
           return maxSum + 2000;
       }

       return 5000;
    }

    const secondaryAxes: AxisOptions<Datum>[] = [
        {
            getValue: (d) => d.secondary,
            scaleType: 'linear',
            min: 0,
            max: y_max(),
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
                        defaultColors:['#58d675'],
                        tooltip: {
                            show: false
                        }
                    }}/>
                </div>
            </div>
            <Form metrics={metrics} />
        </div>
    );
};

export default Dashboard;
