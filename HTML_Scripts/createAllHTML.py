__author__ = 'Feist'
import csv
from quik import FileLoader

output_TOC_file_name_and_path = "./output/TOC.html"
output_TOC_file = open(output_TOC_file_name_and_path, "w")
output_TOC_file.write("")
output_TOC_file.close()

output_TOC_file = open(output_TOC_file_name_and_path, "a")

## ---------------- Write TOC
template_loader = FileLoader('templates')
#WRITE HEADER
template = template_loader.load_template('template_TOC_header.html')
output_TOC_file.write(template.render({'datarow': 0}, loader=template_loader).encode('utf-8'))

#WRITE TOC ITEMS
prev_depth = 0
timestamp = ""
inputFilePath = "E:\Apollo17.org\MISSION_DATA\Mission TOC.csv"
reader = csv.reader(open(inputFilePath, "rU"), delimiter='|')
for row in reader:
    timestamp = row[0]
    item_depth = row[1]
    item_title = row[2]
    item_subtitle = row[3]
    #item_URL = timestamp.translate(None, ":") + "_" + item_title.translate(None, ":/ .") + ".html"
    item_URL = "timeid" + timestamp.translate(None, ":")
    loader = FileLoader('templates')
    template = loader.load_template('template_TOC_item.html')
    output_TOC_file.write(template.render({'timestamp': timestamp, 'itemDepth': item_depth, 'prevDepth': prev_depth, 'itemTitle': item_title, 'itemSubtitle': item_subtitle, 'itemURL': item_URL}, loader=loader).encode('utf-8'))
    prev_depth = item_depth

#WRITE FOOTER
template = template_loader.load_template('template_TOC_footer.html')
output_TOC_file.write(template.render({'datarow': 0}, loader=template_loader).encode('utf-8'))


## -------------------- Write Utterance HTML
output_utterance_file_name_and_path = "./output/allUtterances.html"
outputUtteranceFile = open(output_utterance_file_name_and_path, "w")
outputUtteranceFile.write("")
outputUtteranceFile.close()

outputUtteranceFile = open(output_utterance_file_name_and_path, "a")

#WRITE HEADER
template = template_loader.load_template('template_header.html')
outputUtteranceFile.write(template.render({'datarow': 0}, loader=template_loader).encode('utf-8'))

#WRITE ALL UTTERANCE BODY ITEMS
cur_row = 0
input_file_path = "E:\Apollo17.org\MISSION_DATA\A17 master TEC and PAO utterances.csv"
utterance_reader = csv.reader(open(input_file_path, "rU"), delimiter='|')
for utterance_row in utterance_reader:
    cur_row += 1
    timeid = "timeid" + utterance_row[1].translate(None, ":")
    if utterance_row[1] != "": #if not a TAPE change or title row
        template = template_loader.load_template('template_timelineitem.html')
        outputUtteranceFile.write(template.render({'timeid': timeid, 'timestamp': utterance_row[1], 'who': utterance_row[2], 'words': utterance_row[3]}, loader=template_loader).encode('utf-8'))

#WRITE FOOTER
template = template_loader.load_template('template_footer.html')
outputUtteranceFile.write(template.render({'datarow': 0}, loader=template_loader).encode('utf-8'))