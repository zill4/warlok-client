import { useState, useEffect } from 'react';
import type { AuthFormData } from '../types/shared';
import { withBasePath } from '../utils/basePath';
import { useAuth } from './AuthProvider';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const { login, signup, isLoading } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setIsLogin(!params.get('signup'));
    }, []);


    const checkPasswordMatch = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setError('');

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data: AuthFormData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            ...(isLogin ? {} : {
                username: formData.get('username') as string,
                confirmPassword: formData.get('confirmPassword') as string,
            }),
        };

        if (!isLogin && data.confirmPassword && !checkPasswordMatch(data.password, data.confirmPassword)) {
            setError('Passwords do not match');
            return;
        }

        try {
            if (isLogin) {
                await login(data);
            } else {
                await signup(data);
            }
            
            // Redirect to profile after successful auth
            window.location.href = withBasePath('profile');
        } catch (err: unknown) {
            setError((err as Error).message || 'An error occurred');
        }
    };

    const toggleMode = () => {
        const newMode = !isLogin;
        setIsLogin(newMode);
        const url = new URL(window.location.href);
        if (newMode) {
            url.searchParams.delete('signup');
        } else {
            url.searchParams.set('signup', 'true');
        }
        window.history.pushState({}, '', url);
    };

    return (
        <div>
            <h2 style={{
                fontFamily: 'Bebas Neue',
                fontSize: '2rem',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                {isLogin ? 'Login' : 'Sign Up'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        style={{
                            padding: '0.75rem',
                            background: '#333',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: '#D9D9D9',
                            fontSize: '1rem',
                        }}
                    />

                    {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            style={{
                                padding: '0.75rem',
                                background: '#333',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                color: '#D9D9D9',
                                fontSize: '1rem',
                            }}
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        style={{
                            padding: '0.75rem',
                            background: '#333',
                            border: '1px solid #444',
                            borderRadius: '4px',
                            color: '#D9D9D9',
                            fontSize: '1rem',
                        }}
                    />

                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            style={{
                                padding: '0.75rem',
                                background: '#333',
                                border: '1px solid #444',
                                borderRadius: '4px',
                                color: '#D9D9D9',
                                fontSize: '1rem',
                            }}
                        />
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: '0.75rem',
                            background: '#D9D9D9',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#000',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    >
                        {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>

                    {error && (
                        <div style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={toggleMode}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#D9D9D9',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            marginTop: '1rem',
                        }}
                    >
                        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                    </button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '1rem 0',
                        gap: '1rem'
                    }}>

                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #333' }} />
                        <span style={{ color: '#D9D9D9', flexDirection: 'column', alignItems: 'center' }}>or</span>
                        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #333' }} />
                    </div>
                </div>

                <button
                    type="button"
                    style={{
                        width: '100%',
                        background: '#fff',
                        border: '1px solid rgb(207, 217, 222)',
                        padding: '0.75rem',
                        color: '#000',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        gap: '0.5rem',
                        fontSize: '15px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                    }}
                >
                    <img src={withBasePath("/assets/images/branding/x/logo-black.png")} alt="X" width="20" height="20" />
                    Continue with X
                </button>
            </form>
        </div>
    );
}

// userSignal removed - now using React Context via AuthProvider 