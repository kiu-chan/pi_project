import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Simple SVG icons
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_2ph52ud";
const EMAILJS_TEMPLATE_ID = "template_3kx8uub";
const EMAILJS_PUBLIC_KEY = "Aj6eAUxZKL1qbBJ34";

function DeleteAccount() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const sendVerificationEmail = async (userEmail, code) => {
    const templateParams = {
      to_email: userEmail,
      verification_code: code,
      from_name: "Hà Nội Vibe",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  };

  const sendAdminNotification = async () => {
    const templateParams = {
      to_email: 'baokhanhntby@gmail.com',
      user_email: email,
      reason: reason || 'Không có lý do được cung cấp',
      request_time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Error sending admin notification:', error);
      throw new Error('Failed to send admin notification');
    }
  };

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const code = generateVerificationCode();
      await sendVerificationEmail(email, code);
      localStorage.setItem('verificationCode', code);
      setStep(2);
    } catch (error) {
      setError('Có lỗi xảy ra khi gửi mã xác nhận. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const storedCode = localStorage.getItem('verificationCode');
    if (verificationCode.toUpperCase() === storedCode) {
      try {
        await sendAdminNotification();
        setStep(3);
        localStorage.removeItem('verificationCode');
      } catch (error) {
        setError('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
      }
    } else {
      setError('Mã xác nhận không chính xác');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {step === 1 && 'Yêu cầu xóa tài khoản ứng dụng Hà Nội Vibe'}
            {step === 2 && 'Xác nhận email'}
            {step === 3 && 'Yêu cầu đã được ghi nhận'}
          </h1>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertIcon />
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Initial Form */}
          {step === 1 && (
            <>
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertIcon />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Quan trọng</h3>
                    <p className="text-sm text-blue-700 mt-2">
                      Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleInitialSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Lý do xóa tài khoản (Không bắt buộc)
                    </label>
                    <textarea
                      id="reason"
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="confirm"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={confirmed}
                      onChange={(e) => setConfirmed(e.target.checked)}
                      required
                    />
                    <label htmlFor="confirm" className="ml-2 block text-sm text-gray-700">
                      Tôi hiểu rằng hành động này là vĩnh viễn và không thể hoàn tác
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading || !confirmed}
                      className={`${
                        isLoading || !confirmed ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                      } text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                    >
                      {isLoading ? 'Đang xử lý...' : 'Gửi yêu cầu xóa tài khoản'}
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <MailIcon />
                <p className="text-gray-600">
                  Chúng tôi đã gửi một mã xác nhận đến email của bạn. Vui lòng kiểm tra và nhập mã để tiếp tục.
                </p>
              </div>

              <form onSubmit={handleVerificationSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                      Mã xác nhận
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      } text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}

          {/* Step 3: Success Message */}
          {step === 3 && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <ClockIcon />
                <h2 className="text-xl font-semibold text-gray-900">Yêu cầu đã được ghi nhận</h2>
              </div>
              <p className="text-gray-600">
                Chúng tôi đã nhận được yêu cầu xóa tài khoản của bạn. Yêu cầu sẽ được xử lý trong vòng 30 ngày.
                Bạn sẽ nhận được email thông báo khi quá trình xóa tài khoản hoàn tất.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;