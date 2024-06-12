import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import DeleteRoleForm from "./partials/DeleteRoleForm";
import CreateRoleForm from "./partials/CreateRoleForm";
import UpdateRoleForm from "./partials/UpdateRoleForm";

export default function Role(props) {
    if (!props.auth.availableRoutes.some((i) => i.moduleName == "roles")) {
        router.get("/");
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight p-2">
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
                                                        Rol
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.roles.data.map((i) => (
                                                    <tr
                                                        key={i.id}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                    >
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white"
                                                        >
                                                            {i.roleName}
                                                        </td>
                                                        {props.auth.permissionsInRoute.some(
                                                            (i) =>
                                                                i.canDelete ==
                                                                    1 &&
                                                                i.canUpdate == 1
                                                        ) && (
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
                                                        )}
                                                        {props.auth.permissionsInRoute.some(
                                                            (i) =>
                                                                i.canUpdate == 1
                                                        ) && (
                                                            <td className="px-6 py-4 text-right">
                                                                <UpdateRoleForm
                                                                    className="max-w-xl"
                                                                    id={i.id}
                                                                    roleName={
                                                                        i.roleName
                                                                    }
                                                                />
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
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <nav
                                            aria-label="Page navigation example "
                                            className="flex justify-center py-2"
                                        >
                                            <div className=" w-min rounded-lg flex align-middle">
                                                {props.roles.links.map(
                                                    (link, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    link.url
                                                                )
                                                            }
                                                            disabled={!link.url}
                                                            className={`px-4 py-2 rounded ${
                                                                link.active
                                                                    ? "bg-orange-500 text-white"
                                                                    : "bg-gray-300 text-gray-700"
                                                            } disabled:opacity-50`}
                                                        >
                                                            {link.label}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </nav>
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
