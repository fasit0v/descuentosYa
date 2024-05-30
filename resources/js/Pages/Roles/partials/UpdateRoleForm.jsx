import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

function UpdateRoleForm({ roleName, id }) {
    const [confirmingRoleUpdate, setConfirmingRoleUpdate] = useState(false);
    const roleNameInput = useRef();

    const { data, setData, put, processing, reset, errors } = useForm({
        roleName: roleName,
        id: id,
    });

    const confirmUserUpdate = () => {
        setConfirmingRoleUpdate(true);
    };

    const confirmRole = (e) => {
        e.preventDefault();

        put(`/roles/${id}`, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                closeModal();
            },
            onError: () => roleNameInput.current.focus(),
        });
    };

    const closeModal = () => {
        setConfirmingRoleUpdate(false);

        reset();
    };

    return (
        <>
            <PrimaryButton onClick={confirmUserUpdate}>Editar</PrimaryButton>

            <Modal show={confirmingRoleUpdate} onClose={closeModal}>
                <form onSubmit={confirmRole} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Actualizar Rol
                    </h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="roleName"
                            value="roleName"
                            className="sr-only"
                        />

                        <TextInput
                            id="roleName"
                            type="roleName"
                            name="roleName"
                            ref={roleNameInput}
                            value={data.roleName}
                            onChange={(e) =>
                                setData("roleName", e.target.value)
                            }
                            className="mt-1 block w-3/4 p-4 "
                            isFocused
                            placeholder="Nombre del Rol"
                        />

                        <InputError
                            message={errors.roleName}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton
                            className="ml-3 bg-orange-400 hover:bg-blue-400"
                            disabled={processing}
                        >
                            Actualizar Rol
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default UpdateRoleForm;
