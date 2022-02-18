import React from 'react';

// Imports chartjs
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// hooks
import { useState } from 'react';
import { useEffect } from 'react';

// Utils
import axios from '../../utils/axios';

const MyChart = (props) => {

    // Inicia estado do componente com valores padrões para o chartjs
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

    // Requisição a API
    useEffect(() => {
        async function getChartsValues(e) {

            // Arrays com valores da API
            const labelsSet = [];
            const comAporteSet = [];
            const semAporteSet = [];

            // Chamada a API
            await axios
                .get(
                    `/simulacoes?tipoIndexacao=${props.param1}&tipoRendimento=${props.param2}`
                )
                .then((res) => {
                    // Pega todos os valores e cria um array com os valores
                    for (const val of Object.keys(
                        res.data[0].graficoValores.comAporte
                    )) {
                        labelsSet.push(val);
                    }

                    // Converte os valores para string
                    const comAporteValues = JSON.stringify(
                        res.data[0].graficoValores.comAporte
                    );

                    // Pega todos os valores e cria um array com os valores
                    JSON.parse(comAporteValues, (key, value) => {
                        comAporteSet.push(value);
                    });

                    const semAporteValues = JSON.stringify(
                        res.data[0].graficoValores.semAporte
                    );

                    JSON.parse(semAporteValues, (key, value) => {
                        semAporteSet.push(value);
                    });

                    // Altera o estado do componente adicionando valores obitidos na API
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

        // Chamada da função
        getChartsValues();
    }, []);

    // Estilização do chartjs
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
