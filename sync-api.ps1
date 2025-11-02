# Script to sync API files from project to XAMPP htdocs
# Run this after making changes to API files

$sourcePath = "d:\Development\Landing page Kulana\api"
$destPath = "C:\xampp\htdocs\kulana-api"

Write-Host "Syncing API files from project to XAMPP..." -ForegroundColor Cyan

# Copy all files
Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force

Write-Host "Sync completed!" -ForegroundColor Green
Write-Host ""
Write-Host "API files are now available at: http://localhost/kulana-api/" -ForegroundColor Yellow
