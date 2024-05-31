import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Dropdown from "@/Components/Dropdown";

function CreatePermissionForm({ id, roleName, modules }) {
    const [confirmingPermissionCreation, setConfirmingPermissionCreation] =
        useState(false);
    const roleNameInput = useRef();

    const { data, setData, post, processing, reset, errors } = useForm({
        roleId: id,
        moduleId: null,
        canCreate: 0,
        canRead: 0,
        canUpdate: 0,
        canDelete: 0,
    });

    const confirmPermissionCreation = () => {
        setConfirmingPermissionCreation(true);
    };

    const confirmPermission = (e) => {
        e.preventDefault();

        post("/permissions", {
            preserveScroll: true,
            preserveState: false,
            onError: () => roleNameInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingPermissionCreation(false);

        reset();
    };

    return (
        <>
            <PrimaryButton
                className="p-1 w-min aspect-square"
                onClick={confirmPermissionCreation}
            >
                +
            </PrimaryButton>

            <Modal show={confirmingPermissionCreation} onClose={closeModal}>
                <form onSubmit={confirmPermission} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        Agregar permisos a {roleName}
                    </h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="moduleId"
                            value="moduleId"
                            className="sr-only"
                        />

                        <select>
                            <option>Seleccione una opción</option>
                            {modules.map((i) => (
                                <option key={i.id} value={i.id}>
                                    {i.moduleName}
                                </option>
                            ))}
                        </select>

                        <InputError
                            message={errors.moduleId}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton
                            className="ml-3 bg-orange-400 hover:bg-orange-500"
                            disabled={processing}
                        >
                            Crear Permiso
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CreatePermissionForm;
