import {
    Float,
    OrbitControls,
    Stage,
    Stars,
    Text,
    MeshReflectorMaterial,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
    Bloom,
    DepthOfField,
    EffectComposer,
    Glitch,
    Noise,
    Vignette,
} from "@react-three/postprocessing";
import React, { useMemo, useState } from "react";
import { Vector2, Vector3 } from "three";
import { randFloatSpread } from "three/src/math/MathUtils";
import font from "../../assets/Anton-Regular.ttf";

export function PostProcessingDemo() {
    const [opt, setOpt] = useState<number>(6);
    return (
        <div className="demo-container-with-side">
            <div className="react-controls">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ix) => (
                    <React.Fragment key={ix}>
                        <h2 onClick={() => setOpt(ix)} key={ix}>
                            {ix}
                        </h2>
                        <br />
                    </React.Fragment>
                ))}
                <hr />
                Selected: {opt}
            </div>
            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <CubesSet numCubes={opt * 3} />
                    </Stage>
                    <Stars
                        radius={100}
                        depth={50}
                        count={2000}
                        factor={4}
                        saturation={0}
                        speed={0}
                    />

                    <mesh rotation-x={-Math.PI / 2} position-y={-5}>
                        <circleGeometry args={[15, 32]} />
                        <MeshReflectorMaterial
                            blur={[0, 0]} // Blur ground reflections (width, heigt), 0 skips blur
                            mixBlur={0.4} // How much blur mixes with surface roughness (default = 1)
                            mixStrength={0.7} // Strength of the reflections
                            mixContrast={0.4} // Contrast of the reflections
                            resolution={512} // Off-buffer resolution, lower=faster, higher=better quality, slower
                            mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                            // depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
                            // minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                            // maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
                            distortion={1} // Amount of distortion based on the distortionMap texture
                            // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
                            /*
                            0 = no debug
                            1 = depth channel
                            2 = base channel
                            3 = distortion channel
                            4 = lod channel (based on the roughness)
                            */
                            reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
                        />
                    </mesh>
                    {/* <Sparkles count={500} scale={10} size={5} speed={0.3} noise={0} /> */}
                    <EffectComposer>
                        <DepthOfField
                            focusDistance={0}
                            focalLength={0.02}
                            bokehScale={2}
                            height={480}
                        />
                        <Bloom
                            luminanceThreshold={0}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                        <Noise opacity={0.12} />
                        {/* https://docs.pmnd.rs/react-postprocessing/effects/glitch */}
                        <Glitch delay={new Vector2(5, 15)} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Canvas>
            </div>
        </div>
    );
}
interface CubesSetProps {
    numCubes: number;
}
function CubesSet(props: CubesSetProps) {
    function createParticles(n: number) {
        return collect(n, createParticle);
    }
    const particles = useMemo(
        () => createParticles(props.numCubes),
        [props.numCubes]
    );

    return (
        <group>
            {particles.map((p, ix) => (
                <group key={ix} position={p.pos}>
                    <Float speed={3}>
                        <mesh>
                            <meshStandardMaterial color={p.colour} />
                            <boxGeometry />
                        </mesh>

                        <Text
                            position-z={0.51}
                            font={font}
                            scale={2.5}
                            characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                        >
                            {p.word}
                        </Text>
                    </Float>
                </group>
            ))}
        </group>
    );
}
interface IParticle {
    pos: Vector3;
    vel: Vector3;
    colour: string;
    word: string;
}

function createParticle(): IParticle {
    const distFromCentre: number = Math.sqrt(Math.abs(randFloatSpread(1))) * 13;
    return {
        pos: new Vector3(0, 1, 0)
            .randomDirection()
            .multiplyScalar(distFromCentre),
        vel: new Vector3(0, 0, 0),
        colour: Math.random() < 0.1 ? "dodgerblue" : "tomato",
        word: randomName(),
    };
}

function randomName(): string {
    const consonants: string[] = "bcdfghjklmnpqrstvwxyz".split("");
    const verbs = "aeiou".split("");
    return (
        pick(consonants).toUpperCase() +
        pick(verbs) +
        pick(consonants) +
        pick(verbs) +
        pick(consonants)
    );
}
function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function collect<T>(num: number, createFn: (n: number) => T): T[] {
    let arr: T[] = [];
    for (let ix = 0; ix < num; ix++) {
        arr.push(createFn(ix));
    }
    return arr;
}
