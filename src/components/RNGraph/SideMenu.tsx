import React from "react";

interface SideMenuProps {
    opt: number;
    setOpt: (num: number) => void;
    selectedParticleId: number | null;
    setSelectedParticleId: (pId: number | null) => void;
    wallOpacity: number;
    setWallOpacity: (num: number) => void;
}
export function SideMenu({
    setOpt,
    setSelectedParticleId,
    opt,
    selectedParticleId,
    wallOpacity,
    setWallOpacity,
}: SideMenuProps) {
    const numPointsChoices = [
        10, 20, 30, 50, 100, 200, 300, 400, 500, 600, 700,
    ];
    return (
        <div className="react-controls">
            <div>
                {numPointsChoices.map((ix) => (
                    <h2
                        key={ix}
                        onClick={() => {
                            setOpt(ix);
                            setSelectedParticleId(null);
                        }}
                    >
                        Num Points: {ix}
                    </h2>
                ))}
            </div>
            <hr />
            Selected: {opt}
            <hr />
            Particle: {selectedParticleId}
            <hr />
            WallOpacity:
            <input
                type={"number"}
                min={0}
                max={1}
                step={0.05}
                value={wallOpacity.toFixed(2)}
                onChange={(e) => setWallOpacity(parseFloat(e.target.value))}
            />
            <button onClick={() => setWallOpacity(Math.random())}>
                randomize
            </button>
            <hr />
        </div>
    );
}
