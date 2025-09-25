import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Login ({setUser}) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()


    const handleLogin = async(e) => {
        e.prevent.default();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            router.push('/Book-Store')
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}