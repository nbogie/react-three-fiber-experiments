import { useMemo } from "react";
import { Building } from "./Building";
import { createParticle } from "./particle";
import { createConnections } from "./rnConnections";
import { collect } from "./util";
import { Wall } from "./Wall";

interface CubesSetProps {
    numCubes: number;
    setSelectedParticle: (n: number) => void;
    selectedParticle: number | null;
    wallOpacity: number;
}
export function CubesSet({
    wallOpacity,
    numCubes,
    setSelectedParticle,
}: CubesSetProps) {
    function createParticles(n: number) {
        return collect(n, createParticle);
    }
    const particles = useMemo(() => createParticles(numCubes), [numCubes]);
    const connections = useMemo(
        () => createConnections(particles),
        [particles]
    );

    return (
        <group>
            {particles.map((p, ix) => (
                <Building
                    key={ix}
                    p={p}
                    onPointerOver={(id) => setSelectedParticle(id)}
                />
            ))}

            {connections.map((c, ix) => (
                <Wall key={ix} c={c} opacity={wallOpacity} />
            ))}
        </group>
    );
}
