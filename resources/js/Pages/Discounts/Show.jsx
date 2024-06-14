import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DiscountPaginate from "../../Components/DiscountPaginate";
import { TextToSpeech } from "tts-react";
import Discount from "@/Components/Discount";
import CommentPaginate from "@/Components/CommentPaginate";
import CommentsCreateForm from "./partial/CommentsCreateForm";

export default function Show(props) {
    console.log(props);

    const { discount, commentsData } = props.data;

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Tienda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Discount
                            discount={discount}
                            user_id={props.auth.user.id}
                        />
                        <div className="text-orange-500 text-left my-10  flex justify-between align-middle">
                            <h4 className="text-2xl font-bold">Comentarios</h4>
                            {props.auth.user && (
                                <CommentsCreateForm
                                    discount_id={discount.discount_id}
                                    user_id={props.auth.user.id}
                                />
                            )}
                        </div>
                        <CommentPaginate
                            comments={commentsData.data}
                            currentPage={commentsData.current_page}
                            lastPage={commentsData.last_page}
                            links={commentsData.links}
                            user_id={props.auth.user.id}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
