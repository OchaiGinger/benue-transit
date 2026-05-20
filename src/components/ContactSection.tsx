"use client";
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const sectionRef = useRef(null);

  const nameLimit = 30;
  const messageLimit = 200;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > nameLimit) return;
    if (name === "message" && countWords(value) > messageLimit) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Logic for sending the email manually
    try {
      console.log("Form data submitted:", formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const nameCharsRemaining = nameLimit - formData.name.length;
  const messageWordsRemaining = messageLimit - countWords(formData.message);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-white overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--green-accent))] mb-2">
                Our Head Office
              </h3>
              <div className="w-16 h-1 bg-[hsl(var(--orange))]"></div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[hsl(var(--green-accent))] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Benue Transit Logistics Hub</p>
                      <p>Industrial Layout, Km 5, Gboko Road</p>
                      <p>Makurdi, Benue State</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[hsl(var(--green-accent))] flex-shrink-0" />
                    <p>+234 800 BENUE TRANSIT</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[hsl(var(--green-accent))] flex-shrink-0" />
                    <p>contact@benuetransit.com</p>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative mt-12">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--green-light))]/20 to-[hsl(var(--green-accent))]/10 rounded-3xl blur-3xl"></div>
                <img
                  src="benue-transit-logo.png"
                  alt="Benue Transit Logo"
                  className="relative w-32 h-32 object-contain opacity-10 mx-auto"
                />
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-[hsl(var(--border))]">
              <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--green-accent))] mb-8 text-center">
                Contact Us
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--green-accent))] transition-all ${
                      errors.name
                        ? "border-red-500"
                        : "border-[hsl(var(--border))]"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Characters remaining: {nameCharsRemaining}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--green-accent))] transition-all ${
                      errors.email
                        ? "border-red-500"
                        : "border-[hsl(var(--border))]"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist with your logistics needs?"
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--green-accent))] transition-all resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-[hsl(var(--border))]"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Words remaining: {messageWordsRemaining}
                  </p>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full py-6 bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange-hover))] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-base"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
