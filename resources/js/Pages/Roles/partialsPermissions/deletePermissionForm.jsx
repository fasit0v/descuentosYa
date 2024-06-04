import { useContext, useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import context from "@/Context/context";

function DeletePermissionForm({ id, moduleId, moduleName, roleId }) {
    const { openPopUp } = useContext(context);

    const [confirmingPermissionDeletion, setConfirmingPermissionDeletion] =
        useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        moduleName: "",
        roleId: roleId,
        permissionId: id,
    });

    const openModal = () => {
        setConfirmingPermissionDeletion(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        destroy(`/permissions/${id}`, {
            preserveScroll: true,

            onSuccess: () => {
                openPopUp("Se borro el permiso correctamente", false);
                closeModal();
            },
            onError: () => {
                passwordInput.current.focus();
                openPopUp("ocurrio un error al borrar el permiso", true);
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingPermissionDeletion(false);
        reset();
    };

    return (
        <>
            <DangerButton onClick={openModal}>Borrar</DangerButton>

            <Modal show={confirmingPermissionDeletion} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        ¿Estas seguro de borrar el Permiso del Modulo{" "}
                        {moduleName}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Por favor, ingrese el nombre del para confirmar que
                        desea eliminar el permiso de forma permanente.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="moduleName"
                            value="moduleName"
                            className="sr-only"
                        />

                        <TextInput
                            id="moduleName"
                            type="moduleName"
                            name="moduleName"
                            ref={passwordInput}
                            value={data.moduleName}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    ["moduleName"]: e.target.value,
                                })
                            }
                            className="mt-1 block w-3/4 p-2"
                            isFocused
                            placeholder="Nombre del Modulo"
                        />

                        <InputError
                            message={errors.moduleName}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Borrar Permiso
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default DeletePermissionForm;
