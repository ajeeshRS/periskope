import Image from "next/image";

export default function AvatarGroup() {
  return (
    <div className="flex items-center">
      <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden z-40 bg-gray-200">
        <Image
          src="/logo.svg"
          alt="User 1"
          width={28}
          height={28}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-400 flex items-center justify-center text-white font-semibold text-sm -ml-2 z-30">
        H
      </div>

      <div className="w-7 h-7 rounded-full border-2 border-white bg-orange-300 flex items-center justify-center text-white font-semibold text-sm -ml-2 z-20">
        R
      </div>

      <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden -ml-2 z-10 bg-gray-200">
        <Image
          src="/logo.svg"
          alt="User 4"
          width={28}
          height={28}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-7 h-7 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white font-semibold text-sm -ml-2 z-0">
        P
      </div>

      <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium text-xs -ml-1">
        +3
      </div>
    </div>
  );
}
