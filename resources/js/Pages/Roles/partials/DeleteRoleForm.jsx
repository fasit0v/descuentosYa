import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";

function DeleteRoleForm({ className, id, roleName }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        roleName: "",
        roleId: id,
    });

    console.log({ data, errors });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(
            route("roles.destroy", {
                id: id,
                roleName: data.roleName,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: () => passwordInput.current.focus(),
                onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <>
            <DangerButton onClick={confirmUserDeletion}>Borrar</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estas seguro de borrar este Rol?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Una vez que se elimine el rol, todos sus recursos y
                        datos serán eliminados permanentemente. Por favor,
                        ingrese el nombre para confirmar que desea eliminar el
                        rol de forma permanente.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.roleName}
                            onChange={(e) =>
                                setData("roleName", e.target.value)
                            }
                            className="mt-1 block w-3/4"
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

                        <DangerButton className="ml-3" disabled={processing}>
                            Borrar Rol
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default DeleteRoleForm;
