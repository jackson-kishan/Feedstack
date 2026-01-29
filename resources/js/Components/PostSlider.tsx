import React, { useState, useEffect } from "react";
import PostDetail from "./PostDetail";
import { X } from "lucide-react";
import { PostType, BoardType, StatusType, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";

interface PostSliderProps {
    isOpen: boolean;
    post: PostType;
    board: BoardType;
    onClose: () => void;
    auth: PageProps['auth'];
}
const PostSlider = ({ post, board, isOpen, onClose, auth }: PostSliderProps) => {
    const [mounted, setMounted] = useState(false);

    // const auth = usePage<PageProps['auth']>().props;

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
        } else {
            const timer = setTimeout(() => {
                setMounted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex flex-row-reverse bg-black/20">
                <div
                    className={`relative flex h-full w-[70%] flex-col overflow-hidden bg-white shadow-xl transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close panel"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <PostDetail auth={auth} post={post} board={board} />
                </div>

                {/* Backdrop for closing when clicking outside */}
                <div className="h-full flex-1" onClick={onClose} />
            </div>
        </>
    );
};

export default PostSlider;
