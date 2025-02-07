@echo
rm -r /misapuntes/*/.history
rm -r /misapuntes/*/*/.history
rm -r /misapuntes/*/*/*/.history
git add *
git commit -m "subida de datos automática APUNTES"
git push
pause