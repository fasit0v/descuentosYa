import React from "react";
import ReactTimeago from "react-timeago";
import spanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { TextToSpeech } from "tts-react";
import { router } from "@inertiajs/react";
import ButtonLike from "@/Components/ButtonLike";

const formatter = buildFormatter(spanishStrings);

const Comment = ({ comment, ...props }) => {
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
                        <b>{comment.user_name}.</b>
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
                            className="w-60 h-60 object-contain select-none"
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
        </div>
    );
};

export default Comment;
