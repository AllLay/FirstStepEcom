"use client";

export default function FAQ() {
  const faqs = [
    {
      question: "What is First Step?",
      answer:
        "First Step is a curated online marketplace designed to connect innovative sellers with discerning customers. We provide a seamless platform for entrepreneurs to showcase and grow their brands while offering buyers a luxury shopping experience.",
    },
    {
      question: "Who can sell on First Step?",
      answer:
        "Any individual or business with unique, high-quality products is welcome to join First Step. Whether you're a small artisan, established brand, or dropshipper, if your products align with our commitment to quality and style, you can apply to become a seller.",
    },
    {
      question: "How do I set up my store?",
      answer:
        "Setting up your store on First Step is simple:\n\n1. Sign up for a seller account.\n2. Complete your profile and provide verification details.\n3. Upload your product listings with images and descriptions.\n4. Customize your store settings and payment options.\n5. Submit your store for review and start selling once approved.",
    },
    {
      question: "Is there a fee or commission?",
      answer:
        "Yes, First Step charges a competitive commission on each sale to support platform maintenance, marketing, and customer support. The exact rates vary depending on the product category and sales volume. There are no upfront fees to open a store.",
    },
    {
      question: "How does shipping work for dropshippers?",
      answer:
        "Dropshippers are responsible for managing their own shipping processes. You provide shipping details during product setup, and once an order is placed, you fulfill and ship the product directly to the customer. First Step recommends using reliable shipping services to maintain customer satisfaction.",
    },
    {
      question: "How do I get support?",
      answer:
        "We’re here to help! You can contact our support team via:\n\n- Email: unionassembly.ict@pds.hluttaw.mm\n- Live chat on our website (available 9am–6pm EST, Monday to Friday)\n- Seller dashboard support portal for submitting tickets and tracking responses",
    },
  ];

  return (
    <section className="bg-white text-black max-w-4xl mx-auto px-6 md:px-12 py-16">
      <h2 className="text-4xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-8">
        {faqs.map(({ question, answer }, idx) => (
          <div key={idx} className="border-b border-gray-300 pb-6">
            <h3 className="text-xl font-semibold mb-2">{question}</h3>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}