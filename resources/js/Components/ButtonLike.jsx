import { router } from "@inertiajs/react";
import React from "react";

export default function ButtonLike({ likesQuantity, likedByUser, discount }) {
    return (
        <div
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
            className=" flex items-center gap-1 cursor-pointer"
        >
            {likedByUser ? (
                <img src="/image/like.png" className=" h-[1.2rem] w-[1.2rem]" />
            ) : (
                <img src="/image/withOutLike.png" className=" h-4 w-4" />
            )}
            <p>{likesQuantity}</p>
        </div>
    );
}
