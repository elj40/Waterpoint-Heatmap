

precision mediump float;

varying vec2 vTexCoord;

const int SOURCE_SPACE = 30;

uniform int sLength;
uniform vec2 sources[SOURCE_SPACE];
uniform float weights[SOURCE_SPACE];
uniform float fadeDistance;


void main() {
    vec4 RED = vec4(1.,0.,0.,1.);
    vec4 YELLOW = vec4(216./255., 246./255., 0.,1.);
    vec4 GREEN = vec4(0.,1.,0.,1.);
    vec4 ALPHA = vec4(GREEN.x,GREEN.y,GREEN.z,0.);

    vec2 uv = vTexCoord;

    float shortest = 2.;
    float totalDistance = 0.;
      for (int i = 0; i < SOURCE_SPACE; i++) {
        float dx = pow(sources[i].x-uv.x, 2.);
        float dy = pow(sources[i].y-uv.y, 2.);
        float dist = sqrt(dx+dy) * weights[i];

        totalDistance += dist;
        shortest = dist < shortest ? dist : shortest;
        if (i >= sLength-1) {break;}
    }

    float avgDist = totalDistance/float(sLength);
    avgDist = shortest;
    // vec4 myColor = vec4(1.0, 0.0, 0.0, 1.0);


    float v = avgDist/fadeDistance;

    vec4 col = (v < 0.333) ? mix(RED,YELLOW,v*3.) : (v < 0.666) ? mix(YELLOW,GREEN,v*3.-1.) : GREEN;
    gl_FragColor = col;
}