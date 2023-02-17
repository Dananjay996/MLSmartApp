#!/usr/bin/python3
import fitz
import cv2 as cv
import PIL
import os
import subprocess
import shutil
import csv
import numpy as np
import vectorutils




vectorutils.create_dataset()

img=cv.imread('./input/drawing.png',cv.IMREAD_COLOR)
img=cv.rotate(img,rotateCode=cv.ROTATE_90_CLOCKWISE)
img_circ=cv.imread('./input/forcirc.png',cv.IMREAD_COLOR)
img_circ=cv.rotate(img_circ,rotateCode=cv.ROTATE_90_CLOCKWISE)
cv.imwrite('./input/drawing.png',img)
cv.imwrite('./input/forcirc.png',img_circ)

#img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
edges=cv.Canny(img,50,150,apertureSize=5)

vectorutils.get_lines(edges,img)
vectorutils.get_circles(edges,img_circ)
os.system('rm ./results/lights.txt')
vectorutils.yolo_lights()
os.system('rm ./results/dimlines.txt')
vectorutils.yolo_dimlines()

vectorutils.txt2csv(mode='lights')
vectorutils.txt2csv(mode='dimlines')
