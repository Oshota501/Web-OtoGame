import { Filter, GlProgram } from 'pixi.js';
import type { Ticker } from 'pixi.js';

// PixiJS v8のデフォルト頂点シェーダーを明示的に指定
const vertex = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void) {
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void) {
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void) {
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;

const fragment = `
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uBrightness;

void main(void) {
    vec4 color = texture(uTexture, vTextureCoord);
    finalColor = vec4(color.rgb * uBrightness, color.a);
}
`;

export class GameBarEffect extends Filter {
    private readonly darkBrightness: number;
    private elapsed = 0;
    private duration = 0;
    private running = false;

    private maxDarkness: number = 0.5;

    constructor(darkBrightness = 0.3) {
        const glProgram = new GlProgram({
            fragment,
            vertex,
        });

        super({
            glProgram,
            resources: {
                brightnessUniforms: {
                    uBrightness: { value: 1.0, type: 'f32' },
                },
            },
        });

        this.darkBrightness = darkBrightness;
    }

    private get uniforms(): { uBrightness: number } {
        return (this.resources.brightnessUniforms as { uniforms: { uBrightness: number } }).uniforms;
    }

    public start(d_time: number): void {
        this.duration = d_time;
        this.elapsed = 0;
        this.running = true;
        this.uniforms.uBrightness = this.darkBrightness;
    }

    public tick(ticker: Ticker): void {
        if (!this.running) return;

        this.elapsed += ticker.deltaMS / 1000;

        const t = this.duration > 0 ? Math.min(this.elapsed / this.duration, 1.0) : 1.0;
        this.uniforms.uBrightness = (this.darkBrightness + (1.0 - this.darkBrightness) * t) * this.maxDarkness + (1 - this.maxDarkness);

        if (t >= 1.0) {
            this.running = false;
        }
    }
}