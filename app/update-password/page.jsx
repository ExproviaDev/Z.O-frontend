"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
// import { supabase } from '@/lib/supabaseClient'; 
import { supabase } from "../../lib/supabaseClient"

export default function UpdatePasswordPage() {
    const router = useRouter(); 
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenReceived, setTokenReceived] = useState(false); 
    const [pageInitialized, setPageInitialized] = useState(false);

    const updatePasswordWithToken = async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({ 
            password: newPassword 
        });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            
            if (hash) {
                const params = new URLSearchParams(hash.substring(1));
                const token = params.get('access_token');
                
                if (token) {
                    setTokenReceived(true);
                    setMessage("আপনার অ্যাকাউন্ট যাচাই করা হয়েছে। নতুন পাসওয়ার্ড সেট করুন।");
                } else {
                    setTokenReceived(false);
                    setError("ত্রুটি: পাসওয়ার্ড রিসেট টোকেন পাওয়া যায়নি বা মেয়াদ উত্তীর্ণ হয়েছে।");
                }
            } else {
                setTokenReceived(false);
                setError("ত্রুটি: পাসওয়ার্ড রিসেট টোকেন পাওয়া যায়নি।");
            }
            
            setPageInitialized(true);
        }
        
    }, []);
    if (!pageInitialized) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <p className='text-xl text-gray-700'>লোডিং...</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলেনি।');
            setLoading(false);
            return;
        }
        if (password.length < 6) {
             setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
             setLoading(false);
             return;
        }

        try {
            await updatePasswordWithToken(password); 
            
            setMessage('পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে! এখন আপনি লগইন করতে পারেন।');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                router.push('/login'); 
            }, 2000); 
            

        } catch (err) {
            setError(err.message || 'পাসওয়ার্ড আপডেট করার সময় একটি ত্রুটি হয়েছে।');
        } finally {
            setLoading(false);
        }
    };

    const renderForm = () => (
        <form className='w-full space-y-6' onSubmit={handleSubmit}>
            <div className='form-control'>
                <label className='label'><span className='label-text font-semibold text-gray-700'>নতুন পাসওয়ার্ড</span></label>
                <input
                    type="password"
                    className='input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                    minLength={6}
                    required
                />
            </div>
            
            <div className='form-control'>
                <label className='label'><span className='label-text font-semibold text-gray-700'>পাসওয়ার্ড নিশ্চিত করুন</span></label>
                <input
                    type="password"
                    className='input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                    required
                />
            </div>
            
            <button 
                className='w-full btn bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 rounded-lg transition duration-200' 
                type="submit" 
                disabled={loading || !tokenReceived}
            >
                {loading ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
            </button>

            <div className='text-center mt-4'>
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                    লগইন পেজে ফিরে যান
                </a>
            </div>
        </form>
    );

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl'>
                <h2 className='text-3xl font-extrabold text-center text-gray-900'>
                    পাসওয়ার্ড রিসেট
                </h2>
                
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
                {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{message}</div>}
                {tokenReceived ? (
                    renderForm()
                ) : (
                    <div className="text-center text-gray-600">
                        পাসওয়ার্ড রিসেট করার জন্য আপনার ইমেল ইনবক্সে পাঠানো লিঙ্কটি ব্যবহার করুন।
                    </div>
                )}
            </div>
        </div>
    );
}