import React from "react";
import { ContactMessage } from "../types";
import { Mail, Trash2, Clock, User, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface AdminMessagesProps {
  messages: ContactMessage[];
  onDeleteMessage: (id: string) => void;
}

export default function AdminMessages({ messages, onDeleteMessage }: AdminMessagesProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">Contact Messages</h3>
          <span className="px-3 py-1 bg-[#B22222]/10 text-[#B22222] text-xs font-bold rounded-full">
            {messages.length} Total
          </span>
        </div>
        
        <div className="divide-y divide-gray-50">
          {messages.map((msg) => (
            <motion.div 
              layout
              key={msg.id} 
              className="p-6 hover:bg-gray-50/50 transition-colors group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FDF5E6] rounded-full flex items-center justify-center text-[#B22222]">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A1A1A]">{msg.firstName} {msg.lastName}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Mail size={12} />
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {msg.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => onDeleteMessage(msg.id)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-red-500 rounded-lg transition-all self-end md:self-start"
                  title="Delete Message"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {messages.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-gray-200" />
              </div>
              <h4 className="text-lg font-serif font-bold text-gray-400">No messages yet</h4>
              <p className="text-sm text-gray-300">When customers contact you, their messages will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
