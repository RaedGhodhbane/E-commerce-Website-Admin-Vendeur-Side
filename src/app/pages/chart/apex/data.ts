import { ChartType } from './apex.model';

const columnlabelChart: ChartType = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    colors: ['#556ee6'],
    plotOptions: {
        bar: {
            dataLabels: {
                position: 'top', // top, center, bottom
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => {
            return val;
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['#304758']
        }
    },
    series: [{
        name: 'Somme de la vente',
        data: []
    }],
    xaxis: {
        categories: [],
        position: 'bottom',
        labels: {
            offsetY: -18,
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
            offsetY: -35,
        }
    },
    fill: {
        gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
        },
    },
    yaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            formatter: (val) => {
                return val;
            }
        }
    },
    title: {
        text: 'Revenu annuel de la vente',
        floating: true,
        offsetY: 320,
        align: 'center',
        style: {
            color: '#444'
        }
    },
};

export {
     columnlabelChart
};
