"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
    );
  }, [user]);

  return (
    <div className="auth-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          background: #05090f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: fixed;
          top: -30%;
          right: -15%;
          width: 65%;
          height: 75%;
          background: radial-gradient(ellipse, rgba(20, 180, 160, 0.14) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-root::after {
          content: '';
          position: fixed;
          bottom: -25%;
          left: -10%;
          width: 55%;
          height: 65%;
          background: radial-gradient(ellipse, rgba(56, 130, 255, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .dots-overlay {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        .auth-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 430px;
          margin: 1.5rem;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 28px;
          padding: 2.5rem 2.5rem 2rem;
          backdrop-filter: blur(24px);
          animation: slideIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .step-indicator {
          display: flex;
          gap: 6px;
          margin-bottom: 1.8rem;
        }

        .step-dot {
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          flex: 1;
          transition: background 0.3s;
        }

        .step-dot.active { background: #14b4a0; }

        .auth-eyebrow {
          font-size: 12px;
          font-weight: 500;
          color: #14b4a0;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
        }

        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 2.1rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 0.35rem;
        }

        .auth-subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 2rem;
          font-weight: 300;
          line-height: 1.5;
        }

        .field-group {
          margin-bottom: 1rem;
          animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .field-group:nth-child(1) { animation-delay: 0.08s; }
        .field-group:nth-child(2) { animation-delay: 0.14s; }
        .field-group:nth-child(3) { animation-delay: 0.2s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .field-label {
          display: block;
          font-size: 11.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .field-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input::placeholder { color: rgba(255, 255, 255, 0.18); }

        .field-input:focus {
          border-color: rgba(20, 180, 160, 0.5);
          background: rgba(20, 180, 160, 0.07);
          box-shadow: 0 0 0 3px rgba(20, 180, 160, 0.1);
        }

        .auth-btn {
          width: 100%;
          margin-top: 1.5rem;
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, #14b4a0 0%, #3882ff 100%);
          color: #fff;
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
        }

        .auth-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .auth-btn:hover:not(:disabled)::after { opacity: 1; }
        .auth-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(20, 180, 160, 0.35); }
        .auth-btn:active:not(:disabled) { transform: translateY(0); }

        .auth-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          background: rgba(255,255,255,0.07);
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .perks {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin: 1.25rem 0 0;
        }

        .perk-tag {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 999px;
          padding: 4px 12px;
        }

        .auth-footer {
          margin-top: 1.25rem;
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.3);
        }

        .auth-footer a {
          color: #14b4a0;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .auth-footer a:hover { color: #5ecfc5; }
      `}</style>

      <div className="dots-overlay" />

      <div className="auth-card">
        <div className="step-indicator">
          <div className="step-dot active" />
          <div className="step-dot active" />
          <div className="step-dot" />
        </div>

        <p className="auth-eyebrow">New Account</p>
        <h1 className="auth-title">Create your<br />account.</h1>
        <p className="auth-subtitle">Join thousands already using our platform</p>

        <div className="field-group">
          <label className="field-label" htmlFor="username">Username</label>
          <input
            className="field-input"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="yourhandle"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="email">Email Address</label>
          <input
            className="field-input"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="password">Password</label>
          <input
            className="field-input"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className="auth-btn"
        >
          {loading ? <><span className="spinner" />Creating account...</> : "Create Account →"}
        </button>

        <div className="perks">
          <span className="perk-tag">✓ Free forever</span>
          <span className="perk-tag">✓ No credit card</span>
          <span className="perk-tag">✓ Cancel anytime</span>
        </div>

        <div className="auth-footer" style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}