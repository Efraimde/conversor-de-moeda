const apiKey = '98e746f105c3fa28d1a32698';
const apiUrl = 'https://api.exchangerate-api.com/v4/latest/';

document.getElementById('conversion-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const currency = document.getElementById('currency').value;

    try {
        const response = await fetch(`${apiUrl}BRL?apikey=${apiKey}`);
        const data = await response.json();
        const rate = data.rates[currency];
        const convertedAmount = (amount * rate).toFixed(2);
        const date = new Date().toLocaleDateString();

        document.getElementById('result').innerText = `R$ ${amount} é equivalente a ${convertedAmount} ${currency}`;

        updateChart(data.rates);
        updateHistory(amount, currency, convertedAmount, date);
    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        document.getElementById('result').innerText = 'Erro ao converter moeda. Por favor, tente novamente.';
    }
});

let chart;

function updateChart(rates) {
    const ctx = document.getElementById('conversionChart').getContext('2d');
    const labels = Object.keys(rates);
    const values = Object.values(rates);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Taxa de Câmbio',
                data: values,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateHistory(amount, currency, convertedAmount, date) {
    const historyDiv = document.getElementById('history');
    const historyItem = document.createElement('div');
    historyItem.innerText = `${date}: R$ ${amount} -> ${convertedAmount} ${currency}`;
    historyDiv.prepend(historyItem);
}
