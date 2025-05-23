import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger className="rounded flex items-center border border-neutral-300 px-2 py-1 text-sm">
        <IoSearchSharp className="w-4 h-4 mr-1" />
        <span>Search</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search chats</DialogTitle>

          <div className="flex items-center space-x-2 py-5">
            <input
              type="text"
              placeholder="search chats"
              className="w-full text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-base font-normal"
            />
            <button className="bg-green-600 hover:bg-green-700 ease text-white rounded-md px-2 py-1 transition-colors">
              Search
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
