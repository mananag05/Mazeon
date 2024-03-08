import SwitchArea from '../components/swictharea'
import AuthForm from '@/components/AuthForm';
import Image from 'next/image';
export default function Home() {
  return (
    <div>
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
    </div>
  );
}
