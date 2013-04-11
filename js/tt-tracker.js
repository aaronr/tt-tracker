$(document).ready(function() {
    var people = []
    var dates = []

    var process_graphs = function () {
        //alert("Got both people and dates back");
        pass;
    };


    var process_people = function (databack) {
        $.each(databack.feed.entry, function(index, value) {
            // Grab the people from the spreadsheet
            people.push(value.content.$t);
        });
	$('#people').html(people.toString());
        if (dates.length > 0) {
            process_graphs();
        }
    };
    var process_dates = function (databack) {
        $.each(databack.feed.entry, function(index, value) {
            // Grab the people from the spreadsheet
            dates.push(value.content.$t);
        });
	$('#dates').html(dates.toString());
        if (people.length > 0) {
            process_graphs();
        }
    };

    var people_url = "http://spreadsheets.google.com/feeds/cells/0AtXkFFQzkJ9xdDJ1cENXbHhWMFV2cTJ5eVhuVVdXTlE/1/public/basic?alt=json&min-row=2&min-col=1&max-col=1"
    var date_url = "http://spreadsheets.google.com/feeds/cells/0AtXkFFQzkJ9xdDJ1cENXbHhWMFV2cTJ5eVhuVVdXTlE/1/public/basic?alt=json&min-row=1&max-row=1&min-col=2"
    people_url = people_url + "&callback=?";
    date_url = date_url + "&callback=?";
    
    $.getJSON(people_url, process_people);
    $.getJSON(date_url, process_dates);

    $('#table1').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
    $('#example').dataTable( {
        "aaData": [
            /* Reduced data set */
            [ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X" ],
            [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C" ],
            [ "Trident", "Internet Explorer 5.5", "Win 95+", 5.5, "A" ],
            [ "Trident", "Internet Explorer 6.0", "Win 98+", 6, "A" ],
            [ "Trident", "Internet Explorer 7.0", "Win XP SP2+", 7, "A" ],
            [ "Gecko", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8, "A" ],
            [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A" ],
            [ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A" ],
            [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ],
            [ "Webkit", "Safari 1.3", "OSX.3", 312.8, "A" ],
            [ "Webkit", "Safari 2.0", "OSX.4+", 419.3, "A" ],
            [ "Webkit", "Safari 3.0", "OSX.4+", 522.1, "A" ]
            ],
        "aoColumns": [
            { "sTitle": "Engine" },
            { "sTitle": "Browser" },
            { "sTitle": "Platform" },
            { "sTitle": "Version", "sClass": "center" },
            {
                "sTitle": "Grade",
                "sClass": "center",
                "fnRender": function(obj) {
                    var sReturn = obj.aData[ obj.iDataColumn ];
                    if ( sReturn == "A" ) {
                        sReturn = "<b>A</b>";
                        }
                    return sReturn;
                    }
                }
            ]
    } );
});
