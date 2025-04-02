window.addEventListener('DOMContentLoaded', async () => {
    async function fetchCSVData(filename) {
        const response = await fetch(`/static/assets/data/${filename}`);
        const data = await response.text();
        return Papa.parse(data, { header: true }).data;
    }

    async function renderCharts() {
        // GRU 데이터 로드 및 차트 그리기
        const gruData = await fetchCSVData('gru.csv');
        const gruWeeks = gruData.map(row => row['Week']);
        const gruPredicted = gruData.map(row => parseFloat(row['Predicted Production']));
        const gruActual = gruData.map(row => parseFloat(row['Actual Production']));

        const gruCtx = document.getElementById('gruChart').getContext('2d');
        new Chart(gruCtx, {
            type: 'line',
            data: {
                labels: gruWeeks,
                datasets: [
                    {
                        label: 'GRU 예측 생산량',
                        data: gruPredicted,
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        fill: true,
                    },
                    {
                        label: '실제 생산량',
                        data: gruActual,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        fill: true,
                    }
                ]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: '주차' } },
                    y: { title: { display: true, text: '생산량' } }
                }
            }
        });

        // Conv1D 데이터 로드 및 차트 그리기
        const convData = await fetchCSVData('conv1.csv');
        const convWeeks = convData.map(row => row['Week']);
        const convPredicted = convData.map(row => parseFloat(row['Predicted Production']));
        const convActual = convData.map(row => parseFloat(row['Actual Production']));

        const convCtx = document.getElementById('conv1Chart').getContext('2d');
        new Chart(convCtx, {
            type: 'line',
            data: {
                labels: convWeeks,
                datasets: [
                    {
                        label: 'Conv1D 예측 생산량',
                        data: convPredicted,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: true,
                    },
                    {
                        label: '실제 생산량',
                        data: convActual,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        fill: true,
                    }
                ]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: '주차' } },
                    y: { title: { display: true, text: '생산량' } }
                }
            }
        });
    }
        // XGBoost 데이터 로드 및 차트 그리기
        const xgboostData = await fetchCSVData('xgboost.csv');
        const xgboostWeeks = xgboostData.map(row => row['Week']);
        const xgboostPredicted = xgboostData.map(row => parseFloat(row['Predicted Production']));
        const xgboostActual = xgboostData.map(row => parseFloat(row['Actual Production']));

        const xgboostCtx = document.getElementById('xgboostChart').getContext('2d');
        new Chart(xgboostCtx, {
            type: 'line',
            data: {
                labels: xgboostWeeks,
                datasets: [
                    {
                        label: 'XGBoost 예측 생산량',
                        data: xgboostPredicted,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        fill: true,
                    },
                    {
                        label: '실제 생산량',
                        data: xgboostActual,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        fill: true,
                    }
                ]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: '주차' } },
                    y: { title: { display: true, text: '생산량' } }
                }
            }
        });

    renderCharts();
});
