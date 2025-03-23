import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

export default function DeactivatedAccount() {
    return (
        <GuestLayout>
            <Head title="Deactivated" />

            <div className="w-full rounded-lg overflow-hidden mb-4">
                <h2 className="sm:text-sm lg:text-xl text-center text-red-500 mt-4">
                    Your account has been deactivated. <br /> Please contact or
                    visit City Engineer's Office, LGU- Tangub City for account
                    reactivation process.
                    <br />
                    Thank you!
                </h2>
                <div className="w-full flex mt-4 justify-center">
                    <Link
                        className="px-4 py-2 text-nowrap flex gap-2 bg-rose-600 text-white transition-all duration-300 rounded hover:bg-rose-700"
                        method="post"
                        href={route("logout")}
                        as="button"
                    >
                        Log Out
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
