import React from 'react';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../utils/axios';

const MyChart = (props) => {
    const [data, setData] = useState({
        labels: [0],
        datasets: [
            {
                data: [],
                label: '',
                backgroundColor: ['#ed8e53'],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
            {
                data: [],
                label: '',
                backgroundColor: ['Black'],
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        async function getChartsValues(e) {
            const labelsSet = [];
            const comAporteSet = [];
            const semAporteSet = [];
            await axios
                .get(
                    `/simulacoes?tipoIndexacao=${props.param1}&tipoRendimento=${props.param2}`
                )
                .then((res) => {
                    for (const val of Object.keys(
                        res.data[0].graficoValores.comAporte
                    )) {
                        labelsSet.push(val);
                    }

                    const comAporteValues = JSON.stringify(
                        res.data[0].graficoValores.comAporte
                    );

                    JSON.parse(comAporteValues, (key, value) => {
                        comAporteSet.push(value);
                    });

                    const semAporteValues = JSON.stringify(
                        res.data[0].graficoValores.semAporte
                    );

                    JSON.parse(semAporteValues, (key, value) => {
                        semAporteSet.push(value);
                    });

                    setData({
                        labels: labelsSet,
                        datasets: [
                            {
                                label: 'Com aporte',
                                data: comAporteSet,
                                backgroundColor: ['#ed8e53'],
                                borderColor: 'rgba(0, 0, 0, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: 'Sem aporte',
                                data: semAporteSet,
                                backgroundColor: ['Black'],
                                borderColor: 'rgba(0, 0, 0, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                });
        }
        getChartsValues();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                    padding: 30,
                },
                position: 'bottom',
                align: 'center',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                stacked: true,
                title: {
                    display: true,
                    text: 'Tempo (meses)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Valor (R$)',
                },
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                },
                stacked: true,
            },
        },
    };

    return (
        <div>
            <Bar
                data={data}
                options={options}
                style={{
                    display: 'flex',
                    minWidth: '100%',
                    maxWidth: '100%',
                    flexWrap: 'wrap',
                }}
            />
        </div>
    );
};

export default MyChart;
