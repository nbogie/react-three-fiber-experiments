import React from 'react';

interface SideMenuProps {
    opt: number;
    setOpt: (num: number) => void;
    selectedParticleId: number | null;
    setSelectedParticleId: (pId: number | null) => void;
    wallOpacity: number;
    setWallOpacity: (num: number) => void;
}
;
export function SideMenu({ setOpt, setSelectedParticleId, opt, selectedParticleId, wallOpacity, setWallOpacity }: SideMenuProps) {
    return (
        <div className="react-controls">
            <div>
                {[10, 20, 30, 50, 100, 200, 300, 400, 500, 600, 700].map(ix => (
                    <React.Fragment key={ix}>
                        <h2 onClick={() => {
                            setOpt(ix);
                            setSelectedParticleId(null);
                        }}
                        >Num Points: {ix}</h2>
                        <br />
                    </React.Fragment>
                )
                )}
            </div>
            <hr />
            Selected: {opt}
            <hr />
            Particle: {selectedParticleId}
            <hr />
            WallOpacity:
            <input type={"number"} min={0} max={1} step={0.05} value={wallOpacity.toFixed(2)} onChange={e => setWallOpacity(parseFloat(e.target.value))} />
            <button onClick={() => setWallOpacity(Math.random())}>randomize</button><hr />

        </div>
    );
}
