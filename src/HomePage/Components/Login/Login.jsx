import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import {useEffect, useState} from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);
    const [Loading , setIsLoading] = useState(true);

    useEffect(() => {
        async function verifyLoggingIN() {
            try{
                const userInfo = await fetch("https://converge-backend-t1.onrender.com/checkForLoggedIn",
                    {
                        method: "GET",
                        credentials: 'include',
                    }
                );
                if(userInfo.status === 200) {
                    setIsAllowed(false);
                }
            }
            catch(error){
                console.log(error);
                setIsAllowed(true);
            }
            finally{
                setIsLoading(false);
            }
        }

        verifyLoggingIN();
    } ,[]) ;

    if (Loading) {
        return <div>Loading</div>;
    }

    if (!isAllowed) {
        navigate('/dashboard' , { replace: true });
    }



    const HandleLogin = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://converge-backend-t1.onrender.com/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log('Login successful');
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error('Network error:', err);
            setError('Unable to connect to server. Check if backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Background ambient gradient glow */}
            <div className="login-ambient-glow"></div>

            <div className="login-container">
                {/* Brand Header */}
                <div className="login-brand">
                    <Link to="/" className="brand-logo">
                        converge<span className="brand-dot">.</span>
                    </Link>
                    <h2 className="login-title">Welcome back</h2>
                    <p className="login-subtitle">
                        Log in to your workspace and pick up your thinking.
                    </p>
                </div>

                {/* Login Card */}
                <div className="login-card">
                    <form className="login-form" onSubmit={HandleLogin}>
                        {error && (
                            <div style={{ color: '#ef4444', fontSize: '13.5px', textAlign: 'center', marginBottom: '8px' }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@company.com"
                                className="form-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label htmlFor="password">Password</label>
                                <a href="#forgot" className="forgot-link">Forgot?</a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="form-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login-submit" disabled={loading} onClick={HandleLogin}>
                            {loading ? 'Logging in...' : 'Log in to Converge'}
                        </button>

                        <div className="divider">
                            <span>or continue with</span>
                        </div>

                        <button type="button" className="btn-google">
                            <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            Don&apos;t have an account?{' '}
                            <Link to="/Register" className="register-link">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="back-home">
                    <Link to="/" className="back-link">
                        ← Back to Converge home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
