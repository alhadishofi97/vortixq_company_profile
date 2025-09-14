'use client'

import Orb from './Orb';

export default function OrangeOrbDemo() {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Default Orange */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-white text-lg font-semibold">Default Orange</h3>
          <div className="w-64 h-64">
            <Orb orangeVariant="default" />
          </div>
        </div>

        {/* Sunset Orange */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-white text-lg font-semibold">Sunset Orange</h3>
          <div className="w-64 h-64">
            <Orb orangeVariant="sunset" />
          </div>
        </div>

        {/* Vibrant Orange */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-white text-lg font-semibold">Vibrant Orange</h3>
          <div className="w-64 h-64">
            <Orb orangeVariant="vibrant" />
          </div>
        </div>

        {/* Golden Orange */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-white text-lg font-semibold">Golden Orange</h3>
          <div className="w-64 h-64">
            <Orb orangeVariant="golden" />
          </div>
        </div>
      </div>
    </div>
  );
}
