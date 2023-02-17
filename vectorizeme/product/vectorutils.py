#!/usr/bin/python3
import fitz
import cv2 as cv
import PIL
import os
import subprocess
import shutil
import csv
import numpy as np
import pybboxes as pbx




def put_box(yolo_bbox):
    W, H = 842, 595  # WxH of the image
    nbx=pbx.convert_bbox(yolo_bbox, from_type="yolo", to_type="voc",image_size=(W,H))
    return nbx

def create_dataset(fpath='./uploads/'):
    counter = 0
    if os.path.exists(fpath):
        l = os.listdir(fpath)
        l = [fpath + i for i in l]
        for i in l:
            doc = fitz.open(i)
            for j in doc:
                pix = j.get_pixmap()
                fname = "drawing.png"
                pix.save("./input/" + fname)
                pix.save("./input/forcirc.png")

                counter += 1
            doc.close()


def get_lines(edges, img):

    lines_fh = open("./results/lines.csv", "w", newline="")
    writer = csv.writer(lines_fh)
    writer.writerow([" ", "x1", "y1", "x2", "y2"])
    lines = cv.HoughLinesP(
        edges,  # Input edge image
        1,  # Distance resolution in pixels
        np.pi / 180,  # Angle resolution in radians
        threshold=30,  # Min number of votes for valid line
        minLineLength=5,  # Min allowed length of line
        maxLineGap=5,  # Max allowed gap between line for joining them
    )
    for points in lines:
        # Extracted points nested in the list
        x1, y1, x2, y2 = points[0]
        cv.line(img,(x1,y1),(x2,y2),(0,255,0),1)
        l = ["Line",str(x1), str(y1), str(x2), str(y2)]
        writer.writerow(l)
    lines_fh.close()
    cv.imwrite('./results/lines_detected.png',img)


def get_circles(edges, img):
    gray_img = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    gray_img = cv.blur(gray_img, (3, 3))
    height, width = img.shape[:2]
    maxRadius = int(1.1 * (width / 26) / 2)  # 15.6
    minRadius = int(0.9 * (width / 26) / 2)  # 26

    circles = cv.HoughCircles(
        gray_img,
        cv.HOUGH_GRADIENT,
        1,
        minDist=2 * minRadius,
        param1=100,
        param2=42,
        minRadius=minRadius,
        maxRadius=maxRadius,
    )  # 75,55
    circles = np.uint16(np.around(circles))
    circles_fh = open("./results/circles.csv", "w", newline="")
    writer = csv.writer(circles_fh)
    circles_fh.write(" ,x,y,radius\n")
    for i in circles[0, 1:]:
        print(i)
        l = ["Circle",str(i[0]), str(i[1]), str(i[2])]
        cv.circle(img,(i[0],i[1]),i[2],(0,255,0),5)

        writer.writerow(l)
    circles_fh.close()
    cv.imwrite('./results/circles_detected.png',img)


def yolo_lights():
    os.system(
        "python3 /Users/jesherjoshua/Desktop/ML-Smart-App/gitrepo/MLSmartApp/vectorizeme/yolov5_lights/detect.py --weights /Users/jesherjoshua/Desktop/ML-Smart-App/gitrepo/MLSmartApp/vectorizeme/yolov5_lights/runs/train/yolo_lights15/weights/best.pt --img 1280 --conf 0.5 --source ./input/drawing.png --hide-conf --line-thickness 1 --save-txt --save-crop"
    )


def yolo_dimlines():
    os.system(
        "python3 /Users/jesherjoshua/Desktop/ML-Smart-App/gitrepo/MLSmartApp/vectorizeme/yolov5_dimlines/detect.py --weights /Users/jesherjoshua/Desktop/ML-Smart-App/gitrepo/MLSmartApp/vectorizeme/yolov5_dimlines/runs/train/yolo_dimlinesz/weights/best.pt --img 1280 --conf 0.5 --source ./input/drawing.png --hide-conf --line-thickness 1 --save-txt --save-crop"
    )

def txt2csv(mode='lights'):
    if mode=='lights':
        csv_fh = open("./results/lights.csv", "w", newline="")
        writer = csv.writer(csv_fh)
        csv_fh.write("name,x1,y1,x2,y2\n")
        fh=open('./results/lights.txt','r')
        for i in fh:
            l=i.split(' ')
            l[1:]=[float(i) for i in l[1:]]
#nc: 4
#names: ['CL', 'CS', 'DL', 'PL']

            if l[0] == '0':
                l[0]='CL'
            elif l[0]=='1':
                l[0]='CS'
            elif l[0]=='2':
                l[0]='DL'
            elif l[0]=='3':
                l[0]='PL'

            outs=list(put_box(tuple(l[1:])))
            outs.insert(0,l[0])
            print(list(outs))
            writer.writerow(outs)
        csv_fh.close()

    elif mode=='dimlines':
        csv_fh = open("./results/dimlines.csv", "w", newline="")
        writer = csv.writer(csv_fh)
        csv_fh.write(" ,x1,y1,x2,y2\n")
        fh=open('./results/dimlines.txt','r')
        for i in fh:
            l=i.split(' ')
            l[1:]=[float(i) for i in l[1:]]
#nc: 4
#names: ['CL', 'CS', 'DL', 'PL']

            if l[0] == '0':
                l[0]='Dimension Line'

            outs=list(put_box(tuple(l[1:])))
            outs.insert(0,l[0])
            print(list(outs))
            writer.writerow(outs)
        csv_fh.close()


 