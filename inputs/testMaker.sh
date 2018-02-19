#!/bin/bash
echo $1' '$2>$3

for ((n=0;n<$1;n++));do
    echo -n ' '$(($RANDOM*10))>>$3;
done
