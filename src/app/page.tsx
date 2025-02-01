import LogInForm from "@/ui/login-form";

export default function HomePage() {
    return (
        <div className="flex min-h-dvh justify-center items-center py-4 px-4 lg:px-0">
            <div className="flex flex-col flex-nowrap w-full lg:w-[640px] lg:max-h-dvh p-6 lg:py-10 justify-items-center bg-slate-300 rounded-xl text-gray-900">
                <LogInForm />
            </div>
        </div>
    )
}