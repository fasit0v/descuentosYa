import { useContext, useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
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
                closeModal();
            },
        });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <PrimaryButton
                className="bg-orange-400 capitalize text-white hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500"
                onClick={openModal}
            >
                Agregar Usuario
            </PrimaryButton>

            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        Agrega un usuario al rol "{roleName}"
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="user_id">Usuario</InputLabel>
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

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            className="hover:border-orange-500"
                            onClick={closeModal}
                        >
                            Cancelar
                        </SecondaryButton>
                        <DangerButton
                            className="ml-3 bg-orange-400 hover:bg-orange-500"
                            disabled={processing}
                        >
                            Agregar usuario
                        </DangerButton>
                    </div>
                </form>

                <div className="p-6">
                    <h3 className="text-orange-400 font-bold">Usuarios</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </Modal>
        </>
    );
}
