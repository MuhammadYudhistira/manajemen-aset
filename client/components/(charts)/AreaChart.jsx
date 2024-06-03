'use client';
import { AreaChart } from '@tremor/react';

export default function AreaCharts() {
    const data = [
        {
            date: 'Jan',
            Value: 232000000,
        },
        {
            date: 'Feb',
            Value: 242000000,
        },
        {
            date: 'Mar',
            Value: 245000000,
        },
        {
            date: 'Apr',
            Value: 255000000,
        },
        {
            date: 'May',
            Value: 265000000,
        },
        {
            date: 'Jun',
            Value: 275000000,
        },
        {
            date: 'Jul',
            Value: 285000000,
        },
        {
            date: 'Aug',
            Value: 350000000,
        },
        {
            date: 'Sep',
            Value: 380000000,
        },
        {
            date: 'Oct',
            Value: 390000000,
        },
        {
            date: 'Nov',
            Value: 450000000,
        },
        {
            date: 'Dec',
            Value: 550000000,
        },
    ];

    const valueFormatter = (number) =>
        `${Intl.NumberFormat('us').format(number).toString()}`;
    return (
        <AreaChart
            className="h-80"
            data={data}
            index="date"
            categories={['Value']}
            colors={['black']}
            valueFormatter={valueFormatter}
            yAxisWidth={90}
            onValueChange={(v) => console.log(v)}
        />
    );
}