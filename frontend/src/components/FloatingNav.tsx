import React from 'react';

interface FloatingNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }>;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ currentView, onNavigate, navItems }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block">
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2">
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};