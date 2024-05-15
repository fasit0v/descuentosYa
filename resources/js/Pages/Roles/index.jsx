import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Role(props) {
    console.log(props);

    if (!props.auth.availableRoutes.some((i) => i.moduleName == "roles")) {
        router.get("/");
    }

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
                        <div className="p-6 text-gray-900">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                        {props.roles.map((i) => (
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
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Usuarios
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href={router.get("")}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Permisos
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Editar
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Borrar
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
