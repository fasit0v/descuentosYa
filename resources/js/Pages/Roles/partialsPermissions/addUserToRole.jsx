import { useContext, useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import context from "@/Context/context";
import TextInput from "@/Components/TextInput";

export default function AddUserToThisRole({
    role_id,
    roleName,
    userWithOutRole,
    users,
}) {
    const { openPopUp } = useContext(context);

    const { data, setData, post, processing, reset, errors } = useForm({
        role_id: role_id,
        user_id: null,
    });

    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        reset();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post("/userRoles", {
            data: data,

            onError: () => {
                openPopUp("Ocurrió un error al agregar el usuario", true);
            },
            onSuccess: () => {
                openPopUp("Se agrego correctamente el usuario", false);
            },
        });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <PrimaryButton
                className="bg-orange-400 capitalize text-white  hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500"
                onClick={openModal}
            >
                Usuarios
            </PrimaryButton>

            <Modal show={modal} onClose={closeModal}>
                <div className="flex justify-between px-6 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        Usuarios en el rol "{roleName}"
                    </h2>
                    <SecondaryButton
                        className="hover:border-orange-500  "
                        onClick={closeModal}
                    >
                        Cerrar
                    </SecondaryButton>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="p-6 flex justify-between items-center"
                >
                    <div>
                        <InputLabel htmlFor="user_id">
                            Agregar usuario
                        </InputLabel>
                        <select required name="user_id" onChange={handleChange}>
                            <option value={""}> Seleccione...</option>
                            {userWithOutRole.map((i) => (
                                <option
                                    key={i.id}
                                    className="capitalize"
                                    value={i.id}
                                >
                                    {i.name} - {i.email}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>
                    <div>
                        <DangerButton disabled={processing}>
                            Agregar
                        </DangerButton>
                    </div>
                </form>

                <div className="p-6 overflow-y-scroll h-80">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <h3 className=" font-bold">Usuarios</h3>
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((i) => (
                                <tr
                                    key={i.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium capitalize text-gray-900 wditespace-nowrap dark:text-white"
                                    >
                                        <img
                                            src={i.image}
                                            className=" aspect-square object-contain h-10 rounded-full"
                                        />
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium capitalize text-gray-900 wditespace-nowrap dark:text-white"
                                    >
                                        {i.name}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium capitalize text-gray-900 wditespace-nowrap dark:text-white"
                                    >
                                        {i.email}
                                    </td>

                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium capitalize text-gray-900 wditespace-nowrap dark:text-white"
                                    >
                                        <DangerButton
                                            onClick={() =>
                                                router.post(
                                                    "/userRoles",
                                                    {
                                                        role_id: role_id,
                                                        user_id: i.id,
                                                    },
                                                    {
                                                        onError: () => {
                                                            openPopUp(
                                                                "Ocurrió un error al eliminar el usuario",
                                                                true
                                                            );
                                                        },
                                                        onSuccess: () => {
                                                            openPopUp(
                                                                "Se elimino correctamente el usuario",
                                                                false
                                                            );
                                                        },
                                                    }
                                                )
                                            }
                                        >
                                            ❌
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    );
}
