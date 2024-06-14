import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import DiscountPaginate from "../../Components/DiscountPaginate";
import { TextToSpeech } from "tts-react";
import CreateFormDiscount from "./partialDiscount/createFormDiscount";

export default function Show(props) {
    const { place, discountData } = props.data;

    const imageUrl = place.placeImage;

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Tienda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="flex justify-between align-middle pt-4">
                            <Link href="/" className=" ">
                                <svg
                                    className=" border rounded border-orange-400 hover:bg-orange-400 absolute w-10 h-10 "
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        strokeWidth="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M6 12H18M6 12L11 7M6 12L11 17"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                            </Link>
                        </div>
                        <TextToSpeech
                            align="horizontal"
                            allowMuting
                            markBackgroundColor="#55AD66"
                            markColor="white"
                            markTextAsSpoken
                            autoPlay={false}
                            position="topCenter"
                            rate={1}
                            size="small"
                            volume={1}
                        >
                            <div className="text-orange-500  text-center my-2 text-3xl font-bold capitalize">
                                <h2>{place.placeName}.</h2>
                            </div>
                            <div className="text-center text-gray-700 my-2">
                                <p>{place.placeCategoryName}.</p>
                                <p>{place.placeAddress}.</p>
                            </div>
                            <div className="overflow-hidden flex justify-center lg:px-40">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={place.placeName}
                                        className=" h-80 w-full object-fill rounded-lg aspect-video"
                                    />
                                )}
                            </div>
                        </TextToSpeech>
                        <div className="text-orange-500 text-left my-10  flex justify-between align-middle">
                            <h4 className="text-2xl font-bold">Descuentos</h4>
                            {props.auth.user && (
                                <CreateFormDiscount
                                    place_id={place.id}
                                    placeName={place.placeName}
                                    user_id={props.auth.user.id}
                                />
                            )}
                        </div>
                        <DiscountPaginate
                            discounts={discountData.data}
                            currentPage={discountData.current_page}
                            lastPage={discountData.last_page}
                            links={discountData.links}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
