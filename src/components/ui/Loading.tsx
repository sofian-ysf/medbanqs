import React from 'react';

// Shared styles for all loading components
const loadingStyles = `
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
  }
  
  .skeleton-white {
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
  }
  
  @keyframes loading {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .loading-container {
    min-height: 100vh;
    background: white;
    padding-top: 72px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .loading-content {
    max-width: 600px;
    width: 100%;
    padding: 0 20px;
  }
`;

// Full page loading skeleton (like brief-generator)
export const LoadingPage = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div className="loading-container">
        <div className="loading-content">
          <div className="skeleton" style={{ height: '48px', width: '60%', margin: '0 auto 20px' }}></div>
          <div className="skeleton" style={{ height: '20px', width: '80%', margin: '0 auto 40px' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
            <div className="skeleton" style={{ height: '120px', width: '100%' }}></div>
            <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
            <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
            <div className="skeleton" style={{ height: '56px', width: '100%' }}></div>
          </div>
          
          <div style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '20px' }}>
            {text}
          </div>
        </div>
      </div>
    </>
  );
};

// Card loading skeleton
export const LoadingCard = () => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <div className="skeleton" style={{ height: '24px', width: '70%', marginBottom: '12px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '8px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '85%', marginBottom: '16px' }}></div>
        <div className="skeleton" style={{ height: '32px', width: '120px' }}></div>
      </div>
    </>
  );
};

// Button loading state
export const LoadingButton = ({ children, isLoading, ...props }: any) => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <button {...props} disabled={isLoading}>
        {isLoading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <div className="skeleton" style={{ height: '16px', width: '16px', borderRadius: '50%' }}></div>
            <span>Loading...</span>
          </div>
        ) : children}
      </button>
    </>
  );
};

// Inline spinner
export const LoadingSpinner = ({ size = 20 }: { size?: number }) => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div 
        className="skeleton" 
        style={{ 
          height: `${size}px`, 
          width: `${size}px`, 
          borderRadius: '50%',
          display: 'inline-block' 
        }}
      ></div>
    </>
  );
};

// Text loading placeholder
export const LoadingText = ({ width = '100%', height = '16px' }: { width?: string; height?: string }) => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div className="skeleton" style={{ height, width }}></div>
    </>
  );
};

// Dashboard loading skeleton
export const LoadingDashboard = () => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div style={{ padding: '72px 20px 20px', minHeight: '100vh', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div className="skeleton" style={{ height: '40px', width: '300px', marginBottom: '32px' }}></div>
          
          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '12px' }}></div>
                <div className="skeleton" style={{ height: '32px', width: '40%' }}></div>
              </div>
            ))}
          </div>
          
          {/* Content area */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div className="skeleton" style={{ height: '24px', width: '200px', marginBottom: '20px' }}></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div className="skeleton" style={{ height: '40px', width: '40px', borderRadius: '50%' }}></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: '16px', width: '70%', marginBottom: '8px' }}></div>
                  <div className="skeleton" style={{ height: '14px', width: '50%' }}></div>
                </div>
                <div className="skeleton" style={{ height: '32px', width: '80px' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Chat loading skeleton
export const LoadingChat = () => {
  return (
    <>
      <style jsx>{loadingStyles}</style>
      <div style={{ padding: '72px 20px 20px', minHeight: '100vh', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid #e5e7eb', marginBottom: '20px' }}>
            <div className="skeleton" style={{ height: '48px', width: '48px', borderRadius: '50%' }}></div>
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '18px', width: '200px', marginBottom: '6px' }}></div>
              <div className="skeleton" style={{ height: '14px', width: '120px' }}></div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div className="skeleton" style={{ height: '32px', width: '32px', borderRadius: '50%' }}></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '8px' }}></div>
                  <div className="skeleton" style={{ height: '16px', width: '60%' }}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <div style={{ marginTop: '32px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
            <div className="skeleton" style={{ height: '48px', width: '100%' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};