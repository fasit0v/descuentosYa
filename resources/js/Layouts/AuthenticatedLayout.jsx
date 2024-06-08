import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import PopUpMessageContextProvider from "@/Context/PopUpMessageContext";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { url } = usePage();

    return (
        <PopUpMessageContextProvider>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <Link href="/">
                                <ApplicationLogo className="h-16 w-auto fill-current text-gray-800" />
                            </Link>

                            {auth.user ? (
                                <>
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink
                                            href="/"
                                            replace
                                            active={url === "/"}
                                            className="capitalize"
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            href="/acerca"
                                            replace
                                            active={url === "/acerca"}
                                            className="capitalize"
                                        >
                                            Acerca
                                        </NavLink>
                                        {auth.availableRoutes.map((i) => (
                                            <NavLink
                                                href={route(
                                                    `${i.moduleName}.index`
                                                )}
                                                key={i.moduleName}
                                                active={url.startsWith(
                                                    `/${i.moduleName}`
                                                )}
                                                className="capitalize"
                                            >
                                                {i.moduleName}
                                            </NavLink>
                                        ))}
                                    </div>
                                    <div className="hidden sm:flex sm:items-center sm:ml-6 -mr-2 items-center">
                                        <div className="ml-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex capitalize items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            <img
                                                                src="/image/user.png"
                                                                className="h-8 w-8"
                                                            />
                                                            <svg
                                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <div className="px-4 font-medium text-base text-gray-800">
                                                        {auth.user.name}
                                                    </div>
                                                    <div className="px-4 font-medium text-sm text-gray-500">
                                                        {auth.user.email}
                                                    </div>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "profile.edit"
                                                        )}
                                                    >
                                                        Perfil
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route("logout")}
                                                        method="post"
                                                        as="button"
                                                    >
                                                        Cerrar Sesión
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink
                                            href="/"
                                            replace
                                            active={url === "/"}
                                            className="capitalize"
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            href="/acerca"
                                            replace
                                            active={url === "/acerca"}
                                            className="capitalize"
                                        >
                                            Acerca
                                        </NavLink>
                                    </div>
                                    <NavLink
                                        className="hidden sm:flex"
                                        href={route("login")}
                                    >
                                        Iniciar Sesión
                                    </NavLink>
                                </>
                            )}

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                (showingNavigationDropdown
                                    ? "block"
                                    : "hidden") +
                                " sm:hidden fixed bg-white z-50 right-0 shadow-2xl"
                            }
                        >
                            <div className="pt-4 pb-1 border-t border-gray-200">
                                {auth.user ? (
                                    <>
                                        <div className="mt-3 space-y-1">
                                            <ResponsiveNavLink
                                                href="/"
                                                replace
                                                active={url === "/"}
                                                className="capitalize"
                                            >
                                                Home
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href="/acerca"
                                                replace
                                                active={url === "/acerca"}
                                                className="capitalize"
                                            >
                                                Acerca
                                            </ResponsiveNavLink>
                                            {auth.availableRoutes.map((i) => (
                                                <ResponsiveNavLink
                                                    href={route(
                                                        `${i.moduleName}.index`
                                                    )}
                                                    key={i.moduleName}
                                                    active={route().current(
                                                        `${i.moduleName}.index`
                                                    )}
                                                    className="capitalize"
                                                >
                                                    {i.moduleName}
                                                </ResponsiveNavLink>
                                            ))}
                                            <div className="px-4 border-t-2 py-4">
                                                <div className="px-4 font-medium text-base text-gray-800">
                                                    {auth.user.name}
                                                </div>
                                                <div className="px-4 font-medium text-sm text-gray-500">
                                                    {auth.user.email}
                                                </div>
                                                <ResponsiveNavLink
                                                    href={route("profile.edit")}
                                                >
                                                    Perfil
                                                </ResponsiveNavLink>
                                                <ResponsiveNavLink
                                                    method="post"
                                                    href={route("logout")}
                                                    as="button"
                                                >
                                                    Cerrar Sesión
                                                </ResponsiveNavLink>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-3 space-y-1">
                                            <ResponsiveNavLink
                                                href="/"
                                                replace
                                                active={url === "/"}
                                                className="capitalize"
                                            >
                                                Home
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href="/acerca"
                                                replace
                                                active={url === "/acerca"}
                                                className="capitalize"
                                            >
                                                Acerca
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("login")}
                                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            >
                                                Iniciar Sesión
                                            </ResponsiveNavLink>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto ">{header}</div>
                    </header>
                )}
                <main>{children}</main>
            </div>
            <footer className="bg-orange-400 text-white py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            © 2024 DescuentoYa. Todos los derechos reservados.
                        </div>
                        <div className="space-x-4">
                            <Link
                                href="/"
                                className="text-white hover:text-orange-200"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/acerca"
                                className="text-white hover:text-orange-200"
                            >
                                Acerca de
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </PopUpMessageContextProvider>
    );
}
