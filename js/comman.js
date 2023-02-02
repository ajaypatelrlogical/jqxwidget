var main_panel_height, commonJQXGridOpt, jqxGridHeight;

$(document).ready(function() {

	jqxGridHeight = 500; 

	commonJQXGridOpt = {
		width: '100%',
	  	columnsheight: 30,
	  	toolbarheight: 46,
	  	rowsHeight: 36,
	    altRows: true,
	    pageable: true,
	    pagerMode: 'advanced',
	    pagerButtonsCount: 10,
	    sortable: true,
	    columnsResize: true,
	    columnsReorder: true,
	    autoloadstate: true,
		autosavestate: true,
	    filterable: true,
	    filterbarmode: 'simple',
	    showfilterbar: true,
	    theme: "light",
	    localization:{
    		loadtext: "Please wait we are processing your data...",
     	},
	};


	var infotab = 0;
    if($('body').find('.info_tab').length > 0) {
        infotab = $('body').find('.info_tab').outerHeight();
    }
	
	if($(window).width() > 1400){
        var sidebarheight = $(window).height() - ($('body').find('.main-header').outerHeight(true) + infotab);
    } else {
        var sidebarheight = $(window).height() - ($('body').find('.main-header').outerHeight(true) + infotab + 1);
    }

    $('body').find('.wrapper .main-panel .content').height(sidebarheight - 20);
    $('body').find('.sidebar-wrapper.scrollbar-inner').height(sidebarheight);

    main_content_height = $('body').find('.wrapper .main-panel .content').height();

    $('[data-toggle="tooltip"]').tooltip({
		trigger: 'hover'
	});

    setTimeout(function() {
        $('body').find(".spinner-maincls.page").fadeOut("slow");
    }, 500);
});


function jqxGridHeaderAction(jqxGridID) {

	var grid_name = jqxGridID.replace("#", "");
	var date = new Date();
	var date_mmddyyyy = ("0" + (date.getMonth() + 1)).slice(-2)+"_"+("0" + date.getDate()).slice(-2).toString()+"_"+date.getFullYear();

	var exportFileName = grid_name+'_'+date_mmddyyyy;

	$('body').on('click', jqxGridID+'_columnAutoResizeBtn', function() {
        $(jqxGridID).jqxGrid('autoresizecolumns');
    });

    $('body').on('click', jqxGridID+'_columnHideShow', function() {
        $(jqxGridID).jqxGrid('openColumnChooser');
    });

    $('body').on('click', jqxGridID+'_excelExport', function() {
        $(jqxGridID).jqxGrid('exportdata', 'xlsx', exportFileName);           
    });
    $('body').on('click', jqxGridID+'_csvExport', function() {
        $(jqxGridID).jqxGrid('exportdata', 'csv', exportFileName);
    });
    $('body').on('click', jqxGridID+'_pdfExport', function() {
        $(jqxGridID).jqxGrid('exportdata', 'pdf', exportFileName);
    });

    
}

