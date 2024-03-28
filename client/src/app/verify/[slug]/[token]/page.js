"use client"

import { useRouter } from 'next/navigation';




const VERIFY = () => {


    const router = useRouter();
    const mail = router.query?.mail || '';
    const token = router.query?.token || '';


        return (
            <div>
                <p1>on email route</p1>
                <p1>
                    {mail}
                    {token}
                </p1>
            </div>
        )
}

export default VERIFY;