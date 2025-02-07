import { auth } from "@root/auth";

export default async function Dashboard() {
    const session = await auth();
    const username = session?.user?.name;

    return (
        <div className="section-table flex-col">
            <p>Dashboard page</p>
            
            { username && (
                <p>Welcome, {username}.</p>
            )}
        </div>
    )
}