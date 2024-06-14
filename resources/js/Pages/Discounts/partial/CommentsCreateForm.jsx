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

export default function CommentsCreateForm({ discount_id, user_id }) {
    const { openPopUp } = useContext(context);

    const { data, setData, post, processing, reset, errors } = useForm({
        discount_id: discount_id,
        user_id: user_id,
        commentDescription: "",
        commentImage: null,
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
        const formData = new FormData();
        formData.append("discount_id", data.discount_id);
        formData.append("user_id", data.user_id);
        formData.append("commentDescription", data.commentDescription);
        if (data.commentImage) {
            formData.append("commentImage", data.commentImage);
        }

        post("/comments", {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onError: () => {
                openPopUp("Ocurrió un error al crear el comento", true);
            },
            onSuccess: () => {
                openPopUp("Se creó el comentario correctamente", false);
                closeModal();
            },
        });
    };

    const handleChange = (e) => {
        if (e.target.name === "commentImage") {
            setData({ ...data, commentImage: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
            <PrimaryButton
                className="bg-orange-400 text-white hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500"
                onClick={openModal}
            >
                Agregar comentario
            </PrimaryButton>

            <Modal show={modal} onClose={closeModal}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 capitalize">
                        Publica un comentario
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="commentDescription">
                            Descripción
                        </InputLabel>
                        <TextInput
                            name="commentDescription"
                            placeholder="Aqui puedes dar más detalles sobre el descuento..."
                            onChange={handleChange}
                            className=""
                        />
                        <InputError
                            message={errors.commentDescription}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6">
                        <InputLabel htmlFor="commentImage">
                            Adjunta imagenes
                        </InputLabel>
                        <TextInput
                            name="commentImage"
                            type="file"
                            className="py-2 "
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors.commentImage}
                            className="mt-2"
                        />
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
                            Crear Comentario
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}
