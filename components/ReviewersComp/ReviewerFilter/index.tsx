"use client";

import { Filter, Search } from "lucide-react";

type PropsType = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedSubject: string;
  setSelectedSubject: (val: string) => void;
};

const subjects = [
  "Constitutional Law",
  "Contracts",
  "Torts",
  "Criminal Law",
  "Civil Procedure",
  "Evidence",
  "Real Property",
  "Constitutional Law",
  "Professional Responsibility",
];

export default function ReviewerFilter(props: PropsType) {
  const { searchTerm, setSearchTerm, selectedSubject } = props;

  return (
    <>
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search study materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={selectedSubject}
          //   href="mailto:support@barprime.com"
          className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
        >
          <option value="all">All Subjects</option>
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
