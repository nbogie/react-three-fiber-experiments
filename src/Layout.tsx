import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
    return <React.Fragment>
        {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <nav>
            <ul>
                <li>
                    <Link to="/">Index</Link>
                </li>
                <li>
                    <Link to="/truchet">Truchet Tiling</Link>
                </li>
                <li>
                    <Link to="/text-boxes">text-boxes</Link>
                </li>
                <li>
                    <Link to="/pine-trees">pine-trees</Link>
                </li>
                <li>
                    <Link to="/load-model">load-model</Link>
                </li>
                <li>
                    <Link to="/rngraph">Relative Neigbourhood Graph</Link>
                </li>
                <li>
                    <Link to="/perlin-terrain">perlin-terrain</Link>
                </li>
                <li>
                    <Link to="/tube">tube</Link>
                </li>
            </ul>
        </nav>

        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined in MyRoutes . */}
        <Outlet />
    </React.Fragment>;
}
