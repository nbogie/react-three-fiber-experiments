import React from "react";
import { Link, Outlet } from "react-router-dom";
import { myRoutes } from "./MyRoutes";

export function Layout() {
    return (
        <React.Fragment>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

            {/* only one of these will be shown */}
            {/* TODO: perhaps it is confusing to have two nav sections - not enough to hide one with CSS */}
            <NavMenu className="topMenu" />
            <SimplifiedTopMenu />

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined in MyRoutes . */}
            <Outlet />
        </React.Fragment>
    );
}

interface NavMenuProps {
    className: string;
}
export function NavMenu(props: NavMenuProps) {
    return (
        <nav className={props.className}>
            <ul>
                {myRoutes.map((oneRoute) => (
                    <li key={oneRoute.path}>
                        <Link to={"/" + oneRoute.path}>{oneRoute.path}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function SimplifiedTopMenu() {
    return (
        <nav className={"simplifiedTopMenu"}>
            <ul>
                {myRoutes
                    .filter((oneRoute) => oneRoute.path === "menu")
                    .map((oneRoute) => (
                        <li key={oneRoute.path}>
                            <Link to={"/" + oneRoute.path}>
                                {oneRoute.path}
                            </Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
