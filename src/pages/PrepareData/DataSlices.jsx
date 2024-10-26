import * as echarts from 'echarts/core';
import {
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Box, Input, Typography } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';
import { SliceInputs } from './SliceInputs';

export const DataSlices = () => {

    const ref = useRef(null)

    echarts.use([GridComponent, LegendComponent, BarChart, CanvasRenderer]);

    useEffect(() => {
        var myChart = echarts.init(ref.current);

        const rawData = [[1000], [-320], [220], [150], [820]];

        const totalData = [];

        for (let i = 0; i < rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < rawData.length; ++j) {
                sum += rawData[j][i];
            }
            totalData.push(sum);
        }

        const grid = {
            left: 500,
            right: 500,
            top: 100,
            bottom: 100
        };

        const series = [
            'Direct',
            'Mail Ad',
            'Affiliate Ad',
            'Video Ad',
            'Search Engine'
        ].map((name, nameIndex) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '60%',
                label: {
                    show: true,
                    formatter: (params) => params[0] + params[1] + '%'
                },
                data: rawData[nameIndex].map((data, dataIndex) =>
                    totalData[dataIndex] <= 0 ? 0 : data / totalData[dataIndex]
                )
            };
        });

        const option = {
            legend: {
                selectedMode: false
            },
            grid,
            yAxis: {
                type: 'value',
            },
            xAxis: {
                type: 'category',
                data: ['']
            },
            series
        };

        option && myChart.setOption(option);
    }, [])

    return (
        <Box display={'flex'} ml={20} >
            <Box ref={ref}></Box>
            <Box>
                <Typography textColor='rgba(0, 0, 0, 0.6)' fontSize={15} fontWeight={400}>
                    Слои
                </Typography>
                <SliceInputs />
            </Box>
        </Box>
    )
}