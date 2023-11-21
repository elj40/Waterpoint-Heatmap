function xyToGrid(x,y)
{
    let gx = floor(x/SCALE);
    let gy = floor(y/SCALE);

    return [gx,gy]
}

function gridToXY(x,y) {
    return [x*SCALE,y*SCALE]
}