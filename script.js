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
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year6" name="year6" placeholder="Tahun 6" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData6" name="originalData6" placeholder="Masukan Data 6" required>' +
            '</div>' +
            '</div>' +
            '<div class="input-group">' +
            '<div class="input-group-label">' +
            '<input type="text" id="year7" name="year7" placeholder="Tahun 7" required>' +
            '</div>' +
            '<div class="input-group-input">' +
            '<input type="text" id="originalData7" name="originalData7" placeholder="Masukan Data 7" required>' +
            '</div>' +
            '</div>' +
            '</form>',
        showCancelButton: true,
        confirmButtonText: 'OK',
        preConfirm: () => {
            calculateExponentialSmoothing();
        }
    });
}

function calculateExponentialSmoothing() {
  
    let year1 = parseFloat(document.getElementById('year1').value);
    let year2 = parseFloat(document.getElementById('year2').value);
    let year3 = parseFloat(document.getElementById('year3').value);
    let year4 = parseFloat(document.getElementById('year4').value);
    let year5 = parseFloat(document.getElementById('year5').value);
    let year6 = parseFloat(document.getElementById('year6').value);
    let year7 = parseFloat(document.getElementById('year7').value);

    let data1 = parseFloat(document.getElementById('originalData1').value);
    let data2 = parseFloat(document.getElementById('originalData2').value);
    let data3 = parseFloat(document.getElementById('originalData3').value);
    let data4 = parseFloat(document.getElementById('originalData4').value);
    let data5 = parseFloat(document.getElementById('originalData5').value);
    let data6 = parseFloat(document.getElementById('originalData6').value);
    let data7 = parseFloat(document.getElementById('originalData7').value);


    let alpha = 0.2;
    let smoothedData1 = data1;
    let smoothedData2 = alpha * data1 + (1 - alpha) * smoothedData1;
    let smoothedData3 = alpha * data2 + (1 - alpha) * smoothedData2;
    let smoothedData4 = alpha * data3 + (1 - alpha) * smoothedData3;
    let smoothedData5 = alpha * data4 + (1 - alpha) * smoothedData4;
    let smoothedData6 = alpha * data5 + (1 - alpha) * smoothedData5;
    let smoothedData7 = alpha * data6 + (1 - alpha) * smoothedData6;

    let predictedYear = year7 + 1;
    let predictedData = alpha * data7 + (1 - alpha) * smoothedData7;

    //perhitungan MAD
    let mad1 = Math.abs(data1 - smoothedData1);
    let mad2 = Math.abs(data2 - smoothedData2);
    let mad3 = Math.abs(data3 - smoothedData3);
    let mad4 = Math.abs(data4 - smoothedData4);
    let mad5 = Math.abs(data5 - smoothedData5);
    let mad6 = Math.abs(data6 - smoothedData6);
    let mad7 = Math.abs(data7 - smoothedData7);

    // Perhitungan MSE 
    let mse1 = Math.pow(data1 - smoothedData1, 2);
    let mse2 = Math.pow(data2 - smoothedData2, 2);
    let mse3 = Math.pow(data3 - smoothedData3, 2);
    let mse4 = Math.pow(data4 - smoothedData4, 2);
    let mse5 = Math.pow(data5 - smoothedData5, 2);
    let mse6 = Math.pow(data6 - smoothedData6, 2);
    let mse7 = Math.pow(data7 - smoothedData7, 2);

    // Perhitungan MAPE 
    let mape1 = (mad1 / data1) * 100;
    let mape2 = (mad2 / data2) * 100;
    let mape3 = (mad3 / data3) * 100;
    let mape4 = (mad4 / data4) * 100;
    let mape5 = (mad5 / data5) * 100;
    let mape6 = (mad6 / data6) * 100;
    let mape7 = (mad7 / data7) * 100;

    let madAverage = (mad1 + mad2 + mad3 + mad4 + mad5 + mad6 + mad7) / 7;
    let mseAverage = (mse1 + mse2 + mse3 + mse4 + mse5 + mse6 + mse7) / 7;
    let mapeAverage = (mape1 + mape2 + mape3 + mape4 + mape5 + mape6 + mape7) / 7;

   
    let tbody = document.getElementById('resultTableBody');
    let row = `<tr>
        <td>1</td>
        <td>${year1}</td>
        <td>${data1}</td>
        <td>${smoothedData1.toFixed(2)}</td>
        <td>${mad1.toFixed(2)}</td>
        <td>${mse1.toFixed(2)}</td>
        <td>${mape1.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>2</td>
        <td>${year2}</td>
        <td>${data2}</td>
        <td>${smoothedData2.toFixed(2)}</td>
        <td>${mad2.toFixed(2)}</td>
        <td>${mse2.toFixed(2)}</td>
        <td>${mape2.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>3</td>
        <td>${year3}</td>
        <td>${data3}</td>
        <td>${smoothedData3.toFixed(2)}</td>
        <td>${mad3.toFixed(2)}</td>
        <td>${mse3.toFixed(2)}</td>
        <td>${mape3.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>4</td>
        <td>${year4}</td>
        <td>${data4}</td>
        <td>${smoothedData4.toFixed(2)}</td>
        <td>${mad4.toFixed(2)}</td>
        <td>${mse4.toFixed(2)}</td>
        <td>${mape4.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>5</td>
        <td>${year5}</td>
        <td>${data5}</td>
        <td>${smoothedData5.toFixed(2)}</td>
        <td>${mad5.toFixed(2)}</td>
        <td>${mse5.toFixed(2)}</td>
        <td>${mape5.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>6</td>
        <td>${year6}</td>
        <td>${data6}</td>
        <td>${smoothedData6.toFixed(2)}</td>
        <td>${mad6.toFixed(2)}</td>
        <td>${mse6.toFixed(2)}</td>
        <td>${mape6.toFixed(2)}%</td>
    </tr>
    <tr>
        <td>7</td>
        <td>${year7}</td>
        <td>${data7}</td>
        <td>${smoothedData7.toFixed(2)}</td>
        <td>${mad7.toFixed(2)}</td>
        <td>${mse7.toFixed(2)}</td>
        <td>${mape7.toFixed(2)}%</td>
    </tr>
    <tr>
    <td>8</td>
    <td>${predictedYear}</td>
    <td>-</td>
    <td>${predictedData.toFixed(2)}</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    </tr>
    <tr>
    <td>Rata-Rata</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>${madAverage.toFixed(2)}</td>
    <td>${mseAverage.toFixed(2)}</td>
    <td>${mapeAverage.toFixed(2)}%</td>
</tr>`;
    ;
    tbody.innerHTML = row;
}

document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('resultTableBody').innerHTML = '';
});