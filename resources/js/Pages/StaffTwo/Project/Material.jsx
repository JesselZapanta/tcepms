import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Material({ auth }) {
    return (
        <AuthenticatedLayout header="Material" auth={auth}>
            <Head title="Material" />
            <div className="py-2">Staff Two Material</div>
        </AuthenticatedLayout>
    );
}
