import React from "react";
import { CheckCircle } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  status: string;
  avatar: string;
  avatarColor: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, status, avatar, avatarColor }) => {
  const getStatusIcon = () => {
    if (status === "completed") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return (
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
    );
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
      <div className="flex items-center space-x-3">
        <div
          className={`w-6 h-6 ${avatarColor} rounded-full flex items-center justify-center text-xs font-bold text-white`}
        >
          {avatar}
        </div>
        <div>
          <div className="text-sm font-medium text-black">{name}</div>
          <div className="text-xs text-gray-600">{role}</div>
        </div>
      </div>
      <div className="flex items-center">{getStatusIcon()}</div>
    </div>
  );
};

export default TeamMember;