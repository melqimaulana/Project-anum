function showForm() {
    Swal.fire({
        title: 'Tambah Data',
        html: '<form id="inputForm" class="form-layout">' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year1" name="year1" placeholder="Tahun 1" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData1" name="originalData1" placeholder="Masukan Data 1" required>' +
            '</div>' +
            '</div>' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year2" name="year2" placeholder="Tahun 2" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData2" name="originalData2" placeholder="Masukan Data 2" required>' +
            '</div>' +
            '</div>' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year3" name="year3" placeholder="Tahun 3" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData3" name="originalData3" placeholder="Masukan Data 3" required>' +
            '</div>' +
            '</div>' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year4" name="year4" placeholder="Tahun 4" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData4" name="originalData4" placeholder="Masukan Data 4" required>' +
            '</div>' +
            '</div>' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year5" name="year5" placeholder="Tahun 5" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData5" name="originalData5" placeholder="Masukan Data 5" required>' +
            '</div>' +
            '</div>' +
            '</form>',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        focusConfirm: false,

        preConfirm: () => {
            const years = [];
            const originalData = [];
            
            for (let i = 1; i <= 5; i++) {
                years.push(document.getElementById(`year${i}`).value);
                originalData.push(parseFloat(document.getElementById(`originalData${i}`).value));
            }

            const alpha = 0.2;
            const smoothedData = exponentialSmoothing(originalData, alpha);

            updateTable(years, originalData, smoothedData);
        }
    });
}

let nextPrediction = null;

function exponentialSmoothing(data, alpha) {
    const smoothedData = [];
    smoothedData[0] = data[0]; 

    for (let i = 1; i < data.length; i++) {
        smoothedData[i] = alpha * data[i] + (1 - alpha) * smoothedData[i - 1];
    }

    // Menghitung prediksi berikutnya
    nextPrediction = alpha * data[data.length - 1] + (1 - alpha) * smoothedData[data.length - 1];
    smoothedData.push(nextPrediction); 
    return smoothedData;
}

function updateTable(years, originalData, smoothedData) {
    const tableBody = document.querySelector('.table-data table tbody');

    // Kosongkan isi tabel
    tableBody.innerHTML = '';

    for (let i = 0; i < years.length; i++) {
        const MAD = calculateMAD(originalData[i], smoothedData[i]);
        const MSE = calculateMSE(originalData[i], smoothedData[i]);
        const MAPE = calculateMAPE(originalData[i], smoothedData[i]);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${years[i]}</td>
            <td>${originalData[i]}</td>
            <td>${smoothedData[i]}</td>
            <td>${MAD}</td>
            <td>${MSE}</td>
            <td>${MAPE}</td>
        `;
        tableBody.appendChild(row);
    }

    const nextRow = document.createElement('tr');
    const lastYear = parseInt(years[years.length - 1]) + 1;
    const lastOriginal = originalData[originalData.length - 1];
    const lastSmoothed = smoothedData[smoothedData.length - 1];
    const lastPrediction = nextPrediction;

    const MAD = calculateMAD(originalData, smoothedData);
    const MSE = calculateMSE(originalData, smoothedData);
    const MAPE = calculateMAPE(originalData, smoothedData);

    nextRow.innerHTML = `
        <td>${years.length + 1}</td>
        <td>${lastYear}</td>
        <td>-</td>
        <td>${lastPrediction}</td>
        <td>${MAD}</td>
        <td>${MSE}</td>
        <td>${MAPE}</td>
    `;
    tableBody.appendChild(nextRow);
}

function calculateMAD(originalData, smoothedData) {
    const n = originalData.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.abs(originalData[i] - smoothedData[i]);
    }
    return sum / n;
}

function calculateMSE(originalData, smoothedData) {
    const n = originalData.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.pow(originalData[i] - smoothedData[i], 2);
    }
    return sum / n;
}

function calculateMAPE(originalData, smoothedData) {
    const n = originalData.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += Math.abs((originalData[i] - smoothedData[i]) / originalData[i]);
    }
    return (sum / n) * 100; // 
}