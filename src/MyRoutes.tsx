import { Route, Routes } from 'react-router-dom';
import { FetchedBarGraphDemo } from './components/fetchedBarGraph/FetchedBarGraphDemo';
import { HelpersDemo } from './components/HelpersDemo';
import LoadModelDemo from './components/loadModel/LoadModelDemo';
import LoadModelFancierDemo from './components/loadModelFancier/LoadModelFancierDemo';
import LoadModelWithAnimsDemo from './components/loadModelWithAnims/LoadModelWithAnimsDemo';
import { NoiseTerrainDemo } from './components/noiseTerrain/NoiseTerrainDemo';
import Physics1Demo from './components/physics1/Physics1Demo';
import PineTreeFieldDemo from './components/pineTrees/PineTreeFieldDemo';
import { RNGraphDemo } from './components/RNGraph/RNGraphDemo';
import { TextBoxesDemo } from './components/TextBoxesDemo';
import { TicTacToeDemo } from './components/tictactoe/TicTacToeDemo';
import { TransitioningBoxesDemo } from './components/transitioningBoxes/TransitioningBoxesDemo';
import TruchetDemo from './components/truchetTiling/TruchetDemo';
import { TubeDemo } from './components/TubeDemo';
import { Layout } from './Layout';




export const myRoutes = [
    { path: "text-boxes", element: <TextBoxesDemo /> }
    , { path: "helpers", element: <HelpersDemo /> }
    , { path: "truchet", element: <TruchetDemo /> }
    , { path: "pine-trees", element: <PineTreeFieldDemo /> }
    , { path: "load-model", element: <LoadModelDemo /> }
    , { path: "load-model-with-anims", element: <LoadModelWithAnimsDemo /> }
    , { path: "load-model-fancier", element: <LoadModelFancierDemo /> }
    , { path: "rngraph", element: <RNGraphDemo /> }
    , { path: "tictactoe", element: <TicTacToeDemo /> }
    , { path: "tube", element: <TubeDemo /> }
    , { path: "physics1", element: <Physics1Demo /> }
    , { path: "transitioning-boxes", element: <TransitioningBoxesDemo /> }
    , { path: "fetched-bar-graph", element: <FetchedBarGraphDemo /> }
    , { path: "noise-terrain", element: <NoiseTerrainDemo /> }
]

export function MyRoutes() {
    return (

        <Routes>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Route path="/" element={<Layout />}>
                <Route index element={myRoutes[0].element} />
                {myRoutes.map(oneRoute => <Route key={oneRoute.path} path={oneRoute.path} element={oneRoute.element} />)}
                {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

/*


*/
function NoMatch() {
    return (<div>No matching route</div>)
}

