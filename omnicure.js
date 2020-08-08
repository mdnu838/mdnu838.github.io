(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        },  {
            id: "fname",
            alias: "fname",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lname",
            alias: "lname",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "note",
            alias: "note",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "bdProviderId",
            alias: "bdProviderId",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "bdProviderName",
            alias: "bdProviderName",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "rdProviderId",
            alias: "rdProviderId",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "rdProviderName",
            alias: "rdProviderName",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "gender",
            alias: "gender",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dob",
            alias: "dob",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "dobDay",
            alias: "dobDay",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "dobMonth",
            alias: "dobMonth",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dobYear",
            alias: "dobYear",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "hospital",
            alias: "hospital",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "joiningTime",
            alias: "joiningTime",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "dischargeTime",
            alias: "dischargeTime",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "acceptTime",
            alias: "acceptTime",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "inviteTime",
            alias: "inviteTime",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "score",
            alias: "score",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "oxygenSupplement",
            alias: "oxygenSupplement",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "patientCondition",
            alias: "patientCondition",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "urgent",
            alias: "urgent",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dischargeMessage",
            alias: "dischargeMessage",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "status",
            alias: "status",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableInfo = {
            id: "omnicureFeed",
            alias: "omnicure data Feed",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        var mag = 0,
            title = "",
            url = "",
            lat = 0,
            lon = 0;

        $.getJSON("https://omnicure.appspot.com/_ah/api/commandCenterEndpoint/v1/patientlistresponse/gihg6786sei7ydghjbszeuyr876jhb4wkjy5h4w5n987z9dh/0/10000", function(resp) {
            var feat = resp.patientList,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                id = feat[i].id;
                name = feat[i].name;
                fname = feat[i].fname;
                lname = feat[i].lname;
                note = feat[i].note;
                bdProviderId = feat[i].bdProviderId;
                bdProviderName = feat[i].bdProviderName;
                rdProviderId = feat[i].rdProviderId;
                rdProviderName = feat[i].rdProviderName;
                gender = feat[i].gender;
                dob = feat[i].dob;
                dobDay = feat[i].dobDay;
                dobMonth = feat[i].dobMonth;
                dobYear = feat[i].dobYear;
                hospital = feat[i].hospital;
                joiningTime = feat[i].joiningTime;
                dischargeTime = feat[i].dischargeTime;
                acceptTime = feat[i].acceptTime;
                inviteTime = feat[i].inviteTime;
                score = feat[i].score;
                oxygenSupplement = feat[i].oxygenSupplement;
                patientCondition = feat[i].patientCondition;
                urgent = feat[i].urgent;
                dischargeMessage = feat[i].dischargeMessage;
                status = feat[i].status;


                tableData.push({
                    "id": id,
                    "name": name,
                    "fname": fname,
                    "lname": lname,
                    "note": note,
                    "bdProviderId": bdProviderId,
                    "bdProviderName": bdProviderName,
                    "rdProviderId": rdProviderId,
                    "rdProviderName": rdProviderName,
                    "gender": gender,
                    "dob": dob,
                    "dobDay": dobDay,
                    "dobMonth": dobMonth,
                    "dobYear": dobYear,
                    "hospital": hospital,
                    "joiningTime": joiningTime,
                    "dischargeTime": dischargeTime,
                    "acceptTime": acceptTime,
                    "inviteTime": inviteTime,
                    "score": score,
                    "oxygenSupplement": oxygenSupplement,
                    "patientCondition": patientCondition,
                    "urgent": urgent,
                    "dischargeMessage": dischargeMessage,
                    "status": status
                });

            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        translateButton();
        $("#submitButton").click(function() {
            tableau.connectionName = "Omnicure Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();

// Values attached to the tableau object are loaded asyncronously.
// Here we poll the value of locale until it is properly loaded
// and defined, then we turn off the polling and translate the text.
var translateButton = function() {
    var pollLocale = setInterval(function() {
        if (tableau.locale) {
            switch (tableau.locale) {
                case tableau.localeEnum.china:
                    $("#submitButton").text("获取地震数据");
                    break;
                default:
                    $("#submitButton").text("Get Omnicure Data!");
            }
            clearInterval(pollLocale);
        }
    }, 10);
};
