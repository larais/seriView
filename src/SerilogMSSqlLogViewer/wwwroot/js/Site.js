var logs = [];
var logsFiltered = [];

$(document).ready(function () {
    initializeFilters();
    LoadLogs();
});

var isTop = false;

$(document).scroll(function (event) {
    if ($(document).scrollTop() > 50) {
        if (!isTop) {
            isTop = true;
            $("#filterColumn").fadeIn().css({ top: 40 }).animate({ top: 0 }, 50);
        }
    } else {
        $("#filterColumn").css("top", "");
        isTop = false;
    }
});

function initializeFilters() {
    $(".ui.dropdown").dropdown();

    if (predefinedFilterProperties.length === 0) {
        $("#predefinedFilter").hide();
    } else {
        var filterSelect = $("#predefinedProperty");

        for (var i = 0; i < predefinedFilterProperties.length; i++) {
            filterSelect.append("<option>" + predefinedFilterProperties[i] + "</option>");
        }
    }

    $("#filters").show();
}

function LoadLogs() {
    var level = $("#logLevelFilter").val();

    if (level.length === $("#logLevelFilter option").length) {
        level = [];
    }


    $.getJSON("/Log/", $.param({ level: level },true))
        .fail(function (jqXHR, textStatus, errorThrown) {
            $("#errorMessage .content").text(jqXHR.status + " " + jqXHR.statusText);
            $("#errorMessage").show();
            console.error(JSON.stringify(jqXHR));
        })
        .done(function (result) {
            $("#errorMessage").hide();
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
        $("#logModal .header").text("Log entry #" + logId);
        $("#logModal .content").html(logModalContent);
        showHideLogDetailModal(true);
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

function showHideLogDetailModal(show) {
    if (show) {
        $("#logModal").modal("show");
    } else {
        $("#logModal").modal("hide");
    }
}