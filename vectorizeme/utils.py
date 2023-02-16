#!/usr/bin/python3
import fitz
import cv2
import PIL
import os
import subprocess
import shutil
def create_dataset(fpath):
    counter=0
    if os.path.exists(fpath):
        l=os.listdir(fpath)
        l=[fpath+i for i in l]
        for i in l:
            doc=fitz.open(i)
            for j in doc:
                pix=j.get_pixmap()
                fname=str(counter)+'_drawing.png'
                pix.save('./dataset/processed/'+fname)
                counter+=1
            doc.close()

