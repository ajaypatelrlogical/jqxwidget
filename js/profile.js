$(document).ready(function() {

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
          { text: 'Date', datafield: 'Date', cellsformat: 'D', width: 250},
          { text: 'S&P 500', datafield: 'S&P 500', width: 300, cellsformat: 'f' },
          { text: 'NASDAQ', datafield: 'NASDAQ', cellsformat: 'f' }         
        ]
    });

    $("#excelExport").jqxButton();
    $("#xmlExport").jqxButton();
    $("#csvExport").jqxButton();

 	$("#excelExport").click(function () {
        $("#grid").jqxGrid('exportdata', 'xlsx', 'jqxGrid');           
    });
    $("#xmlExport").click(function () {
    	$('#grid').jqxGrid('showloadelement');
	    let file = $("#grid").jqxGrid('exportdata', 'xls', null);
	    downloadFile(file, 'grid.xls');
	    $('#grid').jqxGrid('hideloadelement');
    });
    $("#csvExport").click(function () {
        $("#grid").jqxGrid('exportdata', 'csv', 'jqxGrid');
    });
});

$("#excelExport").click(function () {
    $('#grid').jqxGrid('showloadelement');
    let file = $("#grid").jqxGrid('exportdata', 'xls', null);
    downloadFile(file, 'grid.xls');
    $('#jqxGrid').jqxGrid('hideloadelement');
});

function downloadFile(xml, name = 'grid.xls') {
    var blob = new Blob([xml], {type: 'text/plain'});
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