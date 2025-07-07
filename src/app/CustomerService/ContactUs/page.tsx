"use client";

export default function ContactUs() {
  return (
    <section className="min-h-screen bg-white flex flex-col justify-center items-center px-6 md:px-24 lg:px-48 py-16 text-black max-w-4xl mx-auto">
      <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
      <p className="text-lg mb-10 max-w-xl text-center">
        We would love to hear from you. Reach out for questions, support, or collaborations.
      </p>

      <form className="w-full max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full border border-black rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full border border-black rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <textarea
          rows={5}
          placeholder="Your Message"
          required
          className="w-full border border-black rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-16 space-y-2 text-center text-sm text-gray-800">
        <p><strong>Email:</strong> unionassembly.ict@pds.hluttaw.mm</p>
        <p><strong>Phone:</strong> +95 67 591239</p>
        <p><strong>Address:</strong> Pyidaungsu Hluttaw Complex, Zeya Thiri Township, Naypyidaw, Myanmar</p>
      </div>
    </section>
  );
}