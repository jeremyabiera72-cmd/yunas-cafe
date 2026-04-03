import { Mail, MessageCircle, Instagram, Linkedin, Twitter, Phone, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { ContactMessage } from "../types";

interface ContactUsProps {
  onSendMessage: (message: Omit<ContactMessage, "id" | "createdAt">) => Promise<void>;
}

export default function ContactUs({ onSendMessage }: ContactUsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSendMessage(formData);
      alert("Message sent successfully! We'll get back to you soon.");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-4 bg-[#FDF5E6] border-t border-[#B22222]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24">
        <div className="flex-1">
          <h2 className="font-serif text-4xl font-bold text-[#4B0000] mb-8">Get In Touch</h2>
          <p className="text-[#B22222] font-serif text-2xl mb-12 italic">I'd like to hear from you</p>
          
          <p className="text-[#4B0000]/70 mb-12 max-w-md leading-relaxed">
            If you have any inquiries or feedback just chat with us by our Social Media and submit a report by our provided input.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-xs mb-12">
            {[
              { icon: <Phone size={24} />, label: "WhatsApp" },
              { icon: <Twitter size={24} />, label: "Twitter" },
              { icon: <Linkedin size={24} />, label: "LinkedIn" },
              { icon: <MessageCircle size={24} />, label: "Messenger" },
              { icon: <Instagram size={24} />, label: "Instagram" },
              { icon: <Mail size={24} />, label: "Email" },
            ].map((social, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.1, color: "#B22222" }}
                className="w-12 h-12 bg-[#4B0000] text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
              >
                {social.icon}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[#4B0000] font-medium">
            <Mail size={20} className="text-[#B22222]" />
            <span>jeremyabiera72@gmail.com</span>
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">First Name:</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-2 transition-colors" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Last Name:</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-2 transition-colors" 
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Email:</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-2 transition-colors" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#B22222] font-bold">Message:</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b-2 border-[#B22222]/30 focus:border-[#B22222] outline-none py-2 transition-colors resize-none" 
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-4 bg-black text-white font-serif text-xl hover:bg-[#B22222] transition-colors rounded-sm shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Click here!"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
