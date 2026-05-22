/* Warning callout — prominent, honest security disclaimer */
export default function SecurityCallout() {
  return (
    <section className="reveal reveal-5 mt-16 mb-8">
      <div className="red-bar pl-5 py-1">
        <p
          className="text-[11px] leading-[1.8] text-[#c8c8c8] max-w-2xl"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          <span className="text-[var(--red)] font-medium">warning:</span> This
          application is intentionally insecure. Never deploy it to public
          hosting, internet-facing servers, or production environments. For
          local educational use only.
        </p>
      </div>
    </section>
  );
}
