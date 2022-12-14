import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette } from '@react-three/postprocessing';
import { useMemo, useState } from 'react';
import { Vector2, Vector3 } from 'three';
import { lerp } from 'three/src/math/MathUtils';

function XmasTreeDemo() {

    return (
        <div className="canvas-container">
            <Canvas>
                <Stage>

                    <XmasTree />
                </Stage>

                <EffectComposer>
                    <Bloom luminanceThreshold={0.6} luminanceSmoothing={1} height={100} />
                    {/* https://docs.pmnd.rs/react-postprocessing/effects/glitch */}
                </EffectComposer>


                <OrbitControls autoRotate={true} autoRotateSpeed={0.3} rotateSpeed={1} />
            </Canvas>
        </div >
    )
}

export default XmasTreeDemo


export function XmasTree() {
    const [lightsAreOn, setLightsAreOn] = useState(false);

    return (
        <group onClick={() => setLightsAreOn(prev => !prev)}>
            <BaubleString startRadius={0.5} endRadius={0.23} rise={0.55} vertOffset={-0.45} areOn={lightsAreOn} />
            <BaubleString startRadius={0.3} endRadius={0.1} rise={0.3} vertOffset={0.3} areOn={lightsAreOn} />
            <mesh
                scale={[0.5, 1, 0.5]}
                position={[0, 0, 0]}
            >
                <coneGeometry />
                <meshStandardMaterial color={"green"} />
            </mesh>

            <mesh
                scale={[0.3, 0.6, 0.3]}
                position={[0, 0.5, 0]}
            >
                <coneGeometry />
                <meshStandardMaterial color={"green"} />
            </mesh>

            <mesh
                scale={[0.2, 0.5, 0.2]}
                position={[0, - 0.5, 0]}
            >
                <cylinderGeometry />
                <meshStandardMaterial color={"brown"} />
            </mesh>

        </group>

    );
}
interface BaubleStringProps {
    startRadius: number;
    endRadius: number;
    rise: number;
    vertOffset: number;
    areOn: boolean;
}

function BaubleString({ startRadius, endRadius, rise, vertOffset, areOn }: BaubleStringProps): JSX.Element {
    const baublePositions = computeBaublePositions(startRadius, endRadius, rise, vertOffset);

    function computeBaublePositions(startRadius: number, endRadius: number, totalRise: number, vertOffset: number): Vector3[] {
        const positions: Vector3[] = [];
        const angleStep = 10 * Math.PI / 90;
        const totalAngle = Math.PI * 4;
        const numSteps = totalAngle / angleStep;

        for (let angle = 0; angle <= totalAngle; angle += angleStep) {
            const progressionFrac = angle / totalAngle;
            const radius = lerp(startRadius, endRadius, progressionFrac);
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            const y = vertOffset + lerp(0, totalRise, progressionFrac);
            positions.push(new Vector3(x, y, z));
        }
        return positions;

    }
    function colourForIx(ix: number): string {
        const palette: string[] = ["red", "purple", "gold", "silver"];

        return palette[ix % palette.length];
    }
    return <group>
        {
            baublePositions.map((pos, ix) => (
                <Bauble key={ix} size={0.04} position={pos} isOn={areOn} colour={colourForIx(ix)} />
            ))
        }
    </group>;
}

interface BaubleProps {
    position: Vector3;
    size: number;
    isOn: boolean;
    colour: string;
}
function Bauble({ position, size, isOn, colour }: BaubleProps) {
    // const colour = useMemo(() => pick(["red", "purple", "gold", "silver"]), []);

    return (
        <mesh scale={size} position={position}>
            <sphereGeometry />
            <meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={isOn ? 1 : 0} />
        </mesh>)
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
