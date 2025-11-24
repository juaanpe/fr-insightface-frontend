import React from 'react';
import { ShieldCheck, Menu, User, Github } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
    activeTab: 'compare' | 'recognition';
    onTabChange: (tab: 'compare' | 'recognition') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-700 p-2 rounded-lg text-white">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-neutral-900 leading-none">FaceGuard</h1>
                                <p className="text-xs text-neutral-500 font-medium">INA Digital Security</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex gap-1 bg-neutral-100 p-1 rounded-lg">
                            <button
                                onClick={() => onTabChange('compare')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'compare'
                                        ? 'bg-white text-primary-700 shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                                    }`}
                            >
                                Face Compare
                            </button>
                            <button
                                onClick={() => onTabChange('recognition')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'recognition'
                                        ? 'bg-white text-primary-700 shadow-sm'
                                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                                    }`}
                            >
                                Recognition
                            </button>
                        </nav>

                        <div className="flex items-center gap-4">
                            <a href="#" className="text-neutral-400 hover:text-neutral-600">
                                <Github size={20} />
                            </a>
                            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                                <User size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-neutral-200 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm text-neutral-500">
                    &copy; {new Date().getFullYear()} INA Digital. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
