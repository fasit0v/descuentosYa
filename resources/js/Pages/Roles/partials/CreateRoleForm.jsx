import { useContext, useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import context from "@/Context/context";

function CreateRoleForm() {
    const [confirmingRoleCreation, setConfirmingRoleCreation] = useState(false);
    const roleNameInput = useRef();

    const { openPopUp } = useContext(context);

    const { data, setData, post, processing, reset, errors } = useForm({
        roleName: "",
    });

    const confirmUserCreation = () => {
        setConfirmingRoleCreation(true);
    };

    const confirmRole = (e) => {
        e.preventDefault();

        post("/roles", {
            preserveScroll: true,

            onError: () => {
                roleNameInput.current.focus();
                openPopUp("ocurrio un error al crear el rol", true);
            },
            onSuccess: () => {
                openPopUp("Se creo el rol correctamente", false);
                closeModal();
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingRoleCreation(false);

        reset();
    };

    return (
        <>
            <PrimaryButton onClick={confirmUserCreation}>
                Crear Rol
            </PrimaryButton>

            <Modal show={confirmingRoleCreation} onClose={closeModal}>
                <form onSubmit={confirmRole} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Agregar un Rol
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
                            className="ml-3 bg-orange-400 hover:bg-orange-500"
                            disabled={processing}
                        >
                            Crear Rol
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default CreateRoleForm;
