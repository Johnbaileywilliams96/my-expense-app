
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter()

    const navItems = [
        {name: "Book Store", href: '/Book-Store'}
    ]

    return (
        <nav>
            <div>
                <Link href="/">
                Home
                </Link>
            </div>

            <div>
                {navItems.map((item) =>(
                    <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      router.pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
        </nav>
    )
}
