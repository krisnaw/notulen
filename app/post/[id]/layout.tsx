// writer layout

import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>
                <Link href="/">Back</Link>
            </div>
            {children}
        </div>
    )
}