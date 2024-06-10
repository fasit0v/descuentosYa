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

export default function CreateFormDiscount({ place_id, user_id, placeName }) {
    const { openPopUp } = useContext(context);

    const { data, setData, post, processing, reset, errors } = useForm({
        place_id: place_id,
        user_id: user_id,
        discountName: null,
        discountDesciprition: null,
        discountImage: null,
    });

    const [confirmingDiscountCreation, setConfirmingDiscountCreation] =
        useState(false);

    const openModal = () => {
        setConfirmingDiscountCreation(true);
    };

    const closeModal = () => {
        setConfirmingDiscountCreation(false);
        reset();
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post("/discounts", {
            onError: () => {
                openPopUp("ocurrio un error al crear el descuento", true);
            },
            onSuccess: () => {
                openPopUp("Se creo el descuento correctamente", false);
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
                className="bg-orange-400 text-white hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500 "
                onClick={openModal}
            >
                Agregar Descuento
            </PrimaryButton>

            <Modal show={confirmingDiscountCreation} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        Publica un descuento en {placeName}
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="discountName">Titulo</InputLabel>

                        <TextInput
                            name="discountName"
                            placeholder="Descuentos 2x1 en ..."
                            onChange={handleChange}
                        />

                        <InputError
                            message={errors.discountName}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="discountDescription">
                            Descripción
                        </InputLabel>

                        <TextInput
                            name="discountDescription"
                            placeholder="Aqui puedes dar más detalles sobre el descuento"
                            onChange={handleChange}
                        />

                        <InputError
                            message={errors.discountDescription}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="discountImage">
                            Adjunta fotos
                        </InputLabel>

                        <TextInput
                            name="discountImage"
                            type={"file"}
                            className=" py-2 "
                            onChange={handleChange}
                        />

                        <InputError
                            message={errors.discountImage}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end ">
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
                            Crear Permiso
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
