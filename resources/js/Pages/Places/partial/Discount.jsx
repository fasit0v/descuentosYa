import React from "react";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { TextToSpeech } from "tts-react";
import { router } from "@inertiajs/react";

const formatter = buildFormatter(spanishStrings);

const Discount = ({ discount, ...props }) => {
    return (
        <div className="bg-white shadow-2xl border rounded-lg p-4 mb-4">
            <TextToSpeech position="rightTop">
                <h3 className="text-lg font-bold">{discount.discountName}</h3>
                <p className="text-gray-700">{discount.discountDescription}</p>
                <div>
                    {discount.discountImage && (
                        <img
                            src={discount.discountImage}
                            alt={discount.discountName}
                            className="w-60 h-60 object-contain"
                        />
                    )}
                </div>
                <div className="flex items-center my-2">
                    {discount.user_image ? (
                        <img
                            src={discount.user_image}
                            alt={discount.user_name}
                            className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain"
                        />
                    ) : (
                        <img
                            src="/image/user.png"
                            className="w-10 h-10 border border-orange-400 rounded-full mr-3 object-contain"
                        />
                    )}

                    <p className="text-gray-600">
                        Publicado por <b>{discount.user_name}</b>
                    </p>
                </div>
            </TextToSpeech>
            <div className="text-sm flex justify-between">
                <div>
                    <p className="text-gray-600">
                        Publicado{" "}
                        <ReactTimeago
                            date={discount.discountCreatedAt}
                            formatter={formatter}
                        />
                    </p>
                    {discount.discountUpdatedAt && (
                        <p className="text-gray-600">
                            Actualizado{" "}
                            <ReactTimeago
                                date={discount.discountUpdatedAt}
                                formatter={formatter}
                            />
                        </p>
                    )}
                    <p className="text-red-600">
                        Termina{" "}
                        <ReactTimeago
                            date={discount.discountEndsAt}
                            formatter={formatter}
                        />
                    </p>
                </div>
                <div className="">
                    <p
                        className="text-gray-600"
                        onClick={() => {
                            router.post(
                                "/likes",
                                {
                                    discount_id: discount.discount_id,
                                    user_id: discount.user_id,
                                },
                                { preserveScroll: true, preserveState: true }
                            );
                        }}
                    >
                        👍🏻{discount.likesQuantity}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Discount;
