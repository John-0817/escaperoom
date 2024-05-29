import React from 'react';

export default function Layout({ children } : {children : React.ReactNode}) {
  return(
    <div className="flex h-screen flex-col md:flex-row md:overflow-auto">
      <div className="flex w-full">{children}</div>
    </div>
  )
}