import { Stage, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { dumpObjectToTextLines } from "./dumpObjectToTextLines";

interface ModelProps {
    setModelStructureText: (text: string) => void;
}
export function Model(props: ModelProps) {
    const { scene } = useGLTF("/submarine.glb");

    //optional bonus - communicate the structure of the loaded model to some parent
    //you can remove this
    useEffect(() => {
        props.setModelStructureText(dumpObjectToTextLines(scene).join("\n"));
    }, [scene]);

    return (
        <Stage intensity={0.3}>
            <primitive object={scene} />
        </Stage>
    );
    //TODO: primitives have to be disposed of manually, I think.
}
