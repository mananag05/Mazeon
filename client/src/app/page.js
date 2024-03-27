"use client"

import SwitchArea from '../components/swictharea'
import AuthForm from '@/components/AuthForm';
import Image from 'next/image';
import { useEffect , useState } from 'react';
import { getUser } from '@/utils/getuser';
import LoaderLayout from '@/components/cssloader';
import { usePathname , useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { SetProfile } from '@/redux/slices/UserProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root() {
  const dispatch = useDispatch()
  const Pathname = usePathname()
  const router = useRouter();
  const [Loader, SetLoader] = useState(true);

     
  useEffect(() => {
    const init = async () => {
      const data = await getUser(Pathname);
      dispatch(SetProfile(data.user))
      router.push(`${data.path}`);
      if (data.path == Pathname){
        SetLoader(false); 
      }
    };
    init();
  }, []);


  return (
    <div>
      <ToastContainer />
      {Loader ? (
      <div>
          <LoaderLayout />
      </div> ) : (
            <div className="h-screen lg:shadow-2xl flex flex-col lg:flex-row lg:p-5 p-6">
            <div className="lg:hidden flex flex-row basis-1/12">
              <div className="flex items-center justify-center">
                <Image src="/mazeon_logo.png" priority alt='' width={50} height={50}/>
              </div>
              <div className="flex items-center justify-center ml-5">
                <span className="text-2xl font-mono text-logthemstext">
                  Mazeon
                </span>
              </div>
            </div>
            <SwitchArea />
            <AuthForm />
          </div>
      )}
    </div>
  );
}
