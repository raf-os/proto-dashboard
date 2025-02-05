import Navbar from "@/ui/navbar";

export default function DashboardLayout ({ children } : { children: React.ReactNode; }) {
    return (
        <div className="flex flex-row flex-grow w-full min-h-dvh">
            <div id="sidebar" className="flex-shrink-0 w-[240px] z-10">
                <Navbar />
            </div>
            
            <div className="w-full min-h-dvh p-8">
                {children}
            </div>
        </div>
    );
}