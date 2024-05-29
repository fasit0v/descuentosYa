import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import DeleteRoleForm from "./partials/DeleteRoleForm";
import CreateRoleForm from "./partials/CreateRoleForm";

export default function Role(props) {
    if (!props.auth.availableRoutes.some((i) => i.moduleName == "roles")) {
        router.get("/");
    }

    console.log(props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestion de Roles
                </h2>
            }
        >
            <Head title="Gestión de Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            {props.auth.permissionsInRoute.some(
                                (i) => i.canCreate == 1
                            ) && <CreateRoleForm />}
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                                {props.auth.permissionsInRoute.some(
                                    (i) => i.canRead == 1
                                ) && (
                                    <>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    >
                                                        Nombre
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    ></th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    ></th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    ></th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3"
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.roles.data.map((i) => (
                                                    <tr
                                                        key={i.id}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {i.roleName}
                                                        </th>
                                                        {props.auth.permissionsInRoute.some(
                                                            (i) =>
                                                                i.canUpdate == 1
                                                        ) && (
                                                            <td className="px-6 py-4 text-right">
                                                                <a
                                                                    href="#"
                                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Editar
                                                                </a>
                                                            </td>
                                                        )}
                                                        {props.auth.permissionsInRoute.some(
                                                            (i) =>
                                                                i.canDelete == 1
                                                        ) && (
                                                            <td className="px-6 py-4 text-right">
                                                                <DeleteRoleForm
                                                                    className="max-w-xl"
                                                                    id={i.id}
                                                                    roleName={
                                                                        i.roleName
                                                                    }
                                                                />
                                                            </td>
                                                        )}

                                                        <td className="px-6 py-4 text-right">
                                                            <Link
                                                                href={route(
                                                                    "roles.show",
                                                                    {
                                                                        role: i.id,
                                                                    }
                                                                )}
                                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                            >
                                                                Detalles
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <nav aria-label="Page navigation example">
                                            {props.roles.links.map((i) => (
                                                <NavLink
                                                    key={i.label}
                                                    href={i.url}
                                                    active={i.active}
                                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100  hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "
                                                >
                                                    {i.label.includes(
                                                        "Previous"
                                                    ) ? (
                                                        <>
                                                            <span className="sr-only">
                                                                Previous
                                                            </span>
                                                            <svg
                                                                className="w-2.5 h-2.5 rtl:rotate-180"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 6 10"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M5 1 1 5l4 4"
                                                                />
                                                            </svg>
                                                        </>
                                                    ) : i.label.includes(
                                                          "Next"
                                                      ) ? (
                                                        <>
                                                            <span className="sr-only">
                                                                Next
                                                            </span>
                                                            <svg
                                                                className="w-2.5 h-2.5 rtl:rotate-180"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 6 10"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="m1 9 4-4-4-4"
                                                                />
                                                            </svg>
                                                        </>
                                                    ) : (
                                                        i.label
                                                    )}
                                                </NavLink>
                                            ))}
                                        </nav>
                                        Total: {props.roles.total}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
