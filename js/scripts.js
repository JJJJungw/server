window.addEventListener('DOMContentLoaded', event => {
    // CSV 데이터를 가져와서 차트를 그리기 위한 함수
    async function fetchData() {
        const response = await fetch('/static/assets/data/finaldata.csv');
        const data = await response.text();
        const parsedData = Papa.parse(data, { header: true }).data;

        // 주차 및 각 데이터 추출
        const weeks = parsedData.map(row => row['주차']);

        // 생산량 데이터
        const production = parsedData.map(row => parseFloat(row['생산량']));

        // 환경 데이터 (내부 온도, 습도, CO2) - min, mean, max
        const inTpMin = parsedData.map(row => parseFloat(row['inTp_min']));
        const inTpMean = parsedData.map(row => parseFloat(row['inTp_mean']));
        const inTpMax = parsedData.map(row => parseFloat(row['inTp_max']));

        const inHdMin = parsedData.map(row => parseFloat(row['inHd_min']));
        const inHdMean = parsedData.map(row => parseFloat(row['inHd_mean']));
        const inHdMax = parsedData.map(row => parseFloat(row['inHd_max']));

        const inCo2Min = parsedData.map(row => parseFloat(row['inCo2_min']));
        const inCo2Mean = parsedData.map(row => parseFloat(row['inCo2_mean']));
        const inCo2Max = parsedData.map(row => parseFloat(row['inCo2_max']));

        return { weeks, production, inTpMin, inTpMean, inTpMax, inHdMin, inHdMean, inHdMax, inCo2Min, inCo2Mean, inCo2Max };
    }

    // Area Chart (생산량)
    async function renderAreaChart() {
        const { weeks, production } = await fetchData();
        const ctx = document.getElementById('myAreaChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks,
                datasets: [{
                    label: '생산량',
                    data: production,
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Week' } },
                    y: { title: { display: true, text: 'Production Yield' } }
                }
            }
        });
    }

    // Bar Chart (환경 데이터 - min, mean, max)
    async function renderBarChart() {
        const { weeks, inTpMin, inTpMean, inTpMax, inHdMin, inHdMean, inHdMax, inCo2Min, inCo2Mean, inCo2Max } = await fetchData();
        const ctx = document.getElementById('myBarChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeks,
                datasets: [
                    // 내부 온도 (min, mean, max)
                    {
                        label: '최저 내부 온도',
                        data: inTpMin,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    },
                    {
                        label: '평균 내부 온도',
                        data: inTpMean,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    },
                    {
                        label: '최고 내부 온도',
                        data: inTpMax,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    },
                    // 내부 습도 (min, mean, max)
                    {
                        label: '최저 내부 습도',
                        data: inHdMin,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)'
                    },
                    {
                        label: '평균 내부 습도',
                        data: inHdMean,
                        backgroundColor: 'rgba(255, 159, 64, 0.6)'
                    },
                    {
                        label: '최고 내부 습도',
                        data: inHdMax,
                        backgroundColor: 'rgba(255, 206, 86, 0.6)'
                    },
                    // 내부 CO2 (min, mean, max)
                    {
                        label: '최저 내부 CO2 ',
                        data: inCo2Min,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    },
                    {
                        label: '평균 내부 CO2 ',
                        data: inCo2Mean,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)'
                    },
                    {
                        label: '최고 CO2 ',
                        data: inCo2Max,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    }
                ]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Week' } },
                    y: { title: { display: true, text: 'Value' } }
                }
            }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        Papa.parse("/static/assets/data/finaldata.csv", {
            download: true,
            header: true,
            complete: function(results) {
                const tableBody = document.getElementById('data-table-body');
                results.data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row['연도']}</td>
                        <td>${row['주차']}</td>
                        <td>${row['inTp_min']}</td>
                        <td>${row['inTp_mean']}</td>
                        <td>${row['inTp_max']}</td>
                        <td>${row['inHd_min']}</td>
                        <td>${row['inHd_mean']}</td>
                        <td>${row['inHd_max']}</td>
                        <td>${row['inCo2_min']}</td>
                        <td>${row['inCo2_mean']}</td>
                        <td>${row['inCo2_max']}</td>
                        <td>${row['생산량']}</td>
                    `;
                    tableBody.appendChild(tr);
                });
                // DataTable을 초기화하여 검색, 정렬 기능 추가
                new simpleDatatables.DataTable("#datatablesSimple");
            }
        });
    });
    
    renderAreaChart();
    renderBarChart();
});
