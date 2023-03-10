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
    var data = new Array();
    var source =
    {
        localdata: data,
        datatype: "array",
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#grid").jqxGrid($.extend(commonJQXGridOpt,
        {
            pageable: false,
            showfilterbar: false,
            autorowheight: false,
            height: 500,
            source: dataAdapter,
            ready: function() {     
            },
            columns: [
                {
                    text: '#', menu: false, sortable: false, filterable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: 30, align: 'center', cellsalign: 'center',
                    cellsrenderer: function (index, datafield, value, defaultvalue, column, rowdata) {
                        return '<span style="float: left; width: 100%; height: 100%; justify-content: center; align-items: center; display: inline-flex;">' + (value + 1) + '</span>';
                    }
                },
                { text: 'CSV Header', dataField: 'csv_header' },
                { text: 'Object Header', dataField: 'object_header' },
                { text: 'Field Name', dataField: 'field_name' },
                { text: 'Data Type', dataField: 'datatype', columntype: "dropdownlist", 
                    createEditor: function (row, cellvalue, editor, cellText, width, height) {
                        editor.jqxDropDownList({autoDropDownHeight: true, source: dataTypeSource });
                    },
                    initEditor: function (row, cellvalue, editor, celltext, width, height) {
                        editor.jqxDropDownList('selectItem', cellvalue);
                    },
                    getEditorValue: function (row, cellvalue, editor) {
                        return editor.val();
                    }
                },
                { text: 'Length', dataField: 'length' },
                { text: 'Required', dataField: 'is_required' },
                { text: 'Nullable', dataField: 'is_nullable' },
                { text: 'Primary Email', dataField: 'is_primary_email' },
            ]
        })
    );

    $('body').on("click",".new_data_btn",function() {
        var header_array = [
            "Email",
            "First Name",
            "Last Name",
            "Middle Name",
            "Business Name",
            "Phone",
            "Mobile",
            "Website",
            "Account ID"
        ];
        refreshGridData(header_array);
    });
});

function refreshGridData(headerArr) {

    var data = new Array();

    for (var i = 0; i < headerArr.length; i++) {
        var row = {};
        row['csv_header'] = headerArr[i];
        row['object_header'] = "DropdownList";
        row['field_name'] = "Input";
        row['datatype'] = "DropdownList";
        row['length'] = "Input";
        row['is_required'] = "Checkbox";
        row['is_nullable'] = "Checkbox";
        row['is_primary_email'] = "Checkbox";
        data[i] = row;
    }

    var source =
    {
        localdata: data,
        dataType: "array",
    };

    var dataAdapter = new $.jqx.dataAdapter(source, { autoBind : true });

    $("#grid").jqxGrid({ 
        source: dataAdapter
    });
}