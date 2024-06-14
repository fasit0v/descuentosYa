import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { TextToSpeech } from "tts-react";
import DiscountPaginate from "@/Components/DiscountPaginate";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";

const formatter = buildFormatter(spanishStrings);
export default function Show(props) {
    console.log(props);

    const { user, discount } = props.data;

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="bg-white shadow-md rounded-lg p-4 ">
                <div className="flex items-center  mb-4">
                    <img
                        src={user.image}
                        alt="User Profile"
                        className="rounded-full h-20 w-20 flex items-center justify-center object-contain"
                    />
                    <div className="ml-4 w-full">
                        <TextToSpeech position="topCenter" align="horizontal">
                            <h2 className="text-xl font-semibold text-gray-800">
                                <b className="hidden">Usuario: </b>
                                {user.name}.
                            </h2>
                            <p className="text-sm text-gray-600">
                                <b className="hidden">Correo: </b>
                                {user.email}.
                            </p>
                            {user.created_at && (
                                <p className="text-gray-600 text-sm">
                                    Se unio{" "}
                                    <b className="hidden">
                                        {" "}
                                        el
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString("es-AR", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </b>
                                    <ReactTimeago
                                        date={user.created_at}
                                        formatter={formatter}
                                    />
                                    .
                                </p>
                            )}
                        </TextToSpeech>
                    </div>
                    {props.auth.user.id == user.id && (
                        <DangerButton
                            onClick={() => router.get("/profileconfig")}
                            className="px-1 py-1 text-xs"
                        >
                            Configuración
                        </DangerButton>
                    )}
                </div>

                <DiscountPaginate
                    discounts={discount.data}
                    user_id={props.auth.user.id}
                    links={discount.links}
                />
            </div>
        </AuthenticatedLayout>
    );
}
