import THREE from "three";

function generateCurve() {
    let points = [];
    // Define points along Z axis
    for (let i = 0; i < 50; i += 1)
        points.push(
            new THREE.Vector3(
                1 - Math.random() * 2,
                1 - Math.random() * 2,
                10 * (i / 4))
        );
    return new THREE.CatmullRomCurve3(points);
}


export function TubeDemo() {
    const curve = generateCurve();

    return (<mesh>
        <tubeGeometry args={[curve, 70, 0.2, 50, false]} />
        <meshStandardMaterial args={[{ color: "magenta" }]} />
    </mesh>)

}