var dataTypeSource = [
  "int",
  "text",
  "number",
  "auto number",
  "varchar",
  "date",
  "datetime",
  "checkbox",
  "picklist",
];

$(document).ready(function () {

    function indexrenderer(row, columnfield, value) {
        return '<span style="float: left; width: 100%; height: 100%; justify-content: center; align-items: center; display: inline-flex;">' + (value + 1) + '</span>';
    }

    function actioncreatewidget (row, column, value, htmlElement) {
        var rowData = row.bounddata;
        var button = $("\
            <div class='dropdown customActionDropdownCls'>\
                <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>\
                <div class='dropdown-menu dropdown-menu-right'></div>\
            </div>");
        $(htmlElement).append(button);

        var html = '\
        <a href="javascript:;" class="dropdown-item single-delete-btn" p1='+rowData.id+'>Delete</a>';
        $(htmlElement).find('.dropdown-menu')[0].innerHTML = html;

        appendDropDownMenuToBody();
    }

    function actioninitwidget (row, column, value, htmlElement) {
        var rowData = $("#maxad_email_blast_list_recipients").jqxGrid('getrowdata', row);
        var button = $("\
            <div class='dropdown customActionDropdownCls'>\
                <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button>\
                <div class='dropdown-menu dropdown-menu-right'></div>\
            </div>");
        $(htmlElement).append(button);

        var html = '\
        <a href="javascript:;" class="dropdown-item single-delete-btn" p1='+rowData.id+'>Delete</a>';
        $(htmlElement).find('.dropdown-menu')[0].innerHTML = html;

        appendDropDownMenuToBody();
    }

    var url = './nasdaq_vs_sp500.txt';
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

    var objectFieldsAdapter = new $.jqx.dataAdapter(source);

    $("#maxad_email_blast_list_recipients").on("bindingcomplete", function (event) {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });
    }); 

    $("#maxad_email_blast_list_recipients").jqxGrid($.extend(commonJQXGridOpt,
        {
            pagesize: 500,
            pagesizeoptions:['500', '1000', '2000', '5000', '10000'],
            autorowheight: false,
            selectionmode: 'checkbox',
            height: jqxGridHeight,
            source: objectFieldsAdapter,
            columns: [
                { text: 'Date', datafield: 'Date', cellsformat: 'D', width: 250},
                { text: 'S&P 500', datafield: 'S&P 500', width: 300, cellsformat: 'f' },
                { text: 'NASDAQ', datafield: 'NASDAQ', cellsformat: 'f' }         
            ]
        })
    );
});