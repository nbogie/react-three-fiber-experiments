import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

interface Episode {
    id: string;
    rating: { average: number };
    summary: string;
}

export function FetchedBarGraphDemo() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    useEffect(() => {
        async function fetchAndStore() {
            const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
            const fetchedEpisodes = await res.json();
            setEpisodes(fetchedEpisodes);
        }
        fetchAndStore();
    }, []);

    const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(
        null
    );
    function handleSelectEpisode(ep: Episode): void {
        setSelectedEpisode(ep);
    }

    return (
        <div className="demo-container-with-side">
            <div>
                {selectedEpisode ? (
                    selectedEpisode?.summary
                ) : (
                    <p>Pick an episode</p>
                )}
            </div>

            <div className="canvas-container">
                <Canvas>
                    <OrbitControls autoRotate={false} />
                    <Stage>
                        <FetchedBarGraph
                            episodes={episodes}
                            handleSelectEpisode={handleSelectEpisode}
                        />
                    </Stage>
                </Canvas>
            </div>
        </div>
    );
}
interface FetchedBarGraphProps {
    episodes: Episode[];
    handleSelectEpisode: (ep: Episode) => void;
}

function FetchedBarGraph(props: FetchedBarGraphProps): JSX.Element {
    return (
        <group>
            {/* base line */}
            <mesh scale-x={120} scale-y={0.1}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
            {props.episodes.map((ep, ix) => {
                const height = 5 * ep.rating.average;
                return (
                    <mesh
                        position-x={ix * 2}
                        position-y={height / 2}
                        scale={[1, height, 1]}
                        onPointerOver={() => props.handleSelectEpisode(ep)}
                        key={ix}
                    >
                        <boxGeometry />
                        <meshStandardMaterial />
                    </mesh>
                );
            })}
        </group>
    );
}

const palettes = [
    ["#5e412f", "#fcebb6", "#78c0a8", "#f07818", "#f0a830"],
    ["#413e4a", "#73626e", "#b38184", "#f0b49e", "#f7e4be"],
    ["#aaff00", "#ffaa00", "#ff00aa", "#aa00ff", "#00aaff"],
    ["#fa6a64", "#7a4e48", "#4a4031", "#f6e2bb", "#9ec6b8"],
];
