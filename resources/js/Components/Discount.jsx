import React, { useContext } from "react";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { TextToSpeech } from "tts-react";
import { Link, router, usePage } from "@inertiajs/react";
import ButtonLike from "@/Components/ButtonLike";
import ButtonComment from "./ButtonComment";
import DangerButton from "./DangerButton";
import context from "@/Context/context";

const formatter = buildFormatter(spanishStrings);

const Discount = ({ discount, ...props }) => {
    const { openPopUp } = useContext(context);

    const { auth } = usePage().props;
    console.log(auth);

    const handleDelete = () => {
        router.delete(`/discounts/${discount.discount_id}`, {
            onError: () => {
                openPopUp("Ocurrió un error al eliminar el descuento", true);
            },
            onSuccess: () => {
                openPopUp("Se eliminó correctamente el descuento", false);
            },
        });
    };

    return (
        <div
            className={
                "bg-white shadow-2xl border rounded-lg p-4 mb-4 overflow-x-hidden cursor-pointer " +
                props.className
            }
            onDoubleClick={() =>
                router.get(`/discounts/${discount.discount_id}`)
            }
        >
            <TextToSpeech position="rightTop" align="vertical">
                <h3 className="text-lg font-bold">{discount.discountName}.</h3>

                <p className="text-gray-700">{discount.discountDescription}.</p>
                <div>
                    {discount.discountImage && (
                        <img
                            src={`${discount.discountImage}`}
                            alt={discount.discountName}
                            className="w-60 h-60 object-contain select-none rounded-lg"
                        />
                    )}
                </div>
                <div className="flex items-center my-2">
                    {discount.user_image ? (
                        <img
                            src={discount.user_image}
                            alt={discount.user_name}
                            className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain select-none"
                        />
                    ) : (
                        <img
                            src="/image/user.png"
                            className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain select-none"
                        />
                    )}

                    <p className="text-gray-600 capitalize text-sm ">
                        publicado por{" "}
                        <Link
                            className=" font-semibold text-base text-orange-400 underline"
                            href={`/profile/${discount.user_id}`}
                        >
                            {discount.user_name}.
                        </Link>
                    </p>
                </div>
                <div className="text-sm flex justify-between">
                    <div>
                        <p className="text-gray-600">
                            Publicado{" "}
                            <b className="hidden">
                                {" "}
                                el
                                {new Date(
                                    discount.discountCreatedAt
                                ).toLocaleDateString("es-AR", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </b>
                            <ReactTimeago
                                date={discount.discountCreatedAt}
                                formatter={formatter}
                            />
                            .
                        </p>
                        {discount.discountUpdatedAt && (
                            <p className="text-gray-600">
                                Actualizado{" "}
                                <b className="hidden">
                                    {" "}
                                    el
                                    {new Date(
                                        discount.discountUpdatedAt
                                    ).toLocaleDateString("es-AR", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </b>
                                <ReactTimeago
                                    date={discount.discountUpdatedAt}
                                    formatter={formatter}
                                />
                                .
                            </p>
                        )}
                        <p className="text-red-600">
                            Termina{" "}
                            <b className="hidden">
                                {" "}
                                el
                                {new Date(
                                    discount.discountEndsAt
                                ).toLocaleDateString("es-AR", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </b>
                            <ReactTimeago
                                date={discount.discountEndsAt}
                                formatter={formatter}
                            />
                            .
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <ButtonLike
                            likesQuantity={discount.likesQuantity}
                            likedByUser={discount.likedByUser}
                            discount={discount}
                        />
                        <ButtonComment
                            commentQuantity={discount.commentsQuantity}
                        />
                    </div>
                </div>
            </TextToSpeech>
            {auth && auth.user?.id == discount.user_id && (
                <DangerButton
                    onClick={handleDelete}
                    className="text-xs font-extralight py-0 bg-red-500"
                >
                    Borrar
                </DangerButton>
            )}
        </div>
    );
};

export default Discount;
