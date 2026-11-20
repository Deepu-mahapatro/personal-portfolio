Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\deepu\.gemini\antigravity\brain\53f29305-e6ab-4354-a79e-3e075313ebb0\.user_uploaded\media_1795029768547_1963e36b.jpg"
$dstPath = "C:\Users\deepu\Downloads\PORTFOLIO\public\assets\hero-red-bg.jpg"

$src = [System.Drawing.Image]::FromFile($srcPath)
$canvas = New-Object System.Drawing.Bitmap 1920, 1080, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Fill base dark color (#07070a)
$baseBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 7, 7, 10))
$g.FillRectangle($baseBrush, 0, 0, 1920, 1080)
$baseBrush.Dispose()

# Draw subtle red atmospheric glow in background around center-right
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(800, -200, 1400, 1400)
$pbr = New-Object System.Drawing.Drawing2D.PathGradientBrush $path
$pbr.CenterColor = [System.Drawing.Color]::FromArgb(160, 120, 14, 20)
$pbr.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 7, 7, 10))
$g.FillPath($pbr, $path)
$pbr.Dispose()
$path.Dispose()

# Target rect for portrait: positioned on the right side, height = 1080
$targetW = [int](1080.0 * ($src.Width / [double]$src.Height))
$targetH = 1080
$targetX = 1920 - $targetW - 60
$targetY = 0

$g.DrawImage($src, $targetX, $targetY, $targetW, $targetH)

# Soft gradient blend over the left edge of the portrait so it blends seamlessly into the dark background
$blendRect = New-Object System.Drawing.Rectangle ($targetX - 10), 0, 260, 1080
$cDark = [System.Drawing.Color]::FromArgb(255, 7, 7, 10)
$cTrans = [System.Drawing.Color]::FromArgb(0, 7, 7, 10)
$mode = [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal

$blendBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ($blendRect, $cDark, $cTrans, $mode)
$g.FillRectangle($blendBrush, $blendRect)
$blendBrush.Dispose()

# Left side vignette where the text content sits (0 to 1100px)
$leftVigRect = New-Object System.Drawing.Rectangle 0, 0, 1050, 1080
$cLeftDark = [System.Drawing.Color]::FromArgb(240, 7, 7, 10)
$leftVigBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush ($leftVigRect, $cLeftDark, $cTrans, $mode)
$g.FillRectangle($leftVigBrush, $leftVigRect)
$leftVigBrush.Dispose()

$g.Dispose()
$src.Dispose()

# Save as high quality JPEG
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]95)
$canvas.Save($dstPath, $codec, $params)

# Also copy to dist/assets/hero-red-bg.jpg for sync
$distPath = "C:\Users\deepu\Downloads\PORTFOLIO\dist\assets\hero-red-bg.jpg"
if (Test-Path "C:\Users\deepu\Downloads\PORTFOLIO\dist\assets") {
    $canvas.Save($distPath, $codec, $params)
}

$canvas.Dispose()

Write-Output "Hero composite saved to $dstPath and $distPath successfully!"
