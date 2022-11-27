export function BoxArray({ offset, onClick }: { offset: number; onClick: () => void; }): JSX.Element {
    return (
        <>{[0, 1, 2, 3, 4, 5, 6, 7].map(ix => <mesh
            key={ix}
            scale={[1, 1, 1]}
            position={[offset + ix, -ix, ix]}
            onClick={() => onClick()}
        >
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
        )}
        </>
    );
}
