import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Checkbox from "@/Components/Checkbox";
import { useForm } from "@inertiajs/react";
import ErrorMessage from "@/Components/ErrorMessage";

function CreatePermissionForm({ id, roleName, modules }) {
    const [confirmingPermissionCreation, setConfirmingPermissionCreation] =
        useState(false);

    const [errorSubmit, setErrorSubmit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const openMessageModal = () => {
        setErrorMessage(true);
    };

    const closeMessageModal = () => {
        setErrorMessage(false);
    };

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

            onError: () => {
                setErrorSubmit(errors.error);
                openMessageModal();
            },
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setConfirmingPermissionCreation(false);
        reset();
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.checked ? 1 : 0 });
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
                    {/* Select module */}
                    <div className="mt-6">
                        <InputLabel htmlFor="moduleId">Modulo</InputLabel>

                        <select name="moduleId" onChange={handleChange}>
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
                    {/* select canCreate */}
                    <div className="mt-6">
                        <InputLabel htmlFor="canCreate">
                            ¿Puede crear?
                        </InputLabel>

                        <Checkbox
                            name="canCreate"
                            onChange={handleCheckboxChange}
                            defaultChecked={data.canCreate === 1}
                        ></Checkbox>

                        <InputError
                            message={errors.canCreate}
                            className="mt-2"
                        />
                    </div>

                    {/* select canRead */}
                    <div className="mt-6">
                        <InputLabel htmlFor="canRead">¿Puede leer?</InputLabel>

                        <Checkbox
                            name="canRead"
                            onChange={handleCheckboxChange}
                            defaultChecked={data.canRead === 1}
                        ></Checkbox>

                        <InputError message={errors.canRead} className="mt-2" />
                    </div>

                    {/* select canUpdate */}
                    <div className="mt-6">
                        <InputLabel htmlFor="canUpdate">
                            ¿Puede actualizar?
                        </InputLabel>

                        <Checkbox
                            name="canUpdate"
                            onChange={handleCheckboxChange}
                            defaultChecked={data.canUpdate === 1}
                        ></Checkbox>

                        <InputError
                            message={errors.canUpdate}
                            className="mt-2"
                        />
                    </div>

                    {/* select canDelete */}
                    <div className="mt-6">
                        <InputLabel htmlFor="canDelete">
                            ¿Puede eliminar?
                        </InputLabel>

                        <Checkbox
                            name="canDelete"
                            onChange={handleCheckboxChange}
                            defaultChecked={data.canDelete === 1}
                        ></Checkbox>

                        <InputError
                            message={errors.canDelete}
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

            {errorSubmit && (
                <ErrorMessage
                    message={errorSubmit}
                    show={errorMessage}
                    onClose={closeMessageModal}
                />
            )}
        </>
    );
}

export default CreatePermissionForm;
