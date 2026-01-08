import {
  LayoutDashboard,
  BookOpen,
  FileText,
  User,
  CreditCard,
  GraduationCap,
  X,
  BookText,
  FileQuestionMark,
  TrendingUpDown,
  Lightbulb,
  BookOpenCheck,
  ListChecks,
  Calendar,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { SidebarItem } from "../../../types";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarItems: SidebarItem[];
}

export default function Sidebar({
  isOpen,
  onClose,
  sidebarItems,
}: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href);

  const IconComponent = ({ iconName }: { iconName: string }) => {
    const icons = {
      LayoutDashboard,
      BookOpen,
      FileText,
      User,
      CreditCard,
      BookText,
      FileQuestionMark,
      TrendingUpDown,
      Lightbulb,
      BookOpenCheck,
      ListChecks,
      Calendar,
    };
    const Icon = icons[iconName as keyof typeof icons];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 z-40"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 lg:mt-0 -mt-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BarPrime</span>
          </div>
        </div>
        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize"></p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href={"/dashboard"}
            onClick={onClose}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/dashboard"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IconComponent iconName={"LayoutDashboard"} />
            <span>{"Dashboard"}</span>
          </Link>
          {session?.user.role === "customer" &&
            sidebarItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                onClick={(e) => {
                  if (!item.enabled) {
                    e.preventDefault();
                    return;
                  }
                  onClose();
                }}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-700"
                    : item.enabled
                    ? "text-gray-700 hover:bg-gray-50"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                <IconComponent iconName={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          <Link
            href={"/dashboard/profile"}
            onClick={onClose}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/dashboard/profile")
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <IconComponent iconName={"User"} />
            <span>{"Profile"}</span>
          </Link>
          {session?.user.role === "customer" && (
            <Link
              href={"/dashboard/subscription"}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/dashboard/subscription")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <IconComponent iconName={"CreditCard"} />
              <span>{"Subscription"}</span>
            </Link>
          )}
          {session?.user.role === "admin" && (
            <Link
              href={"/dashboard/users"}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/dashboard/users")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <IconComponent iconName={"User"} />
              <span>{"Customer"}</span>
            </Link>
          )}
        </nav>
        <div className="p-2 lg:hidden">
          <button
            className="btn btn-error cursor-pointer w-full"
            onClick={() => signOut()}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
