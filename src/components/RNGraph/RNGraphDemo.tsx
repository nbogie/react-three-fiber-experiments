import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { CubesSet } from './CubesSet';
import { SideMenu } from './SideMenu';

export function RNGraphDemo() {

    const [opt, setOpt] = useState<number>(90);
    const [wallOpacity, setWallOpacity] = useState<number>(1);
    const [selectedParticleId, setSelectedParticleId] = useState<number | null>(null);
    return (
        <div className="demo-container-with-side">

            <SideMenu {...{
                setOpt, setSelectedParticleId, opt, selectedParticleId,
                wallOpacity, setWallOpacity
            }} />

            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <CubesSet
                            selectedParticle={selectedParticleId}
                            setSelectedParticle={setSelectedParticleId}
                            numCubes={opt}
                            wallOpacity={wallOpacity} />
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}

