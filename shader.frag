precision mediump float;

varying vec2 vTexCoord;

uniform vec2 source;
uniform float fadeDistance;

void main() {

    vec4 RED = vec4(1.,0.,0.,1.);
    vec4 YELLOW = vec4(1.,1.,0.,1.);
    vec4 GREEN = vec4(0.,1.,0.,1.);


    vec2 uv = vTexCoord;
    // vec4 myColor = vec4(1.0, 0.0, 0.0, 1.0);
    float dx = pow(source.x-uv.x, 2.);
    float dy = pow(source.y-uv.y, 2.);
    float dist = sqrt(dx+dy);

    float v = dist/fadeDistance;

    vec4 col = (v < 0.333) ? mix(RED,YELLOW,v*3.) : (v < 0.666) ? mix(YELLOW,GREEN,v*3.-1.) : mix(GREEN,vec4(GREEN.x,GREEN.y,GREEN.z,0.), v*3.-2.);
    // vec4 addAlpha = mix(col, vec4(col.r, col.g, col.b, 0.), uv.x);
    gl_FragColor = col;
}