@ECHO OFF
SET SrcDir="src"
SET DistFile="dist.zip"
 
@REM Try to delete the file only if it exists
IF EXIST %DistFile% del /F %DistFile%
 
@REM If the file wasn't deleted for some reason, stop and error
IF EXIST %DistFile% exit 1

powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::CreateFromDirectory('%SrcDir%', '%DistFile%'); }"

ECHO All done, refer: %DistFile%
pause