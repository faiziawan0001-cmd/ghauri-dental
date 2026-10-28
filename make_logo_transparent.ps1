Add-Type -AssemblyName System.Drawing
$p = [System.Drawing.Bitmap]::FromFile("gdc-new.jfif")
$rect = New-Object System.Drawing.Rectangle(0,0,$p.Width,$p.Height)
$bmp = $p.Clone($rect,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$p.Dispose()
for($x=0;$x -lt $bmp.Width;$x++){
  for($y=0;$y -lt $bmp.Height;$y++){
    $c=$bmp.GetPixel($x,$y)
    if($c.R -ge 200 -and $c.G -ge 200 -and $c.B -ge 200){
      # check if near white
      if(($c.R+$c.G+$c.B) -gt 650){ # very bright
        $bmp.SetPixel($x,$y,[System.Drawing.Color]::Transparent)
      }
    }
  }
}
$bmp.Save("images/gdc-logo-nav-light.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("images/gdc-logo-on-light.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("images/gdc-logo-nav-dark.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("images/gdc-logo-on-dark.png",[System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

