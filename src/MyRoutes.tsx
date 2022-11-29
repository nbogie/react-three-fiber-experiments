import { Route, Routes } from 'react-router-dom';
import PineTreeFieldDemo from './components/PineTreeFieldDemo';
import { RNGraphDemo } from './components/RNGraph/RNGraphDemo';
import { TextBoxesDemo } from './components/TextBoxesDemo';
import TruchetDemo from './components/TruchetDemo';
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
                <Route path="rngraph" element={<RNGraphDemo />} />

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

