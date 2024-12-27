import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard({auth}) {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true);
        try{
            const res = await axios.get("/admin/dashboard/getdata");

            setData(res.data);
        }catch(err){
            console.log(err)
        }finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <AuthenticatedLayout header="Dashboard" auth={auth}>
            <Head title="Dashboard" />
            <div className="py-2">Admin Dashboard</div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin />
                </div>
            ) : (
                <pre className="text-gray-900">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </AuthenticatedLayout>
    );
}
