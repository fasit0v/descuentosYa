import React from "react";

export default function ButtonComment({ commentQuantity }) {
    return (
        <div className=" flex items-center gap-1 cursor-pointer">
            <img src="/image/comment.png" className=" h-4 w-4" />
            <p>{commentQuantity}</p>
        </div>
    );
}
