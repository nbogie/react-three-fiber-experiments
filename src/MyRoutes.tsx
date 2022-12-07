import { Route, Routes } from 'react-router-dom';
import { FetchedBarGraphDemo } from './components/fetchedBarGraph/FetchedBarGraphDemo';
import LoadModelDemo from './components/loadModel/LoadModelDemo';
import LoadModelFancierDemo from './components/loadModelFancier/LoadModelFancierDemo';
import { PerlinTerrainDemo } from './components/perlinTerrain/PerlinTerrainDemo';
import Physics1Demo from './components/physics1/Physics1Demo';
import PineTreeFieldDemo from './components/pineTrees/PineTreeFieldDemo';
import { RNGraphDemo } from './components/RNGraph/RNGraphDemo';
import { TextBoxesDemo } from './components/TextBoxesDemo';
import { TransitioningBoxesDemo } from './components/transitioningBoxes/TransitioningBoxesDemo';
import TruchetDemo from './components/truchetTiling/TruchetDemo';
import { TubeDemo } from './components/TubeDemo';
import { Layout } from './Layout';

export function MyRoutes() {
    return (

        <Routes>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Route path="/" element={<Layout />}>
                <Route index element={<TruchetDemo />} />
                <Route path="truchet" element={<TruchetDemo />} />
                <Route path="text-boxes" element={<TextBoxesDemo />} />
                <Route path="pine-trees" element={<PineTreeFieldDemo />} />
                <Route path="load-model" element={<LoadModelDemo />} />
                <Route path="load-model-fancier" element={<LoadModelFancierDemo />} />
                <Route path="rngraph" element={<RNGraphDemo />} />
                <Route path="tube" element={<TubeDemo />} />
                <Route path="physics1" element={<Physics1Demo />} />
                <Route path="transitioning-boxes" element={<TransitioningBoxesDemo />} />
                <Route path="fetched-bar-graph" element={<FetchedBarGraphDemo />} />
                <Route path="perlin-terrain" element={<PerlinTerrainDemo />} />

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

