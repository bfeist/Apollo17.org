//--------------- async page initialization calls ---------------

$.when(ajaxGetMediaIndex(),
    ajaxGetTOCAll(),
    ajaxGetCommentaryIndex(),
    ajaxGetUtteranceData(),
    ajaxGetPhotoIndex(),
    ajaxGetMissionStagesData(),
    ajaxGetVideoSegmentsData()).done(function(){
        // the code here will be executed when all ajax requests resolve and the video.js player has been initialized.
        gApplicationReady += 1;
        console.log("APPREADY: Ajax loaded: " + gApplicationReady);

        setTimeout(function(){
            populatePhotoGallery(); }
        ,1000);
    });

//--------------- index file handling --------------------

function ajaxGetMediaIndex() {
    return $.ajax({
        type: "GET",
        url: "./indexes/media_index.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processMediaIndexData(data);}
    });
}
function ajaxGetTOCAll() {
    return $.ajax({
        type: "GET",
        url: "./indexes/TOCall.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processTOCAllData(data);}
    });
}
function ajaxGetUtteranceData() {
    return $.ajax({
        type: "GET",
        url: "./indexes/utteranceData.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processUtteranceData(data);}
    });
}
function ajaxGetCommentaryIndex() {
    return $.ajax({
        type: "GET",
        url: "./indexes/commentaryIndex.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processCommentaryIndexData(data);}
    });
}
function ajaxGetPhotoIndex() {
    return $.ajax({
        type: "GET",
        url: "./indexes/photoIndex.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processPhotoIndexData(data);}
    });
}
function ajaxGetMissionStagesData() {
    return $.ajax({
        type: "GET",
        url: "./indexes/missionStages.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processMissionStagesData(data);}
    });
}
function ajaxGetVideoSegmentsData() {
    return $.ajax({
        type: "GET",
        url: "./indexes/video_segments.csv?stopcache=" + Math.random(),
        dataType: "text",
        success: function(data) {processVideoSegmentsData(data);}
    });
}
function processMediaIndexData(allText) {
    //console.log("processMediaIndexData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');

        var rec = [];
        rec.push(data[0]);
        rec.push(data[1]);
        rec.push(data[2]);
        rec.push(data[3]);
        gMediaList.push(rec);
    }
}
function processTOCAllData(allText) {
    //console.log("processTOCIndexData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gTOCAll.push(data);
            gTOCIndex[i] = data[0].split(":").join("");
        }
    }
}
function processUtteranceData(allText) {
    //console.log("processUtteranceData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gUtteranceData.push(data);
            gUtteranceDataLookup[data[0].split(":").join("")] = i;
            gUtteranceIndex[i] = data[0].split(":").join("");
        }
    }
}
function processCommentaryIndexData(allText) {
    //console.log("processCommentaryIndexData");
    gCommentaryIndex = allText.split(/\r\n|\n/);
}
function processPhotoIndexData(allText) {
    //console.log("processPhotoIndexData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        if (allTextLines[i] != "") {
            var data = allTextLines[i].split('|');
            gPhotoList.push(data);
            gPhotoLookup[data[0].split(":").join("")] = i;
            gPhotoIndex[i] = data[0];
        }
    }
}
function processMissionStagesData(allText) {
    //console.log("processMissionStagesData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gMissionStages.push(data);
        }
        if (i > 0) {
            gMissionStages[i - 1][3] = data[0]; //append this items start time as the last item's end time
        }
    }
    gMissionStages[gMissionStages.length - 1][3] = secondsToTimeStr(gMissionDurationSeconds); //insert last end time as end of mission
}
function processVideoSegmentsData(allText) {
    //console.log("processVideoSegmentsData");
    var allTextLines = allText.split(/\r\n|\n/);
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data[0] != "") {
            gVideoSegments.push(data);
        }
    }
}