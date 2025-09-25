import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()


    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password})
        })

        if (response.ok) {
            router.push('/login');
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
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

                <button type="submit">Register</button>
                
            </form>
        </div>
    )
}