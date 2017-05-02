var logs = [];
var logsFiltered = [];

$(document).ready(function () {
    initializeFilters();
    LoadLogs();
});

function initializeFilters() {
    if (predefinedFilterProperties.length === 0) {
        $("#predefinedFilter").hide();
        return;
    }

    var filterSelect = $("#predefinedProperty");

    for (var i = 0; i < predefinedFilterProperties.length; i++) {
        filterSelect.append("<option>" + predefinedFilterProperties[i] + "</option>");
    }
}

function LoadLogs() {
    var level = $("#logLevelFilter").val();

    if (level.length === $("#logLevelFilter option").length) {
        level = [];
    }


    $.getJSON("/Log/", $.param({ level: level },true))
        .fail(function () {
            console.error("Error loading log.");
        })
        .done(function (result) {
            logs = result;
            filterAndShowLogs();
        });
}

function filterAndShowLogs() {
    logsFiltered = filterLogs(logs);

    var template = $.templates("#logRowTmpl");
    var logTable = template.render({ logs: logsFiltered });
    $("#logTable tbody").html(logTable);

    $("#logTable tr").click(function () {
        var logId = +$(this).attr("data-logId");
        if (isNaN(logId)) {
            return;
        }

        var logEntry = logsFiltered.filter(function (log) {
            return log.id === logId;
        })[0];

        if (logEntry === null) {
            return;
        }

        var logModalTmpl = $.templates("#logModalTmpl");
        var logModalContent = logModalTmpl.render(logEntry);
        $("#logModal .modal-dialog").html(logModalContent);
        $("#logModal").modal("show");
    });
}

function filterLogs(logs) {
    var filteredLogs = [];

    var pFilterKey = $("#predefinedProperty").val();
    var pFilterVal = $("#pFilterValue").val();

    var filterKey = $("#filterKey").val();
    var filterVal = $("#filterValue").val();

    for (let i = 0; i < logs.length; i++) {
        if (pFilterVal !== null && pFilterVal.length > 0) {

            if ($(logs[i].properties).find("property[key='" + pFilterKey + "']").text() !== pFilterVal) {
                continue;
            }
        }

        if (filterVal !== null && filterVal.length > 0) {

            if ($(logs[i].properties).find("property[key='" + filterKey + "']").text() !== filterVal) {
                continue;
            }
        }

        filteredLogs.push(logs[i]);
    }

    return filteredLogs;
}