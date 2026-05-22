interface Objective {
  id: string;
  text: string;
  desc: string;
}

const OBJECTIVES: Objective[] = [
  {
    id: '01',
    text: 'Analyze Alice Session',
    desc: 'Establish connection and inspect your own notebook resource ID (User ID: 2).',
  },
  {
    id: '02',
    text: 'Access Bob Private Data',
    desc: "Manipulate the identifier parameter to leak Bob's note and acquire flag CTF{bob_private_note}.",
  },
  {
    id: '03',
    text: 'Escalate to Admin Memo',
    desc: 'Bypass boundary authorization to compromise the Admin note at ID 1 and retrieve the crown jewel flag.',
  },
];

export default function MissionDossier() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-[var(--muted)]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Operation Scope
        </span>
        <h2
          className="text-xl font-bold text-white tracking-tight mt-1"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Mission Dossier
        </h2>
      </div>

      <div className="flex flex-col border border-white/10 bg-[#0e0e0e]">
        {OBJECTIVES.map((obj) => (
          <div
            key={obj.id}
            className="group flex gap-4 border-b border-white/[0.08] last:border-b-0 p-5 transition-colors duration-200 hover:bg-[#121212]"
          >
            {/* Index square */}
            <div
              className="shrink-0 flex items-center justify-center w-8 h-8 border border-white/20 bg-[#080808] group-hover:border-[var(--red)] group-hover:text-[var(--red)] text-white text-[11px] font-bold transition-colors duration-200"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {obj.id}
            </div>

            {/* Content block */}
            <div className="flex-1 min-w-0">
              <h4
                className="text-[13px] font-bold text-white transition-colors"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {obj.text}
              </h4>
              <p
                className="text-[11px] text-[#ccc] mt-1 leading-relaxed"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {obj.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
