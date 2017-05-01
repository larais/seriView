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

    var f1 = $("#filter1Key");

    for (var i = 0; i < predefinedFilterProperties.length; i++) {
        f1.append("<option>" + predefinedFilterProperties[i] + "</option>");
    }
}

function LoadLogs() {
    $.getJSON("/Log/")
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

    var f1Key = $("#filter1Key").val();
    var f1Value = $("#filter1Value").val();

    for (let i = 0; i < logs.length; i++) {
        if (f1Value !== null && f1Value.length > 0) {

            if ($(logs[i].properties).find("property[key='" + f1Key + "']").text() !== f1Value) {
                continue;
            }
        }

        filteredLogs.push(logs[i]);
    }

    return filteredLogs;
}