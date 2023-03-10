$(document).ready(function () {

    var url = 'nasdaq_vs_sp500.txt';
    var source =
    {
        datatype: "csv",
        datafields: [
            { name: 'Date', type: 'date' },
            { name: 'S&P 500', type: 'float' },
            { name: 'NASDAQ', type: 'float' }
        ],
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid").jqxGrid(
        {
            width: '100%',
            source: dataAdapter,
            columnsresize: true,
            columns: [
                { text: 'Date', datafield: 'Date', cellsformat: 'D', width: 250 },
                { text: 'S&P 500', datafield: 'S&P 500', width: 300, cellsformat: 'f' },
                { text: 'NASDAQ', datafield: 'NASDAQ', cellsformat: 'f' }
            ]
        });

    $("#excelExport").jqxButton();
    $("#xmlExport").jqxButton();
    $("#csvExport").jqxButton();

    $("#excelExport").click(function () {
        $('#grid').jqxGrid('showloadelement');
        let file = $("#grid").jqxGrid('exportdata', 'xls', null);
        downloadFile(file, 'grid.xls');
        setTimeout(() => {
            $('#grid').jqxGrid('hideloadelement');
        }, 400)
    });
    $("#xmlExport").click(function () {
        $('#grid').jqxGrid('showloadelement');
        let file = $("#grid").jqxGrid('exportdata', 'xml', null);
        downloadFile(file, 'grid.xml');
        setTimeout(() => {
            $('#grid').jqxGrid('hideloadelement');
        }, 400)
    });
    $("#csvExport").click(function () {
        $('#grid').jqxGrid('showloadelement');
        let file = $("#grid").jqxGrid('exportdata', 'csv', null);
        downloadFile(file, 'grid.csv');
        setTimeout(() => {
            $('#grid').jqxGrid('hideloadelement');
        }, 400)
    });
});

function downloadFile(file, name = 'grid') {
    var blob = new Blob([file], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );
    document.body.removeChild(link);
}