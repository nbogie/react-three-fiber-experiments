import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useMemo, useState } from 'react';
import { Vector3 } from 'three';
import { lerp, randFloat } from 'three/src/math/MathUtils';

function XmasTreeDemo() {

    return (
        <div className="canvas-container">
            <Canvas>
                <Stage>
                    <XmasTree />
                </Stage>

                {/* https://docs.pmnd.rs/react-postprocessing/ */}
                <EffectComposer>
                    <Bloom luminanceThreshold={0.6} luminanceSmoothing={1} height={100} />
                </EffectComposer>


                <OrbitControls autoRotate={true} autoRotateSpeed={0.5} rotateSpeed={1} />
            </Canvas>
        </div >
    )
}

export default XmasTreeDemo


export function XmasTree() {
    const [lightsAreOn, setLightsAreOn] = useState(false);

    return (
        <group >
            <BaubleString startRadius={0.5} endRadius={0.23} rise={0.55} vertOffset={-0.45} areOn={lightsAreOn} />
            <BaubleString startRadius={0.27} endRadius={0.12} rise={0.3} vertOffset={0.3} areOn={lightsAreOn} />
            <group onClick={() => {
                setLightsAreOn(prev => !prev)
            }}>


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
                    scale={[0.11, 0.5, 0.11]}
                    position={[0, - 0.5, 0]}
                >
                    <cylinderGeometry />
                    <meshStandardMaterial color={"brown"} />
                </mesh>
            </group>

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
    const baublePositions = useMemo(() => computeBaublePositions(startRadius, endRadius, rise, vertOffset), []);

    function computeBaublePositions(startRadius: number, endRadius: number, totalRise: number, vertOffset: number): Vector3[] {
        const positions: Vector3[] = [];
        const angleStep = 10 * Math.PI / 90;
        const totalAngle = Math.PI * 4;
        //Angle between baubles should increase as the radius narrows.
        //Really, we want to space by a fixed *string travel distance* (partial circumference of the spiral)
        //  rather than a fixed *angle*
        for (let angle = 0; angle <= totalAngle; angle += angleStep * randFloat(0.9, 1.1)) {
            const progressionFrac = angle / totalAngle;
            const radius = lerp(startRadius, endRadius, progressionFrac);
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            const y = vertOffset + lerp(0, totalRise, progressionFrac);
            const randomOffset = new Vector3(1, 1, 1).randomDirection().multiplyScalar(randFloat(0.01, 0.02))
            positions.push(new Vector3(x, y, z).add(randomOffset));
        }
        return positions;

    }
    function colourForIx(ix: number): string {
        const palette: string[] = ["red", "purple", "gold"];

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
        // <Float floatIntensity={0.1} >
        <mesh scale={size} position={position}>
            <sphereGeometry />
            <meshStandardMaterial color={colour} emissive={colour} emissiveIntensity={isOn ? 1 : 0} />
        </mesh>
        // </Float>
    )
}
