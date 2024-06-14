import React, { useContext } from "react";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { TextToSpeech } from "tts-react";
import { Link, router } from "@inertiajs/react";

import DangerButton from "./DangerButton";
import context from "@/Context/context";

const formatter = buildFormatter(spanishStrings);

const Comment = ({ comment, ...props }) => {
    const { openPopUp } = useContext(context);

    const handleDelete = () => {
        router.delete(`/comments/${comment.comment_id}`, {
            onError: () => {
                openPopUp("Ocurrió un error al eliminar el comentario", true);
            },
            onSuccess: () => {
                openPopUp("Se eliminó correctamente el comentario", false);
            },
        });
    };

    return (
        <div
            className={
                "bg-white shadow-2xl border rounded-lg p-4 mb-4 ml-8 overflow-x-hidden cursor-pointer " +
                props.className
            }
        >
            <TextToSpeech position="rightTop" align="vertical">
                <div className="flex items-center my-2">
                    {comment.user_image ? (
                        <img
                            src={comment.user_image}
                            alt={comment.user_name}
                            className="w-8 h-8 border border-orange-400 rounded-full mr-3 object-contain select-none"
                        />
                    ) : (
                        <img
                            src="/image/user.png"
                            className="w-8 h-8 border border-orange-400 rounded-full mr-3 object-contain select-none"
                        />
                    )}

                    <p className="text-gray-600 capitalize text-sm ">
                        <Link
                            className=" font-semibold text-base text-orange-400 underline"
                            href={`/profile/${comment.user_id}`}
                        >
                            {comment.user_name}.
                        </Link>
                    </p>
                </div>
                <p className="text-gray-700">
                    <b className="hidden">Comentó... </b>{" "}
                    {comment.commentDescription}.
                </p>
                <div>
                    {comment.commentImage && (
                        <img
                            src={comment.commentImage}
                            alt={comment.commentName}
                            className="w-48 h-48 object-contain select-none"
                        />
                    )}
                </div>

                <div className="text-sm flex justify-between">
                    <div>
                        <p className="text-gray-600">
                            Publicado{" "}
                            <b className="hidden">
                                {" "}
                                el
                                {new Date(
                                    comment.commentCreateAt
                                ).toLocaleDateString("es-AR", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </b>
                            <ReactTimeago
                                date={comment.commentCreateAt}
                                formatter={formatter}
                            />
                            .
                        </p>
                    </div>
                </div>
            </TextToSpeech>
            {props.user_id == comment.user_id && (
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

export default Comment;
