import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout header="Dashboard" auth={auth}>
            <Head title="Dashboard" />
            <div className="py-2">Staff One Dashboard</div>
        </AuthenticatedLayout>
    );
}
